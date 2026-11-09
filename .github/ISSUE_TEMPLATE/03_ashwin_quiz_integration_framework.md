---
name: "Task: [Ashwin] Quiz Integration Framework Deliverables"
about: "Deliverable tracker for Ashwin - Phase 3: Quiz Integration Framework"
title: "[Ashwin] Quiz Integration Framework - Phase 3 Implementation"
labels: ["module:quiz-integration", "phase-3"]
assignees: ""
---

### 👤 Module Owner
**Ashwin** | Branch: `feature/quiz-integration-framework` | Folder: `frontend/src/features/quiz-integration-framework/` & `backend/services/quiz/`

---

### 🎯 Key Responsibilities (From Roadmap Image)
- [ ] **Provider Adapter Architecture:** Extensible `BaseQuizProvider` abstract class with concrete `MockQuizProvider`.
- [ ] **Quiz Launch & Attempt Tracking:** Generate tracking attempt IDs (`att-xxxx`) and launch URLs.
- [ ] **External Result Ingestion:** Ingest raw scores from quiz platform / simulation.
- [ ] **Participant Matching:** Reliably map external completion payloads to internal participant UUIDs.

---

### 📁 Assigned Deliverable Files
- `providers/baseProvider.js`
- `providers/mockProvider.js`
- `providers/providerRegistry.js`
- `components/QuizLinkForm.jsx`
- `components/ProviderSelector.jsx`
- `components/QuizStatus.jsx`
- `components/ImportHistory.jsx`
- `pages/QuizIntegrationsPage.jsx`
- `services/quizService.js`
- `services/launchService.js`
- `backend/services/quiz/mockProviderService.js`
- `backend/services/quiz/quizAttemptService.js`

---

### 📜 Approved Contracts to Follow
- `docs/API_CONTRACTS.md` (`POST /api/quiz/launch`, `POST /api/quiz/results`)
- `shared/types/quiz.types.js` (`NormalizedQuizResult`)
- `shared/contracts/quiz.contract.md`
