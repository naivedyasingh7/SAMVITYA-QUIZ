# GitHub Collaboration & Workflow Guide

To ensure high development velocity without collisions among 6 developers, follow this exact GitHub workflow.

---

## 🌿 Branch Naming Scheme

| Developer | Responsibility | Branch Name |
|---|---|---|
| **Person 1** | Participant System | `feature/participant-system` |
| **Person 2** | Admin System | `feature/admin-system` |
| **Person 3** | Quiz Integration Framework | `feature/quiz-integration-framework` |
| **Person 4** | Automatic Scoring Engine | `feature/automatic-scoring` |
| **Person 5** | Leaderboard & Analytics | `feature/leaderboard` |
| **Person 6** | Testing & Deployment | `feature/testing-and-deployment` |

---

## 🛠️ Step-by-Step Developer Workflow

### Step 1: Clone & Switch to Feature Branch
```bash
git clone <repository-url>
cd event-points-management-system
git fetch origin
git checkout develop
git checkout feature/<your-assigned-feature>
```

### Step 2: Keep Branch Up to Date
Before coding, regularly rebase onto latest `develop`:
```bash
git fetch origin
git rebase origin/develop
```

### Step 3: Work Only in Your Assigned Folder
Only edit files within your feature directory:
- Person 1: `frontend/src/features/participant-system/`
- Person 2: `frontend/src/features/admin-system/`
- Person 3: `frontend/src/features/quiz-integration-framework/`
- Person 4: `frontend/src/features/automatic-scoring/`
- Person 5: `frontend/src/features/leaderboard/`
- Person 6: `frontend/src/features/testing-and-deployment/` & `tests/`

### Step 4: Commit Your Work
```bash
git add frontend/src/features/<your-feature>/
git commit -m "feat(<module>): add component and service logic"
git push origin feature/<your-assigned-feature>
```

### Step 5: Open a Pull Request (PR)
- Set Base branch: `develop`
- Set Compare branch: `feature/<your-assigned-feature>`
- Provide a clear summary and test walkthrough.
- Request review from the Project Integrator.
