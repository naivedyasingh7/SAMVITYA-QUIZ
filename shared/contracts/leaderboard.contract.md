# Leaderboard Interface Contract

- **Owner:** Priyansh (`frontend/src/features/leaderboard/`)
- **Key Tables:** `leaderboard`, `winner_declarations`
- **Exported Methods / Hooks:**
  - `useLeaderboard()`: Returns `{ entries, isLoading, isLocked, refresh }`
  - `leaderboardService.declareWinners({ title, adminId })`
- **Realtime Channel:** Subscribes to `points_transactions` and `leaderboard` tables.
