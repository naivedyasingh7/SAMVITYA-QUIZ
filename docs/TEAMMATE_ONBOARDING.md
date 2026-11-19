# 🚀 Teammate Onboarding Guide

Welcome to the team! We are building the **Event Points Management System** across 6 independent modules.

---

## 📌 Step 1: Clone the Repo & Checkout Your Branch

Run the commands corresponding to your assigned role:

### If you are Srikirti (Participant System):
```bash
git clone <repository-url>
cd event-points-management-system
git checkout develop
git checkout feature/participant-system
```

### If you are Suvradeep (Admin System):
```bash
git clone <repository-url>
cd event-points-management-system
git checkout develop
git checkout feature/admin-system
```

### If you are Ashwin (Quiz Integration Framework):
```bash
git clone <repository-url>
cd event-points-management-system
git checkout develop
git checkout feature/quiz-integration-framework
```

### If you are Divya (Automatic Scoring):
```bash
git clone <repository-url>
cd event-points-management-system
git checkout develop
git checkout feature/automatic-scoring
```

### If you are Priyanshu (Leaderboard):
```bash
git clone <repository-url>
cd event-points-management-system
git checkout develop
git checkout feature/leaderboard
```

### If you are Naivedya (Testing and Deployment):
```bash
git clone <repository-url>
cd event-points-management-system
git checkout develop
git checkout feature/testing-and-deployment
```

---

## 🛠️ Step 2: Install Dependencies
```bash
npm install
```

---

## 🔒 Step 3: Golden Rules

1. **Work Only in Your Assigned Folder:**
   Never edit files in other people's folders or modify files in `shared/` or `docs/` without integrator approval.
2. **Follow the Contracts:**
   Read `docs/API_CONTRACTS.md` and your module's `README.md`. All inputs and outputs must match the types in `shared/types/`.
3. **Commit & Push Regularly:**
   ```bash
   git add frontend/src/features/<your-module>/
   git commit -m "feat(<module>): add component logic"
   git push origin feature/<your-module>
   ```
4. **Open PR to `develop` (Never `main`):**
   Once your module passes its tests, submit a Pull Request into `develop` using the PR template.
