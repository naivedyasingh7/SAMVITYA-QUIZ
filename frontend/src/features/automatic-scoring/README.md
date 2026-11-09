# Module 4: Automatic Scoring

- **Phase:** 4
- **Owner:** Person 4
- **Git Branch:** `feature/automatic-scoring`
- **Directories:**
  - `frontend/src/features/automatic-scoring/`
  - `backend/services/scoring/`

---

## 🎯 Responsibilities (From Roadmap Image)
- [x] Result validation
- [x] Scoring rules
- [x] Duplicate prevention (idempotency)
- [x] Points transactions (immutable ledger)

---

## 📁 File Structure
```
automatic-scoring/
├── components/
│   ├── ScoringRulesForm.jsx    # Configure activity scoring rules
│   ├── PointsBreakdown.jsx     # Detailed computation breakdown modal
│   └── TransactionHistory.jsx  # Ledger audit log
├── pages/
│   └── ScoringManagement.jsx   # Rules and manual adjustment console
├── services/
│   ├── scoringService.js       # Scoring rule evaluation
│   └── pointsService.js        # Transaction creation & ledger queries
├── utils/
│   ├── calculatePoints.js      # Pure scoring math functions
│   └── validateResult.js       # Pre-ledger checks
├── hooks/
│   └── useScoring.js           # Scoring state hook
└── index.js                    # Public exports
```

---

## 🔌 API & Database Contracts
- **Primary Tables:** `scoring_rules`, `points_transactions`
- **Key Principle:** Never overwrite participant score; always append an immutable row to `points_transactions`.
- **Contract Reference:** `shared/contracts/scoring.contract.md`
