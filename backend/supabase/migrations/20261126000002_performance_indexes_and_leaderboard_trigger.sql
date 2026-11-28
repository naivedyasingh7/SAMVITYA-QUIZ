-- ====================================================================
-- Protocol Zero - High-Concurrency Indexes, Sequence & Leaderboard Trigger
-- Designed for 500+ simultaneous participants on Supabase Postgres
-- ====================================================================

-- 1. Collision-free sequential participant code generator (P001, P002, ...)
CREATE SEQUENCE IF NOT EXISTS public.participant_code_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION public.next_participant_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  next_val BIGINT;
BEGIN
  next_val := nextval('public.participant_code_seq');
  RETURN 'P' || LPAD(next_val::TEXT, 3, '0');
END;
$$;

-- 2. Additional composite indexes for 500-user load
CREATE INDEX IF NOT EXISTS idx_participants_code ON public.participants(participant_code);
CREATE INDEX IF NOT EXISTS idx_points_tx_participant_created ON public.points_transactions(participant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_participant_activity ON public.quiz_attempts(participant_id, activity_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_composite ON public.leaderboard(total_points DESC, online_points DESC);

-- 3. Automatic atomic leaderboard upsert trigger on immutable points_transactions
CREATE OR REPLACE FUNCTION public.sync_leaderboard_on_transaction()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  delta_online INTEGER := 0;
  delta_offline INTEGER := 0;
BEGIN
  IF NEW.transaction_type = 'quiz_award' THEN
    delta_online := NEW.points;
  ELSIF NEW.transaction_type IN ('offline_award', 'bonus', 'deduction') THEN
    delta_offline := NEW.points;
  END IF;

  INSERT INTO public.leaderboard (
    participant_id,
    total_points,
    online_points,
    offline_points,
    last_updated_at
  )
  VALUES (
    NEW.participant_id,
    NEW.points,
    delta_online,
    delta_offline,
    NOW()
  )
  ON CONFLICT (participant_id) DO UPDATE SET
    total_points = public.leaderboard.total_points + EXCLUDED.total_points,
    online_points = public.leaderboard.online_points + EXCLUDED.online_points,
    offline_points = public.leaderboard.offline_points + EXCLUDED.offline_points,
    last_updated_at = NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_leaderboard_on_tx ON public.points_transactions;
CREATE TRIGGER trg_sync_leaderboard_on_tx
AFTER INSERT ON public.points_transactions
FOR EACH ROW
EXECUTE FUNCTION public.sync_leaderboard_on_transaction();
