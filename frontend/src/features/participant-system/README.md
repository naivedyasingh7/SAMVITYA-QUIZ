# Module 1: Participant System

- **Phase:** 1
- **Owner:** Person 1
- **Git Branch:** `feature/participant-system`
- **Directory:** `frontend/src/features/participant-system/`

---

## 🎯 Responsibilities (From Roadmap Image)
- [x] QR code registration
- [x] Unique participant IDs (`participant_code`)
- [x] Returning participant recognition
- [x] Participant dashboard

---

## 📁 File Structure
```
participant-system/
├── components/
│   ├── QRRegistration.jsx       # QR scanner & code display
│   ├── ParticipantProfile.jsx   # Profile & point summary
│   ├── ActivityCard.jsx         # Clickable activity cards
│   └── ParticipantNavbar.jsx    # Top navigation
├── pages/
│   ├── RegisterPage.jsx         # Intake registration form
│   ├── ParticipantDashboard.jsx # Main user dashboard
│   ├── ActivitiesPage.jsx       # Available quizzes & games
│   └── MyHistoryPage.jsx        # Points & activity log
├── services/
│   └── participantService.js    # API calls to /participants
├── hooks/
│   └── useParticipant.js        # State & session hook
├── utils/
│   └── qrHelper.js              # QR code generator/decoder
└── index.js                     # Public exports
```

---

## 🔌 API & Database Contracts
- **Primary Table:** `participants`
- **Endpoints:**
  - `POST /api/participants/register`
  - `GET /api/participants/me`
- **Contract Reference:** `shared/contracts/participant.contract.md`
