-- Move is_active_admin() out of exposed public schema into private schema
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.is_active_admin()
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

GRANT USAGE ON SCHEMA private TO anon, authenticated;
GRANT EXECUTE ON FUNCTION private.is_active_admin() TO anon, authenticated;

-- Re-point all RLS policies from public.is_active_admin() to private.is_active_admin()
ALTER POLICY "Admins update participants" ON public.participants
  USING (private.is_active_admin());

ALTER POLICY "Admins readable by active admins" ON public.admins
  USING (private.is_active_admin());

ALTER POLICY "Active activities readable by all" ON public.activities
  USING (is_active = TRUE OR private.is_active_admin());

ALTER POLICY "Admins manage activities" ON public.activities
  USING (private.is_active_admin());

ALTER POLICY "Admins manage quiz providers" ON public.quiz_providers
  USING (private.is_active_admin());

ALTER POLICY "Admins manage quiz integrations" ON public.quiz_integrations
  USING (private.is_active_admin());

ALTER POLICY "Admins manage quiz attempts" ON public.quiz_attempts
  USING (private.is_active_admin());

ALTER POLICY "Admins manage quiz results" ON public.quiz_results
  USING (private.is_active_admin());

ALTER POLICY "Admins manage scoring rules" ON public.scoring_rules
  USING (private.is_active_admin());

ALTER POLICY "Admins insert points transactions" ON public.points_transactions
  WITH CHECK (private.is_active_admin());

ALTER POLICY "Admins update leaderboard" ON public.leaderboard
  USING (private.is_active_admin());

ALTER POLICY "Admins manage winner declarations" ON public.winner_declarations
  USING (private.is_active_admin());

-- Revoke public/anon/authenticated execute on the legacy public function
REVOKE ALL ON FUNCTION public.is_active_admin() FROM PUBLIC, anon, authenticated;
