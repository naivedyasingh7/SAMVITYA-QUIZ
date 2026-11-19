---
name: "Task: [Divya] Automatic Scoring Deliverables"
about: "Deliverable tracker for Divya - Phase 4: Automatic Scoring"
title: "[Divya] Automatic Scoring Engine - Phase 4 Implementation"
labels: ["module:scoring", "phase-4"]
assignees: ""
---

### 👤 Module Owner
**Divya** | Branch: `feature/automatic-scoring` | Folder: `frontend/src/features/automatic-scoring/` & `backend/services/scoring/`

---

### 🎯 Key Responsibilities (From Roadmap Image)
- [ ] **Result Validation:** Validate incoming quiz score payloads before calculation.
- [ ] **Scoring Rules:** Convert raw scores into proportional event points based on activity rules.
- [ ] **Duplicate Prevention:** Enforce idempotency using `external_result_id` to reject duplicate submissions.
- [ ] **Points Transactions (Immutable Ledger):** Append every point change to `points_transactions`; never mutate point totals directly.

---

### 📁 Assigned Deliverable Files
- `utils/calculatePoints.js`
- `utils/validateResult.js`
- `services/scoringService.js`
- `services/pointsService.js`
- `components/ScoringRulesForm.jsx`
- `components/PointsBreakdown.jsx`
- `components/TransactionHistory.jsx`
- `pages/ScoringManagement.jsx`
- `backend/services/scoring/scoringEngine.js`
- `backend/services/scoring/transactionService.js`

---

### 📜 Approved Contracts to Follow
- `docs/API_CONTRACTS.md` (`POST /api/scoring/process`)
- `shared/types/points.types.js`
- `shared/validators/points.validator.js` & `shared/validators/quizResult.validator.js`
- `shared/contracts/scoring.contract.md`
