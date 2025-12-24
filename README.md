# Vibe Task Board - Project Changelog

## 1. Backend Setup (FastAPI)
- **Created `backend/requirements.txt`**: Added `fastapi`, `uvicorn`, `pydantic`.
- **Created `backend/main.py`**:
  - Implemented REST API endpoints (`GET`, `POST`, `PUT`, `DELETE`).
  - Added JSON persistence (`tasks.json` stored in project root).
  - Configured static file serving to host the React frontend (`frontend/dist`) on the root URL.
  - Added CORS middleware for local development flexibility.

## 2. Frontend Configuration (Vite + React + Tailwind)
- **Initialized Vite Project**: Created standard React structure in `frontend/`.
- **Dependency Management**:
  - Downgraded `tailwindcss` to v3.4.17 to resolve PostCSS incompatibility with v4.
  - Installed `axios`, `lucide-react`, `canvas-confetti`, `clsx`, `tailwind-merge`.
- **Configuration Fixes (Windows Compatibility)**:
  - **`tailwind.config.cjs`**: Converted to CommonJS (`module.exports`) and updated `content` paths to explicitly include `./src/*.jsx` and `./src/**/*.{js,ts,jsx,tsx}`.
  - **`postcss.config.cjs`**: Created to explicitly load `tailwindcss` and `autoprefixer` plugins using CommonJS.
  - **`vite.config.js`**: Default configuration maintained.

## 3. Code Implementation
- **Styles (`frontend/src/index.css`)**:
  - Added `@tailwind` directives.
  - Added global transition styles to `body` for smooth background gradient shifts.
- **Application Logic (`frontend/src/App.jsx`)**:
  - Implemented "Glassmorphism" UI with Tailwind classes.
  - **"Vibe" Logic**:
    - Calculated progress percentage.
    - Added dynamic background gradient changing from Blue (0%) -> Purple (50%) -> Sunset (100%).
    - Added `canvas-confetti` trigger on task completion.
  - **API Integration**: Connected Axios calls to Python backend endpoints.

## 4. Build & Run Instructions
### Frontend Build
```bash
cd frontend
npm run build
