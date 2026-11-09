# Production Deployment Checklist

- [ ] Supabase project configured with all 11 tables and RLS policies.
- [ ] Environment variables set in Vercel project settings:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] Admin seed user verified.
- [ ] Realtime replication enabled on `points_transactions` and `leaderboard`.
- [ ] Mobile viewport tested on iOS Safari and Android Chrome.
