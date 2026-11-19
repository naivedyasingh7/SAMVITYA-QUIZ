---
name: "Task: [Suvradeep] Admin System Deliverables"
about: "Deliverable tracker for Suvradeep - Phase 2: Admin System"
title: "[Suvradeep] Admin System - Phase 2 Implementation"
labels: ["module:admin", "phase-2"]
assignees: ""
---

### 👤 Module Owner
**Suvradeep** | Branch: `feature/admin-system` | Folder: `frontend/src/features/admin-system/`

---

### 🎯 Key Responsibilities (From Roadmap Image)
- [ ] **Secure Admin Login:** Supabase Auth protected route and session management.
- [ ] **Participant Management:** Searchable and filterable table of all registered participants.
- [ ] **Activity Management:** Form to create, update, and toggle online and offline activities.
- [ ] **Individual Offline Point Awarding:** Modal / form to award points to specific participants for physical booths/games.

---

### 📁 Assigned Deliverable Files
- `components/AdminSidebar.jsx`
- `components/ParticipantTable.jsx`
- `components/ActivityForm.jsx`
- `components/AdminStats.jsx`
- `pages/AdminLogin.jsx`
- `pages/AdminDashboard.jsx`
- `pages/ManageParticipants.jsx`
- `pages/ManageActivities.jsx`
- `pages/AwardPoints.jsx`
- `services/adminService.js`
- `services/activityService.js`
- `hooks/useAdmin.js`

---

### 📜 Approved Contracts to Follow
- `docs/API_CONTRACTS.md` (`GET /api/activities`, `POST /api/admin/activities`, `POST /api/admin/award-points`)
- `shared/types/activity.types.js`
- `shared/contracts/admin.contract.md`
