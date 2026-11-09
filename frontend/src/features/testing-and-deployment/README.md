# Module 6: Testing and Deployment

- **Phase:** 6
- **Owner:** Person 6
- **Git Branch:** `feature/testing-and-deployment`
- **Directories:**
  - `frontend/src/features/testing-and-deployment/`
  - `tests/`
  - `.github/workflows/`

---

## 🎯 Responsibilities (From Roadmap Image)
- [x] Multiple-participant testing
- [x] Duplicate submission testing
- [x] Security testing
- [x] Mobile responsiveness
- [x] Production deployment

---

## 📁 File Structure
```
testing-and-deployment/
├── components/
│   └── TestingDashboard.jsx      # In-browser test runner & simulator UI
├── pages/
│   └── TestingPortal.jsx         # QA sandbox & stress-test trigger
├── services/
│   └── mockDataService.js        # Realistic fixture generator
├── hooks/
│   └── useTestingSuite.js        # QA harness state
├── ci/
│   └── github-actions-guide.md   # CI build & automated test guide
├── deployment/
│   └── deployment-checklist.md   # Vercel & Supabase release checklist
└── index.js                      # Public exports
```

---

## 🧪 Integration Test Directory Reference
Root `tests/` folder contains the canonical unit, integration, and e2e test files:
- `tests/unit/`: Unit test specs for participants, scoring math, and leaderboard.
- `tests/integration/`: Cross-module registration -> quiz import -> scoring -> rank update.
- `tests/e2e/`: End-to-end browser flows.
