import os
import json
from uuid import uuid4
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

# --- Configuration ---
DATA_FILE = "../tasks.json" # Stored in root so it persists
FRONTEND_DIST = "../frontend/dist"

# --- CORS (Helpful for local dev if running ports separately) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class Task(BaseModel):
    id: Optional[str] = None
    title: str
    completed: bool = False

# --- Helper Functions ---
def load_tasks():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        try:
            return json.load(f)
        except:
            return []

def save_tasks(tasks):
    with open(DATA_FILE, "w") as f:
        json.dump(tasks, f, indent=2)

# --- API Routes ---
@app.get("/api/tasks", response_model=List[Task])
async def get_tasks():
    return load_tasks()

@app.post("/api/tasks", response_model=Task)
async def create_task(task: Task):
    tasks = load_tasks()
    new_task = task.dict()
    new_task["id"] = str(uuid4())
    tasks.append(new_task)
    save_tasks(tasks)
    return new_task

@app.put("/api/tasks/{task_id}/complete")
async def toggle_complete(task_id: str):
    tasks = load_tasks()
    for t in tasks:
        if t["id"] == task_id:
            t["completed"] = not t["completed"]
            save_tasks(tasks)
            return t
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    tasks = load_tasks()
    new_tasks = [t for t in tasks if t["id"] != task_id]
    if len(tasks) == len(new_tasks):
        raise HTTPException(status_code=404, detail="Not found")
    save_tasks(new_tasks)
    return {"status": "deleted"}

# --- Serve React Frontend ---
if os.path.exists(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=f"{FRONTEND_DIST}/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        # Let API requests pass through
        if full_path.startswith("api"):
            raise HTTPException(status_code=404)
        # Serve index.html for everything else (SPA support)
        return FileResponse(f"{FRONTEND_DIST}/index.html")