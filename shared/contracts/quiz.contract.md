# Quiz Integration Contract

- **Owner:** Ashwin (`frontend/src/features/quiz-integration-framework/` & `backend/services/quiz/`)
- **Key Tables:** `quiz_providers`, `quiz_integrations`, `quiz_attempts`, `quiz_results`
- **Abstract Base Class:** `BaseQuizProvider`
- **Required Implementation Methods:**
  - `launchQuiz(participantId, activityId)`: Returns `{ attempt_id, launch_url }`
  - `ingestResult(externalPayload)`: Returns `NormalizedQuizResult`
