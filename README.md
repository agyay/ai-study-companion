# AI Study Companion - Full Stack Demo

This repository is a demo full-stack scaffold for the *AI Study Companion* project.

## What is included
- `frontend/` - Vite + React + Tailwind demo app
- `backend/` - Express server with simple auth, quiz endpoints, and OpenAI integration

## Quickstart (local)
1. Install dependencies for backend and frontend separately.
   - Backend:
     ```
     cd backend
     npm install
     ```
   - Frontend:
     ```
     cd frontend
     npm install
     ```
2. Create a `.env` in `backend/` with:
   ```
   MONGODB_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=sk-...
   ```
3. Start backend:
   ```
   cd backend
   npm run dev
   ```
4. Start frontend:
   ```
   cd frontend
   npm run dev
   ```
5. Open the URL shown by Vite (usually http://localhost:5173)

## Notes
- The OpenAI endpoint requires a valid `OPENAI_API_KEY`. If you don't have one, the `/api/ai/ask` endpoint will return an error.
- This scaffold is intended for demo and academic use. Review and harden before production use.
