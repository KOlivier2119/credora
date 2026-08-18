# Credora — AI-Powered Credit Scoring Platform

Credora helps financial institutions assess loan applicants who lack traditional credit history by using **alternative data** (mobile money patterns, utility payments, income) and **machine learning** to generate credit scores and approval recommendations.

## Real-world problem this solves

| Source | Finding |
|--------|---------|
| [World Bank Global Findex 2025](https://www.worldbank.org/en/publication/globalfindex) | ~1.3B adults unbanked; ~3B lack credit history for formal loans |
| [IFC — Cracking the Credit Code (2026)](https://www.ifc.org/content/dam/ifc/doc/2026/cracking-the-credit-code-alternative-data-and-ai-for-financial-inclusion-summary.pdf) | Traditional scoring excludes women, informal workers, and MSMEs; mobile money & utility data enable inclusion |
| [FinRegLab — Kenya MSE Lending (2024)](https://finreglab.org/wp-content/uploads/2024/04/FinRegLab_2024-03-28_Research-Report_Alternative-Data-and-Market-Dynamics.pdf) | Women-owned micro-enterprises can't access credit because cash-flow data isn't visible to formal lenders |
| Africa SME financing gap | ~44M SMEs face a **$331B** financing gap; collateral-based models fail asset-light businesses |

**Credora addresses this** by scoring applicants on salary, employment, mobile money volume, and utility payment regularity — the same alternative signals used by inclusive lenders in Kenya, India, and Sub-Saharan Africa.

## Architecture

```
credora/
├── frontend/     Next.js 15 — applicant & institution portals
├── backend/      Spring Boot 3 — REST API, JWT auth, PostgreSQL
├── ai/           FastAPI + scikit-learn — credit scoring engine
├── docs/         SRS, project plan, proposal
└── docker-compose.yml
```

## Quick start (Docker)

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| AI Service | http://localhost:8000 |
| PostgreSQL | localhost:5432 |

## Local development (without Docker)

### 1. Database
```bash
docker run -d --name credora-pg -e POSTGRES_DB=credora -e POSTGRES_USER=credora -e POSTGRES_PASSWORD=credora -p 5432:5432 postgres:16-alpine
```

### 2. AI service
```bash
cd ai
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Backend
```bash
cd backend
docker run --rm -v "%cd%":/app -w /app maven:3.9-eclipse-temurin-21 mvn -q -DskipTests spring-boot:run
# Or build JAR: mvn package && java -jar target/credora-backend-1.0.0.jar
```

### 4. Frontend
```bash
cd frontend/credora
cp .env.example .env.local
# Fill GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET for Google sign-in
# Origin: http://localhost:3000
# Redirect: http://localhost:3000/api/auth/callback/google
npm install
npm run dev
```

## Demo flow

1. **Register** at `/register` as loan applicant (include monthly income)
2. **Login** → redirected to `/dashboard`
3. **Apply for loan** at `/dashboard/apply-for-loan` — fill income + alternative data fields
4. **AI scoring** runs automatically → see credit score, approval probability, recommendations
5. **Track** application at `/dashboard/loan-tracker`
6. **Register institution** → login → `/admin` to review/approve applications

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/signup` | — | Applicant registration |
| POST | `/auth/login` | — | Applicant login |
| POST | `/auth/signup-institution` | — | Institution registration |
| POST | `/auth/login-institution` | — | Institution login |
| POST | `/applications` | JWT | Submit loan + trigger AI score |
| GET | `/applications` | JWT | List my applications |
| GET | `/dashboard/summary` | JWT | Applicant dashboard data |
| GET | `/loans` | JWT | My active loans |
| GET | `/admin/applications` | Institution | All applications |
| PATCH | `/admin/applications/{id}/status` | Institution | Approve/reject |
| POST | `/predict` | — | AI scoring (internal) |

## Environment variables

See `frontend/credora/.env.example` and `docker-compose.yml`.

## Google sign-in (applicants)

1. Create an OAuth 2.0 **Web** client in [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Authorized JavaScript origin: `http://localhost:3000`
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy the client ID and secret into `frontend/credora/.env.local`:

```
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret
```

5. Restart `npm run dev`. Google sign-in is for **applicants only**; institutions use email and password.

Until credentials are set, the Google button stays visible and explains that configuration is missing.

## Deploy on Vercel

The Next.js app is in **`frontend/credora`**, not the repo root.

**Option A (recommended):** In Vercel → Project → Settings → General → **Root Directory**, set:

```
frontend/credora
```

Then redeploy. Vercel will read `frontend/credora/package.json` and detect Next.js automatically.

**Option B:** Leave Root Directory as the repo root. The root `vercel.json` and `package.json` run install/build in `frontend/credora` and include `next` at the root for framework detection.

Add the env vars from `frontend/credora/.env.example` in Vercel. Set `NEXTAUTH_URL` to your production URL and add the same origin/redirect URI in Google Cloud Console.

## Deploy the API on Render (required for Vercel auth)

Vercel only hosts the Next.js UI. Register, login, Google OAuth, and the dashboard need the Spring Boot API on the public internet.

1. Push this repo to GitHub (already on `main`).
2. Open [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
3. Connect the `credora` repo. Render reads `render.yaml` and creates:
   - **credora-db** — PostgreSQL
   - **credora-ai** — FastAPI scoring service
   - **credora-api** — Spring Boot API
4. Wait until **credora-api** is Live. Open it and copy the URL, e.g. `https://credora-api.onrender.com`.
5. Confirm `https://credora-api.onrender.com/health` returns `{"status":"UP"}`.
6. In **Vercel → Settings → Environment Variables**, set (Production + Preview) and **redeploy**:

| Variable | Value |
|----------|--------|
| `API_URL` | `https://credora-api.onrender.com` (your real Render URL) |
| `NEXT_PUBLIC_API_URL` | same as `API_URL` |
| `NEXTAUTH_URL` | `https://credora-fawn.vercel.app` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | from Google Cloud (same as `.env.local`) |
| `GOOGLE_CLIENT_SECRET` | from Google Cloud (same as `.env.local`) |

7. In [Google Cloud credentials](https://console.cloud.google.com/apis/credentials), add:
   - Origin: `https://credora-fawn.vercel.app`
   - Redirect: `https://credora-fawn.vercel.app/api/auth/callback/google`

8. On the **credora-api** service in Render, `CORS_ORIGINS` is already `https://credora-fawn.vercel.app`. If the frontend URL changes, update that env var and restart the API.

Postgres on Render (`basic-256mb`) is a paid starter database. Web services on the **starter** plan stay up; if you later switch them to free, they **spin down when idle** and the first login can take 30–60s.

After the Blueprint is live, paste the real `credora-api` URL into Vercel (`API_URL` + `NEXT_PUBLIC_API_URL`) and redeploy. Email and Google login will not work on Vercel until that URL is public HTTPS, not `localhost`.

## Team

RUYANGE Arnold and Team — Credora Project
