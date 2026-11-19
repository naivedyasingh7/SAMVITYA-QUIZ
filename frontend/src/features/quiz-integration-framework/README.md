# Module 3: Quiz Integration Framework

- **Phase:** 3
- **Owner:** Ashwin
- **Git Branch:** `feature/quiz-integration-framework`
- **Directories:**
  - `frontend/src/features/quiz-integration-framework/`
  - `backend/services/quiz/`

---

## 🎯 Responsibilities (From Roadmap Image)
- [x] Provider adapter architecture
- [x] Quiz launch and attempt tracking
- [x] External result ingestion
- [x] Participant matching

---

## 📁 File Structure
```
quiz-integration-framework/
├── components/
│   ├── QuizLinkForm.jsx        # External quiz launch / link generator
│   ├── ProviderSelector.jsx    # Select mock vs external quiz engines
│   ├── QuizStatus.jsx          # Live attempt tracking widget
│   └── ImportHistory.jsx       # Log of ingested webhook / mock results
├── pages/
│   └── QuizIntegrationsPage.jsx# Configuration & manual simulation view
├── services/
│   ├── quizService.js          # Ingestion and result mapping service
│   └── launchService.js        # Attempt token creation
├── providers/
│   ├── baseProvider.js         # Abstract base adapter class
│   ├── mockProvider.js         # Built-in simulator adapter
│   └── providerRegistry.js     # Factory registry for adapters
├── hooks/
│   └── useQuizIntegration.js   # Integration state hook
└── index.js                    # Public exports
```

---

## 🔌 API & Database Contracts
- **Primary Tables:** `quiz_providers`, `quiz_integrations`, `quiz_attempts`, `quiz_results`
- **Endpoints:**
  - `POST /api/quiz/launch`
  - `POST /api/quiz/results` (Ingestion point forwarded to Divya scoring engine)
- **Contract Reference:** `shared/contracts/quiz.contract.md`
