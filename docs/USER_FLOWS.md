# User Flows Specification

This document maps the primary user and system journeys across all 6 phases.

---

## 1. Participant Journey (Phase 1)
```mermaid
sequenceDiagram
    autonumber
    actor User as Participant
    participant Scanner as QR / Web Browser
    participant PSystem as 1. Participant System
    participant DB as Supabase DB

    User->>Scanner: Scans Event QR Code
    Scanner->>PSystem: Opens /register?code=EVT26
    alt First Time Participant
        User->>PSystem: Inputs Name, Email, Organization
        PSystem->>DB: INSERT INTO participants
        DB-->>PSystem: Returns UUID + participant_code
    else Returning Participant
        User->>PSystem: Enters registered Email
        PSystem->>DB: SELECT WHERE email = ?
        DB-->>PSystem: Recognizes identity
    end
    PSystem->>User: Displays Participant Dashboard & personal QR
```

---

## 2. Quiz Attempt & Automated Scoring Flow (Phases 3 & 4)
```mermaid
sequenceDiagram
    autonumber
    actor User as Participant
    participant UI as 1. Participant Portal
    participant QInt as 3. Quiz Integration
    participant Mock as External / Mock Quiz
    participant Score as 4. Scoring Engine
    participant DB as Postgres Ledger
    participant LB as 5. Leaderboard

    User->>UI: Selects "Cyber Security Challenge"
    UI->>QInt: POST /quiz/launch
    QInt->>DB: INSERT INTO quiz_attempts (status='in_progress')
    QInt-->>UI: Launch URL with attempt & participant tokens
    UI->>Mock: Redirects participant to Quiz
    User->>Mock: Answers questions & submits quiz
    Mock->>QInt: POST /quiz/results (raw_score: 9200)
    QInt->>Score: POST /scoring/process
    Score->>Score: Check idempotency (activity_id + external_result_id)
    Score->>Score: Compute points via scoring_rules
    Score->>DB: INSERT INTO points_transactions (points: 920)
    DB->>LB: Realtime trigger triggers rank refresh
    LB-->>User: Live leaderboard & dashboard updates
```

---

## 3. Offline Points Award Flow (Phase 2 & Phase 4)
```mermaid
sequenceDiagram
    autonumber
    actor Admin as Event Admin / Referee
    participant APortal as 2. Admin Portal
    participant Score as 4. Scoring Engine
    participant DB as Postgres Ledger
    participant LB as 5. Leaderboard

    Admin->>APortal: Scans Participant QR (EVT26-P0102)
    APortal->>APortal: Selects Offline Activity ("Robo Race")
    Admin->>APortal: Inputs Points (300) and Note ("1st place in heat 2")
    APortal->>Score: POST /admin/award-points
    Score->>DB: INSERT INTO points_transactions (type='offline_award')
    DB->>LB: Realtime notification emitted
    LB-->>Admin: Confirms transaction logged
```
