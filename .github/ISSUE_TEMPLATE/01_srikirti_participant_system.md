---
name: "Task: [Srikirti] Participant System Deliverables"
about: "Deliverable tracker for Srikirti - Phase 1: Participant System"
title: "[Srikirti] Participant System - Phase 1 Implementation"
labels: ["module:participant", "phase-1"]
assignees: ""
---

### 👤 Module Owner
**Srikirti** | Branch: `feature/participant-system` | Folder: `frontend/src/features/participant-system/`

---

### 🎯 Key Responsibilities (From Roadmap Image)
- [ ] **QR Code Registration:** Render QR scanner and entry point for event check-in.
- [ ] **Unique Participant IDs:** Generate and display human-readable `participant_code` (e.g. `EVT26-P0102`).
- [ ] **Returning Participant Recognition:** Detect return visits via local storage / email lookup.
- [ ] **Participant Dashboard:** Personal profile view with point tally, QR code, and available activity list.

---

### 📁 Assigned Deliverable Files
- `components/QRRegistration.jsx`
- `components/ParticipantProfile.jsx`
- `components/ActivityCard.jsx`
- `components/ParticipantNavbar.jsx`
- `pages/RegisterPage.jsx`
- `pages/ParticipantDashboard.jsx`
- `pages/ActivitiesPage.jsx`
- `pages/MyHistoryPage.jsx`
- `services/participantService.js`
- `hooks/useParticipant.js`
- `utils/qrHelper.js`

---

### 📜 Approved Contracts to Follow
- `docs/API_CONTRACTS.md` (`POST /api/participants/register`, `GET /api/participants/me`)
- `shared/types/participant.types.js`
- `shared/validators/participant.validator.js`
