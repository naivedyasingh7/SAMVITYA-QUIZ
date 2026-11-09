# API Contracts & Interfaces

This document describes all standard endpoints, request bodies, response shapes, and error standards. All module developers must adhere to these exact structures.

---

## 🔠 Standard Response Envelopes

### Success Envelope
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2026-11-09T10:00:00.000Z"
}
```

### Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_RESULT_SUBMISSION",
    "message": "A result with external_result_id 'RES-001' has already been scored for this activity.",
    "details": null
  },
  "timestamp": "2026-11-09T10:00:00.000Z"
}
```

---

## 🔌 Core Interfaces by Module

### 1. Participant System (Person 1)
- **POST `/api/participants/register`**
  - **Request Body:**
    ```json
    {
      "full_name": "Alex Mercer",
      "email": "alex.mercer@example.com",
      "phone": "+1234567890",
      "organization": "Alpha University"
    }
    ```
  - **Response (201 Created / 200 OK for returning):**
    ```json
    {
      "success": true,
      "data": {
        "id": "e4b52c08-0bf4-4f0f-8c38-89c89895ff81",
        "participant_code": "EVT26-P0102",
        "full_name": "Alex Mercer",
        "email": "alex.mercer@example.com",
        "is_returning": false,
        "created_at": "2026-11-09T10:00:00.000Z"
      }
    }
    ```

- **GET `/api/participants/me?id=UUID`**
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "id": "e4b52c08-0bf4-4f0f-8c38-89c89895ff81",
        "participant_code": "EVT26-P0102",
        "full_name": "Alex Mercer",
        "total_points": 1450,
        "current_rank": 3,
        "history": [
          {
            "id": "trans-uuid",
            "points": 500,
            "reason": "Completed Tech Trivia Quiz",
            "created_at": "2026-11-09T10:30:00.000Z"
          }
        ]
      }
    }
    ```

---

### 2. Admin System (Person 2)
- **GET `/api/activities`**
  - **Query Params:** `?type=online_quiz|offline_game&active=true`
  - **Response (200 OK):** Array of activity records.

- **POST `/api/admin/activities`**
  - **Request Body:**
    ```json
    {
      "title": "Robotics Maze Challenge",
      "description": "Navigate the physical maze within 3 minutes",
      "activity_type": "offline_game",
      "max_points": 500,
      "is_active": true
    }
    ```

- **POST `/api/admin/award-points`**
  - **Request Body:**
    ```json
    {
      "participant_id": "e4b52c08-0bf4-4f0f-8c38-89c89895ff81",
      "activity_id": "act-uuid-here",
      "points": 350,
      "reason": "Top 3 finish in Robotics Maze Challenge",
      "admin_id": "admin-uuid"
    }
    ```

---

### 3. Quiz Integration Framework (Person 3)
- **POST `/api/quiz/launch`**
  - **Request Body:**
    ```json
    {
      "participant_id": "e4b52c08-0bf4-4f0f-8c38-89c89895ff81",
      "activity_id": "act-uuid-here"
    }
    ```
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "attempt_id": "att-9912-uuid",
        "launch_url": "https://quiz.example.com/join?pid=e4b5...&aid=att-9912...",
        "provider": "mock"
      }
    }
    ```

- **POST `/api/quiz/results` (Ingestion Endpoint)**
  - **Request Body:**
    ```json
    {
      "attempt_id": "att-9912-uuid",
      "participant_id": "e4b52c08-0bf4-4f0f-8c38-89c89895ff81",
      "activity_id": "act-uuid-here",
      "provider": "mock",
      "external_result_id": "MOCK-RES-77812",
      "raw_score": 8500,
      "max_score": 10000,
      "completion_status": "completed",
      "metadata": {
        "time_taken_seconds": 142,
        "correct_answers": 17,
        "total_questions": 20
      }
    }
    ```

---

### 4. Automatic Scoring Engine (Person 4)
- **POST `/api/scoring/process`**
  - **Request Body:** Standard Normalized Quiz Result object.
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "transaction_id": "tx-8812-uuid",
        "participant_id": "e4b52c08-0bf4-4f0f-8c38-89c89895ff81",
        "points_awarded": 850,
        "calculation_log": "8500 / 10000 * 1000 max_points = 850 pts",
        "status": "confirmed"
      }
    }
    ```

---

### 5. Leaderboard (Person 5)
- **GET `/api/leaderboard`**
  - **Query Params:** `?limit=50&offset=0`
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "is_locked": false,
        "entries": [
          {
            "rank": 1,
            "participant_id": "uuid-1",
            "participant_code": "EVT26-P0102",
            "full_name": "Alex Mercer",
            "total_points": 2350,
            "online_points": 1500,
            "offline_points": 850
          }
        ]
      }
    }
    ```

- **POST `/api/admin/winners`**
  - **Request Body:**
    ```json
    {
      "title": "Official Event Winners 2026",
      "lock_leaderboard": true,
      "admin_id": "admin-uuid"
    }
    ```
