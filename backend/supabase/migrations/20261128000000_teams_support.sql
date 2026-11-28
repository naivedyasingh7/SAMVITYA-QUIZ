-- ====================================================================
-- Protocol Zero - Team Login & Shared Team Dashboard Support
-- Allows every participant of a team to log in with a common team username/password
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_name VARCHAR(128) NOT NULL,
    team_username VARCHAR(64) NOT NULL UNIQUE,
    team_password VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.participants
    ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS team_name VARCHAR(128);

CREATE INDEX IF NOT EXISTS idx_teams_username ON public.teams(team_username);
CREATE INDEX IF NOT EXISTS idx_participants_team_id ON public.participants(team_id);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Teams readable for team login" ON public.teams;
CREATE POLICY "Teams readable for team login" ON public.teams
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage teams" ON public.teams;
CREATE POLICY "Admins manage teams" ON public.teams
  FOR ALL USING (public.is_active_admin());

-- Seed sample teams for immediate testing
INSERT INTO public.teams (team_name, team_username, team_password)
VALUES
  ('Alpha Cyber Squad', 'TEAM-ALPHA', 'Alpha@2026'),
  ('Nova Robotics', 'TEAM-NOVA', 'Nova@2026')
ON CONFLICT (team_username) DO NOTHING;
