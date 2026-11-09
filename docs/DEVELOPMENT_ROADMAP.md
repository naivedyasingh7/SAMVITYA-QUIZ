# Development Roadmap

Six phases, each one buildable and testable on its own.

---

## 🗺️ Visual Roadmap (From Specification)

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│ 1 Participant system                 │     │ 2 Admin system                       │     │ 3 Quiz integration framework         │
│ • QR code registration               │────▶│ • Secure admin login                 │────▶│ • Provider adapter architecture      │
│ • Unique participant IDs             │     │ • Participant management             │     │ • Quiz launch and attempt tracking   │
│ • Returning participant recognition  │     │ • Activity management                │     │ • External result ingestion          │
│ • Participant dashboard              │     │ • Individual offline point awarding  │     │ • Participant matching               │
└──────────────────────────────────────┘     └──────────────────────────────────────┘     └──────────────────────────────────────┘
                   │                                            │                                            │
                   ▼                                            ▼                                            ▼
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│ 4 Automatic scoring                  │     │ 5 Leaderboard                        │     │ 6 Testing and deployment             │
│ • Result validation                  │────▶│ • Live rankings                      │────▶│ • Multiple-participant testing       │
│ • Scoring rules                      │     │ • Participant performance            │     │ • Duplicate submission testing       │
│ • Duplicate prevention               │     │ • Admin analytics                    │     │ • Security testing                   │
│ • Points transactions                │     │ • Final winner declaration           │     │ • Mobile responsiveness              │
│                                      │     │                                      │     │ • Production deployment              │
└──────────────────────────────────────┘     └──────────────────────────────────────┘     └──────────────────────────────────────┘
```

**Next Milestone:** Design the database schema and API contracts before any frontend screens. Everyone then builds against the same interfaces.

---

## 🎯 Phase Deliverables & Acceptance Criteria

### Phase 1: Participant System (Srikirti)
- [ ] Working QR-entry landing page
- [ ] Registration form generating unique `participant_code` (e.g. `EVT26-P0102`)
- [ ] Local storage persistence for seamless return visits
- [ ] Participant dashboard displaying personal code, QR code, and point total

### Phase 2: Admin System (Suvradeep)
- [ ] Protected admin login route
- [ ] Participant roster table with search & filter
- [ ] Activity management (create online/offline activities, set max points)
- [ ] Offline point award modal with participant search & validation

### Phase 3: Quiz Integration Framework (Ashwin)
- [ ] Pluggable `BaseQuizProvider` abstract class
- [ ] Functional `MockQuizProvider` simulating real user completions
- [ ] Attempt launch generator creating tracked session tokens
- [ ] Webhook/REST ingestion handler mapping external results to internal participant IDs

### Phase 4: Automatic Scoring Engine (Divya)
- [ ] Payload validation according to `quizResult.validator.js`
- [ ] Deduplication guard preventing double scoring of same `external_result_id`
- [ ] Activity scoring rule calculations (linear percentage conversion)
- [ ] Ledger entry creator inserting verified `points_transactions`

### Phase 5: Leaderboard (Priyanshu)
- [ ] Real-time leaderboard table sorting participants by cumulative points
- [ ] Top 3 podium display with avatar and badges
- [ ] Detailed participant breakdown modal (online vs offline points)
- [ ] Final winner announcement and leaderboard freeze switch

### Phase 6: Testing & Deployment (Naivedya)
- [ ] Comprehensive unit tests for points calculation & validators
- [ ] Integration test verifying: Registration -> Launch -> Mock Result -> Score Award -> Leaderboard Update
- [ ] Duplicate submission stress test (concurrency safety)
- [ ] Production Vercel + Supabase deployment workflow
