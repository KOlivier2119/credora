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

## Team

RUYANGE Arnold and Team — Credora Project
