# Macau Resort — Deployment Guide

One Git repo, three apps. Deploy each app separately (same repo, different root + env).

---

## 1. Backend (Node.js + Express)

You can deploy the backend on **Vercel** (serverless) or on **Railway / Render** (long-running server).

### Option A: Vercel (serverless)

The repo includes `backend/api/[[...path]].js` and `backend/vercel.json` so the Express app runs as a Vercel serverless function.

1. [vercel.com](https://vercel.com) → Add New → **Project** → Import your Git repo (`Macau`).
2. **Framework Preset**: **Other** (or leave as detected).
3. **Root Directory**: `backend`.
4. **Build Command**: leave default (Vercel will install deps and build the serverless function).
5. **Environment Variables** (add all from your `.env`):
   - `MONGO_URI`
   - `JWT_SECRET_KEY`, `JWT_REFRESH_TOKEN_SECRET_KEY`
   - `JWT_ACCESS_TOKEN_EXPIRES`, `JWT_REFRESH_TOKEN_EXPIRES`
   - `APP_BASE_URL` = `https://your-backend.vercel.app` (use the Vercel URL after first deploy)
   - Optional: `APP_NODE_ENV` = `production`
6. Deploy. Your API will be at `https://your-project.vercel.app/api/v1/...` (e.g. `/api/v1/featured-rooms-list`).
7. Use this backend URL as `API_BASE_URL` / `REACT_APP_API_BASE_URL` in the frontend and admin projects.

### Option B: Railway (long-running server)

1. Go to [railway.app](https://railway.app) → New Project → **Deploy from GitHub**.
2. Select your repo (`priyankmollate/Macau`).
3. Set **Root Directory**: `backend`.
4. Set **Start Command**: `npm run prod` or `node server.js`.
5. Add **Variables** (same as your `.env`):
   - `APP_PORT` (Railway often sets `PORT`; your app may need to use `process.env.PORT || 5001`)
   - `MONGO_URI`
   - `JWT_SECRET_KEY`, `JWT_REFRESH_TOKEN_SECRET_KEY`
   - `JWT_ACCESS_TOKEN_EXPIRES`, `JWT_REFRESH_TOKEN_EXPIRES`
   - `APP_BASE_URL` = `https://your-backend.railway.app` (Railway will give you a URL)
6. Deploy. Copy the backend URL (e.g. `https://macau-backend-production.up.railway.app`).

### Option C: Render

1. [render.com](https://render.com) → New → **Web Service**.
2. Connect repo, set **Root Directory**: `backend`.
3. **Build**: `npm install`
4. **Start**: `npm run prod` or `node server.js`
5. Add **Environment Variables** (same as above). Set **APP_BASE_URL** to the Render URL after first deploy.

---

## 2. Frontend (Next.js) — Vercel

1. [vercel.com](https://vercel.com) → Add New → **Project** → Import your Git repo (`Macau`).
2. **Framework Preset**: **Next.js**
3. **Root Directory**: `frontend` (click Edit, set to `frontend`).
4. **Build Command**: leave default (`next build`).
5. **Environment Variables** (add in Vercel project settings):
   - `API_BASE_URL` = your backend URL (e.g. `https://your-backend.railway.app`)
6. Deploy. Your site will be at `https://your-project.vercel.app`.

---

## 3. Admin Panel (Create React App) — Vercel

1. In Vercel → Add New → **Project** again → Import the **same** repo (`Macau`).
2. **Framework Preset**: **Create React App**
3. **Root Directory**: `admin-panel`
4. **Build Command**: leave default (`npm run build`).
5. **Environment Variables**:
   - `REACT_APP_API_BASE_URL` = same backend URL (e.g. `https://your-backend.railway.app`)
6. Deploy. Admin will be at a different Vercel URL (e.g. `https://macau-admin.vercel.app`).

---

## Summary

| App    | Where to deploy | Root Directory | Preset / Type        | Env vars                          |
|--------|------------------|----------------|----------------------|-----------------------------------|
| Backend| Vercel / Railway / Render | `backend` | Other or Node | MONGO_URI, JWT_*, APP_BASE_URL…   |
| Frontend | Vercel        | `frontend`     | Next.js              | API_BASE_URL                      |
| Admin  | Vercel           | `admin-panel`  | Create React App     | REACT_APP_API_BASE_URL            |

**Order:** Deploy backend first → copy its URL → use that URL in both Vercel projects (frontend + admin) as `API_BASE_URL` / `REACT_APP_API_BASE_URL`.

**CORS:** After backend is deployed, add your Vercel frontend and admin URLs to the backend’s allowed origins (e.g. in `backend/src/configs/cors.config.js` or via env if you add that support).
