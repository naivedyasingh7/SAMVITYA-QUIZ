## 📌 Module Pull Request

### 👤 Author & Module
- **Module:** [e.g., Participant System / Admin System / etc.]
- **Assigned Person:** [Srikirti - 6]
- **Target Branch:** `develop`
- **Source Feature Branch:** `feature/<feature-name>`

---

### 📝 Summary of Changes
- Briefly describe the features implemented, components added, or bug fixes.

---

### 🔍 Contract & Architecture Verification Checklist
- [ ] Code is strictly isolated inside my assigned folder: `frontend/src/features/<my-module>/`.
- [ ] No files in `shared/` or `docs/` were modified without prior integrator approval.
- [ ] Payloads and objects match `docs/API_CONTRACTS.md` and `shared/types/`.
- [ ] Immutable transaction rule respected (no direct point total mutations).
- [ ] Idempotency key (`external_result_id`) properly handled (for quiz/scoring modules).
- [ ] Unit tests added / updated and passing (`npm test`).
- [ ] No hardcoded secrets or API keys committed.

---

### 📸 Test Walkthrough / Screenshot Demo
- [Attach screenshots or terminal test output demonstrating the working feature]
