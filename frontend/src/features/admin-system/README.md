# Module 2: Admin System

- **Phase:** 2
- **Owner:** Person 2
- **Git Branch:** `feature/admin-system`
- **Directory:** `frontend/src/features/admin-system/`

---

## 🎯 Responsibilities (From Roadmap Image)
- [x] Secure admin login
- [x] Participant management
- [x] Activity management
- [x] Individual offline point awarding

---

## 📁 File Structure
```
admin-system/
├── components/
│   ├── AdminSidebar.jsx        # Navigation sidebar
│   ├── ParticipantTable.jsx    # Searchable participant roster
│   ├── ActivityForm.jsx        # Create/edit online & offline activities
│   └── AdminStats.jsx          # Metric cards (total attendees, points awarded)
├── pages/
│   ├── AdminLogin.jsx          # Secure Supabase Auth login
│   ├── AdminDashboard.jsx      # Overview dashboard
│   ├── ManageParticipants.jsx  # Participant directory & status
│   ├── ManageActivities.jsx    # Activity configuration
│   └── AwardPoints.jsx         # Offline game point award form
├── services/
│   ├── adminService.js         # Admin authorization & stats
│   └── activityService.js      # CRUD operations on activities
├── hooks/
│   └── useAdmin.js             # Admin auth state hook
└── index.js                    # Public exports
```

---

## 🔌 API & Database Contracts
- **Primary Tables:** `admins`, `activities`
- **Endpoints:**
  - `POST /api/admin/login`
  - `GET /api/activities`
  - `POST /api/admin/activities`
  - `POST /api/admin/award-points`
- **Contract Reference:** `shared/contracts/admin.contract.md`
