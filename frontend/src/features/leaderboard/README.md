# Module 5: Leaderboard

- **Phase:** 5
- **Owner:** Priyanshu
- **Git Branch:** `feature/leaderboard`
- **Directory:** `frontend/src/features/leaderboard/`

---

## 🎯 Responsibilities (From Roadmap Image)
- [x] Live rankings
- [x] Participant performance
- [x] Admin analytics
- [x] Final winner declaration

---

## 📁 File Structure
```
leaderboard/
├── components/
│   ├── LeaderboardTable.jsx    # Real-time ranked table
│   ├── TopThree.jsx            # Gold, Silver, Bronze podium
│   ├── RankCard.jsx            # Highlighted rank card for logged in user
│   └── WinnerAnnouncement.jsx  # Frozen winner celebration modal / banner
├── pages/
│   ├── LeaderboardPage.jsx     # Public / projector live display
│   └── AdminAnalytics.jsx      # Performance distribution charts
├── services/
│   └── leaderboardService.js   # Rank queries and freeze lock API
├── hooks/
│   └── useLeaderboard.js       # Realtime Supabase channel subscriber
└── index.js                    # Public exports
```

---

## 🔌 API & Database Contracts
- **Primary Tables:** `leaderboard`, `winner_declarations`
- **Realtime Channel:** Listens for `INSERT` on `points_transactions` or `UPDATE` on `leaderboard`.
- **Contract Reference:** `shared/contracts/leaderboard.contract.md`
