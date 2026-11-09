# Automatic Scoring Engine Contract

- **Owner:** Divya (`frontend/src/features/automatic-scoring/` & `backend/services/scoring/`)
- **Key Tables:** `scoring_rules`, `points_transactions`
- **Core Function:**
  - `calculatePoints(rawScore, maxScore, activityMaxPoints, ruleParameters)`
  - `processResultAndAward(normalizedResult)`
- **Guarantees:**
  - Strict idempotency check against `external_result_id`
  - Atomic insertion into `points_transactions`
