# Event Points Management System

A unified, modular monorepo designed for high-concurrency event point tracking, quiz ingestion, automated scoring, real-time leaderboards, and administrative controls.

---

## 🏛️ Repository Architecture

This repository adopts a **Contract-First Monorepo Architecture** empowering six engineers to work concurrently across dedicated modules with zero collision:

```
event-points-management-system/
│
├── README.md                           # Main repository guide
├── CONTRIBUTING.md                     # Engineering guidelines & PR protocol
├── .gitignore                          # Monorepo ignore rules
├── .env.example                        # Standardized environment template
├── package.json                        # Monorepo scripts & dependencies
│
├── docs/                               # 📖 Single Source of Truth
│   ├── SYSTEM_ARCHITECTURE.md          # Multi-tier architecture & dataflow
│   ├── DATABASE_SCHEMA.md              # 11 normalized Postgres tables & RLS
│   ├── API_CONTRACTS.md                # REST & Edge Function interfaces
│   ├── USER_FLOWS.md                   # End-to-end user journeys
│   ├── GITHUB_WORKFLOW.md              # Branching & code review standards
│   └── DEVELOPMENT_ROADMAP.md          # 6-phase development roadmap
│
├── frontend/
│   ├── public/                         # Public assets & QR templates
│   └── src/
│       ├── app/                        # App root, router, global providers
│       ├── shared/                     # Common UI components, layouts, hooks
│       └── features/                   # 6 Independent Development Modules:
│           ├── participant-system/     # [Srikirti] QR entry & participant portal
│           ├── admin-system/           # [Suvradeep] Admin dashboard & offline points
│           ├── quiz-integration-framework/ # [Ashwin] Provider adapters & attempts
│           ├── automatic-scoring/      # [Divya] Point calculation & audit engine
│           ├── leaderboard/            # [Priyanshu] Real-time rankings & winners
│           └── testing-and-deployment/ # [Naivedya] Integration QA & CI/CD
│
├── backend/
│   ├── supabase/                       # Supabase Postgres, migrations & Edge Functions
│   ├── services/                       # Server-side business logic
│   ├── middleware/                     # Auth & input validation guards
│   └── utils/                          # Shared backend helpers
│
├── shared/                             # 🔒 Integration Control Center
│   ├── types/                          # Shared JSDoc data structures
│   ├── constants/                      # Enums, roles, and status codes
│   ├── validators/                     # Request and entity validators
│   └── contracts/                      # Formal interface contracts (Markdown)
│
└── tests/                              # 🧪 End-to-end and integration suites
    ├── unit/                           # Module-specific unit tests
    ├── integration/                    # Cross-module integration flows
    ├── e2e/                            # Playwright/Cypress end-to-end tests
    └── fixtures/                       # Deterministic test seed data
```

---

## 👥 Division of Work (The 6 Development Modules)

| Phase | Module Folder | Primary Focus | Owner | Git Branch |
|---|---|---|---|---|
| **1** | `frontend/src/features/participant-system/` | QR Registration, Participant ID, Returning Detection, Dashboard | Srikirti | `feature/participant-system` |
| **2** | `frontend/src/features/admin-system/` | Admin Auth, Activity Management, Offline Points, Adjustments | Suvradeep | `feature/admin-system` |
| **3** | `frontend/src/features/quiz-integration-framework/` | Provider Adapters, Quiz Launch, Ingestion, Matching | Ashwin | `feature/quiz-integration-framework` |
| **4** | `frontend/src/features/automatic-scoring/` | Result Validation, Scoring Engine, Points Ledger, Deductions | Divya | `feature/automatic-scoring` |
| **5** | `frontend/src/features/leaderboard/` | Live Ranks, Cumulative Totals, Analytics, Winner Declaration | Priyanshu | `feature/leaderboard` |
| **6** | `frontend/src/features/testing-and-deployment/` | Multi-user QA, Security, Idempotency, E2E, CI/CD Pipeline | Naivedya | `feature/testing-and-deployment` |

---

## ⚡ Technology Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **Database:** Supabase PostgreSQL (11 Normalized Tables + Row Level Security)
- **Backend & Compute:** Supabase Edge Functions (Deno / TypeScript)
- **Live Sync:** Supabase Realtime (WebSocket channels on `points_transactions` and `leaderboard`)
- **Navigation:** React Router v6
- **Visualization:** Recharts
- **QR Engine:** `qrcode` / `html5-qrcode`
- **Testing:** Vitest, Testing Library, Playwright
- **CI/CD:** GitHub Actions + Vercel Deployment

---

## 🚀 Getting Started

1. **Clone repository and checkout `develop`**:
   ```bash
   git clone <repo-url>
   cd event-points-management-system
   git checkout develop
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   # Populate VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Run Test Suites**:
   ```bash
   npm test
   ```

---

## 📜 Development Guidelines & Integration Rules

1. **Contract-First Development:** Never modify files under `shared/` or `docs/DATABASE_SCHEMA.md` without a formal team review and integrator sign-off.
2. **Immutable Point Transactions:** Total points are never directly updated. Every point change is recorded as an immutable row in `points_transactions`.
3. **Idempotency in Quiz Results:** External result IDs (`external_result_id`) are strictly unique per activity to prevent duplicate score imports.
4. **Branch Isolation:** Each developer only modifies their assigned feature directory.
