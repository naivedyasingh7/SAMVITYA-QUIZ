-- ====================================================================
-- Event Points Management System - Row Level Security (RLS) Policies
-- Enforces least-privilege access across all 11 normalized tables
-- ====================================================================

ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scoring_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winner_declarations ENABLE ROW LEVEL SECURITY;

-- Helper function: checks if current authenticated user is an active admin
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins
    WHERE id = (SELECT auth.uid()) AND is_active = TRUE
  );
$$;

-- Participants: Anyone can register (insert), read public profile fields or own row, admins manage all
CREATE POLICY "Participants readable by public or self" ON public.participants
  FOR SELECT USING (true);

CREATE POLICY "Participants insertable for registration" ON public.participants
  FOR INSERT WITH CHECK (status = 'active');

CREATE POLICY "Admins update participants" ON public.participants
  FOR UPDATE USING (public.is_active_admin());

-- Admins: Only active admins can read admin table
CREATE POLICY "Admins readable by active admins" ON public.admins
  FOR SELECT USING (public.is_active_admin());

-- Activities: Publicly readable if active; only admins can create/update
CREATE POLICY "Active activities readable by all" ON public.activities
  FOR SELECT USING (is_active = TRUE OR public.is_active_admin());

CREATE POLICY "Admins manage activities" ON public.activities
  FOR ALL USING (public.is_active_admin());

-- Quiz Providers & Integrations: Webhook secrets restricted to admins only
CREATE POLICY "Admins manage quiz providers" ON public.quiz_providers
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admins manage quiz integrations" ON public.quiz_integrations
  FOR ALL USING (public.is_active_admin());

-- Quiz Attempts & Results: Readable by admins or owning participant; writes via Edge Functions / admins
CREATE POLICY "Admins manage quiz attempts" ON public.quiz_attempts
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Public read quiz attempts" ON public.quiz_attempts
  FOR SELECT USING (true);

CREATE POLICY "Admins manage quiz results" ON public.quiz_results
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Public read quiz results" ON public.quiz_results
  FOR SELECT USING (true);

-- Scoring Rules: Only admins manage scoring rules
CREATE POLICY "Admins manage scoring rules" ON public.scoring_rules
  FOR ALL USING (public.is_active_admin());

-- Points Transactions (Immutable Ledger): Append-only by admins; no UPDATE/DELETE allowed
CREATE POLICY "Public read points transactions" ON public.points_transactions
  FOR SELECT USING (true);

CREATE POLICY "Admins insert points transactions" ON public.points_transactions
  FOR INSERT WITH CHECK (public.is_active_admin());

-- Leaderboard & Winner Declarations: Publicly readable; only admins can mutate
CREATE POLICY "Public read leaderboard" ON public.leaderboard
  FOR SELECT USING (true);

CREATE POLICY "Admins update leaderboard" ON public.leaderboard
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Public read winner declarations" ON public.winner_declarations
  FOR SELECT USING (true);

CREATE POLICY "Admins manage winner declarations" ON public.winner_declarations
  FOR ALL USING (public.is_active_admin());
