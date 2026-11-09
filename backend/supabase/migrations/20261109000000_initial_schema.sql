-- ====================================================================
-- Event Points Management System - Initial Migration
-- Approved centralized schema across 6 independent modules
-- ====================================================================

-- 1. Participants Table (Owner: Person 1)
CREATE TABLE IF NOT EXISTS public.participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_code VARCHAR(32) NOT NULL UNIQUE,
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(32),
    organization VARCHAR(128),
    avatar_url TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disqualified', 'withdrawn')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Admins Table (Owner: Person 2)
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY,
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(32) NOT NULL DEFAULT 'event_admin' CHECK (role IN ('super_admin', 'event_admin', 'referee')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Activities Table (Owner: Person 2)
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(128) NOT NULL,
    description TEXT,
    activity_type VARCHAR(32) NOT NULL CHECK (activity_type IN ('online_quiz', 'offline_game', 'workshop', 'bonus')),
    max_points INTEGER NOT NULL DEFAULT 1000,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Quiz Providers Table (Owner: Person 3)
CREATE TABLE IF NOT EXISTS public.quiz_providers (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    adapter_class VARCHAR(64) NOT NULL,
    config_schema JSONB NOT NULL DEFAULT '{}',
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- 5. Quiz Integrations Table (Owner: Person 3)
CREATE TABLE IF NOT EXISTS public.quiz_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID NOT NULL UNIQUE REFERENCES public.activities(id) ON DELETE CASCADE,
    provider_id VARCHAR(32) NOT NULL REFERENCES public.quiz_providers(id),
    external_quiz_url TEXT NOT NULL,
    webhook_secret VARCHAR(128),
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Quiz Attempts Table (Owner: Person 3)
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID NOT NULL REFERENCES public.participants(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    status VARCHAR(32) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 7. Quiz Results Table (Owner: Person 3)
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES public.participants(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    provider VARCHAR(32) NOT NULL,
    external_result_id VARCHAR(128) NOT NULL,
    raw_score NUMERIC NOT NULL,
    max_score NUMERIC NOT NULL,
    completion_status VARCHAR(32) NOT NULL CHECK (completion_status IN ('completed', 'partial', 'disqualified')),
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_activity_external_result UNIQUE (activity_id, external_result_id)
);

-- 8. Scoring Rules Table (Owner: Person 4)
CREATE TABLE IF NOT EXISTS public.scoring_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    calculation_method VARCHAR(32) NOT NULL CHECK (calculation_method IN ('linear_scale', 'percentile', 'fixed_brackets', 'threshold')),
    parameters JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Points Transactions Table (Owner: Person 4 - IMMUTABLE LEDGER)
CREATE TABLE IF NOT EXISTS public.points_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID NOT NULL REFERENCES public.participants(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES public.activities(id) ON DELETE SET NULL,
    quiz_result_id UUID REFERENCES public.quiz_results(id) ON DELETE SET NULL,
    points INTEGER NOT NULL,
    transaction_type VARCHAR(32) NOT NULL CHECK (transaction_type IN ('quiz_award', 'offline_award', 'bonus', 'deduction', 'manual_correction')),
    reason TEXT NOT NULL,
    created_by_admin_id UUID REFERENCES public.admins(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Leaderboard Table (Owner: Person 5)
CREATE TABLE IF NOT EXISTS public.leaderboard (
    participant_id UUID PRIMARY KEY REFERENCES public.participants(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    online_points INTEGER NOT NULL DEFAULT 0,
    offline_points INTEGER NOT NULL DEFAULT 0,
    rank INTEGER NOT NULL DEFAULT 0,
    last_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Winner Declarations Table (Owner: Person 5)
CREATE TABLE IF NOT EXISTS public.winner_declarations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(128) NOT NULL,
    winners_snapshot JSONB NOT NULL,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    declared_by_admin_id UUID REFERENCES public.admins(id) ON DELETE SET NULL,
    declared_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for high-concurrency queries
CREATE INDEX IF NOT EXISTS idx_participants_email ON public.participants(email);
CREATE INDEX IF NOT EXISTS idx_points_tx_participant ON public.points_transactions(participant_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_external ON public.quiz_results(external_result_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON public.leaderboard(total_points DESC);
