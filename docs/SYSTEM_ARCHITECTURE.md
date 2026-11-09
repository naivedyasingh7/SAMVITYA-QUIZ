# System Architecture Specification

---

## 1. High-Level Architectural Model

The **Event Points Management System** utilizes a modern, resilient architecture decoupled across 6 independent feature modules, coordinated via standardized API contracts and a centralized Supabase PostgreSQL database.

```mermaid
flowchart TD
    subgraph ClientLayer ["Frontend Client Layer (React 18 + Vite + Tailwind CSS)"]
        direction TB
        M1["1. Participant System<br/>(QR Entry & Identity)"]
        M2["2. Admin System<br/>(Management & Offline Points)"]
        M3["3. Quiz Integration<br/>(Provider Adapters & Launch)"]
        M4["4. Automatic Scoring<br/>(Validation & Points Engine)"]
        M5["5. Leaderboard<br/>(Live Ranks & Winner Declaration)"]
        M6["6. Testing Suite<br/>(E2E, Simulators & QA Portal)"]
    end

    subgraph SharedLayer ["Integration Control Center (shared/)"]
        Contracts["API Contracts & Type Definitions"]
        Validators["Payload Validators & Business Rules"]
        Constants["System Constants & Roles"]
    end

    subgraph BackendLayer ["Backend Services & Compute"]
        EdgeFunctions["Supabase Edge Functions<br/>(Validation, Ingestion, Leaderboard Cache)"]
        RealtimeEngine["Supabase Realtime Engine<br/>(WebSockets)"]
    end

    subgraph DatabaseLayer ["Centralized Database (PostgreSQL 15)"]
        DB_P["participants"]
        DB_A["activities"]
        DB_QA["quiz_attempts & quiz_results"]
        DB_PT["points_transactions (Immutable Ledger)"]
        DB_LB["leaderboard (Materialized Cache)"]
        DB_SR["scoring_rules & winner_declarations"]
    end

    M1 --> Contracts
    M2 --> Contracts
    M3 --> Contracts
    M4 --> Contracts
    M5 --> Contracts
    M6 --> Contracts

    Contracts --> EdgeFunctions
    EdgeFunctions --> DatabaseLayer
    DatabaseLayer --> RealtimeEngine
    RealtimeEngine -.->|Instant Rank Updates| M5
    RealtimeEngine -.->|Instant Point Updates| M1
```

---

## 2. End-to-End Data Pipeline

### Flow A: Online Quiz Activity
1. **Participant Intake:** Participant scans event QR code; Person 1's module registers identity and stores `participant_id` (UUID) in local state / cookies.
2. **Quiz Launch:** Participant clicks an online activity. Person 3's module creates a record in `quiz_attempts` and opens the provider link with URL query parameters (`?participant_id=UUID&attempt_id=UUID`).
3. **Result Ingestion:** Upon quiz completion, the external platform (or mock adapter) sends the raw score to Person 3's ingestion endpoint.
4. **Scoring & Verification:** Person 4's scoring engine receives the normalized result, checks for duplicate submissions (`external_result_id` uniqueness), evaluates against `scoring_rules`, and writes an immutable record to `points_transactions`.
5. **Leaderboard Refresh:** Leaderboard triggers an update, re-aggregating valid point transactions. Realtime notifications broadcast updated ranks to all screens.

### Flow B: Offline Game & Staff Award
1. **Admin Action:** Staff/Admin logs in via Person 2's portal and selects a participant and offline activity (e.g., Booth Game, Hackathon Bonus).
2. **Transaction Emission:** Admin specifies point value and rationale. Request is routed through Person 4's points engine.
3. **Audit Ledger:** Point change is logged in `points_transactions` with `created_by_admin_id`.
4. **Leaderboard Refresh:** Realtime broadcast reflects the updated score immediately.

---

## 3. Core Architectural Guarantees

1. **Transaction-Only Points (No Direct Mutation):**
   Participant total points are **never stored as a directly mutable number**. Total score is always derived via `SUM(points)` from `points_transactions` where `status = 'confirmed'`.
2. **Idempotency & Duplicate Prevention:**
   Every external score submission must include an `external_result_id`. The database enforces `UNIQUE(activity_id, external_result_id)`. Duplicate webhook hits or page refreshes are discarded safely.
3. **Provider Agnostic Design:**
   Person 3's Quiz Integration module isolates third-party platforms behind a unified `BaseQuizProvider` interface. Supporting Kahoot, Wayground, Quizizz, or custom web forms requires zero modifications to the scoring or participant modules.
