# 🌊 Vibe Task Board

A Full-Stack "Dopamine" Task Manager built with **FastAPI** and **React**.

> **Goal:** Create a clean, polished, and interactive task board that visually rewards productivity.

---

## 🚀 Live Demo
**https://vibe-task-board.onrender.com/**

---

## ✨ Unique Features (The "Vibe")
This isn't just a to-do list; it's designed to make completing tasks feel rewarding.

1.  **Dynamic Atmosphere:** The background gradient shifts seamlessly from **Cool Blue (Focus)** to **Warm Sunset (Reward)** as your progress bar fills up.
2.  **Dopamine Hits:** Checking off a task triggers a **confetti explosion**.
3.  **100% Celebration:** Reaching 100% completion unlocks a bouncing celebration message.
4.  **Glassmorphism UI:** A modern, frosted-glass aesthetic using Tailwind CSS backdrops.

---

## 🛠️ Tech Stack

### **Backend**
* **Python 3.11+**
* **FastAPI**: For high-performance, easy-to-use APIs.
* **Uvicorn**: ASGI server.
* **JSON Persistence**: Simple file-based storage (`tasks.json`) to persist data across server restarts.

### **Frontend**
* **React (Vite)**: Fast, modern frontend tooling.
* **Tailwind CSS**: Utility-first styling.
* **Lucide React**: Clean, lightweight icons.
* **Canvas Confetti**: Visual effects.

---

## 📂 Project Structure

```text
vibe-task-board/
├── backend/
│   ├── main.py            # FastAPI Application & Static File Serving
│   └── requirements.txt   # Python Dependencies
├── frontend/
│   ├── src/               # React Source Code
│   ├── dist/              # Production Build (Created after build)
│   └── tailwind.config.js # Styling Configuration
└── tasks.json             # Data Storage (Auto-generated)
```
## ⚡How to Run Locally

**1. Clone the Repository**

```text
git clone [https://github.com/your-username/vibe-task-board.git](https://github.com/your-username/vibe-task-board.git)
```
```text
cd vibe-task-board
```
**2. Setup Frontend**

Navigate to the frontend folder, install dependencies, and build the static files.

```text 
cd frontend 
```
```text
npm install
```
```text
npm run build
```
This generates the dist folder that the backend serves.

**3. Setup Backend**

Navigate to the backend folder and install Python dependencies.

```text
cd ../backend
```
```text
pip install -r requirements.txt
```

**4. Run the AppStart the server (this serves both the API and the React UI).**

```text
python -m uvicorn main:app --reload
```
Open your browser to: http://127.0.0.1:8000

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Fetch all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/{id}/complete` | Toggle completion status |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

## ☁️ Deployment

This project is configured for deployment on Render.

Build Command: 
```text
pip install -r backend/requirements.txt && cd frontend && npm install && npm run build
```
Start Command: 
```text
cd backend && python -m uvicorn main:app --host 0.0.0.0 --port $PORT
```
