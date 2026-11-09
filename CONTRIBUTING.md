# Contributing Guidelines

Welcome to the **Event Points Management System** monorepo! This project is maintained by 6 concurrent developers. Strict adherence to our Git workflow and API contracts ensures smooth integration.

---

## 🔀 Git Branching Strategy

Our branching model enforces clean integration onto `develop` and production readiness on `main`:

```
main (protected - production only)
 │
 └── develop (integration branch - staging)
      ├── feature/participant-system          (Person 1)
      ├── feature/admin-system                (Person 2)
      ├── feature/quiz-integration-framework  (Person 3)
      ├── feature/automatic-scoring           (Person 4)
      ├── feature/leaderboard                 (Person 5)
      └── feature/testing-and-deployment      (Person 6)
```

### Branch Rules
1. **Never commit directly to `main` or `develop`.** Direct push is blocked by repository rules.
2. **Branch from `develop`:** Always `git checkout develop && git pull origin develop` before cutting a branch.
3. **Commit naming convention:** Follow Conventional Commits:
   - `feat(participant): add QR registration handler`
   - `fix(scoring): prevent duplicate deduction on replay`
   - `test(integration): verify registration to points awarding cycle`
   - `docs(contracts): update participant profile schema`

---

## 🤝 Module Boundary Protection

- **Person 1:** Works in `frontend/src/features/participant-system/`
- **Person 2:** Works in `frontend/src/features/admin-system/`
- **Person 3:** Works in `frontend/src/features/quiz-integration-framework/` & `backend/services/quiz/`
- **Person 4:** Works in `frontend/src/features/automatic-scoring/` & `backend/services/scoring/`
- **Person 5:** Works in `frontend/src/features/leaderboard/`
- **Person 6:** Works in `tests/` and `frontend/src/features/testing-and-deployment/`

**Integrator Owned (Protected):**
- `docs/`
- `shared/`
- `frontend/src/app/`
- `backend/supabase/migrations/`

---

## 📋 Pull Request (PR) Checklist

Before submitting a PR to `develop`:
- [ ] Code is isolated to your assigned feature directory.
- [ ] All inputs and outputs conform strictly to `docs/API_CONTRACTS.md` and `shared/types/`.
- [ ] Unit tests pass (`npm test`).
- [ ] No hardcoded secrets, API keys, or localhost URLs.
- [ ] Feature documentation is updated in your module's `README.md`.
- [ ] PR contains a test walkthrough / screenshot demo.
- [ ] Approved by the Integrator + 1 peer reviewer.
