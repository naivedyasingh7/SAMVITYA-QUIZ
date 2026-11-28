import { eventStore } from '../../../shared/services/eventStore.js';
import { isLiveSupabaseMode, supabase } from '../../../shared/services/supabaseMode.js';

export const participantService = {
  /**
   * Register new participant or recognize returning participant.
   */
  async register({ full_name, email, phone = '', organization = '', track = 'General Tech' }) {
    if (isLiveSupabaseMode()) {
      const { data, error } = await supabase.functions.invoke('register-participant', {
        body: { full_name, email, phone, organization }
      });
      if (error) throw new Error(error.message || 'Registration failed');
      if (!data?.success) throw new Error(data?.error || 'Registration failed');
      const p = data.data;
      return {
        ...p,
        username: p.participant_code
      };
    }

    const participant = eventStore.registerParticipant({
      fullName: full_name,
      email,
      organization,
      track
    });
    return participant;
  },

  /**
   * Authenticate a team using its shared team username and password.
   */
  async loginTeam({ teamUsername, password }) {
    const cleanUser = String(teamUsername || '').trim();
    const cleanPass = String(password || '');
    if (!cleanUser || !cleanPass) {
      throw new Error('Team username and password are required.');
    }

    if (isLiveSupabaseMode()) {
      const { data: team, error } = await supabase
        .from('teams')
        .select('id, team_name, team_username, team_password')
        .ilike('team_username', cleanUser)
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!team || team.team_password !== cleanPass) {
        throw new Error('Invalid team username or password.');
      }
      return {
        id: team.id,
        team_name: team.team_name,
        team_username: team.team_username
      };
    }

    return eventStore.authenticateTeam(cleanUser, cleanPass);
  },

  /**
   * Fetch team overview: team name, all members with quiz & offline points, and combined activity feed.
   */
  async getTeamDashboard({ teamId, teamUsername }) {
    if (isLiveSupabaseMode()) {
      const { data: membersRaw, error: mErr } = await supabase
        .from('participants')
        .select('id, participant_code, full_name, email, status, created_at, team_id, team_name')
        .eq('team_id', teamId);

      if (mErr) throw new Error(mErr.message);

      const memberIds = (membersRaw || []).map((m) => m.id);
      let lbRows = [];
      let txRows = [];

      if (memberIds.length > 0) {
        const [lbRes, txRes] = await Promise.all([
          supabase
            .from('leaderboard')
            .select('participant_id, total_points, online_points, offline_points, rank')
            .in('participant_id', memberIds),
          supabase
            .from('points_transactions')
            .select('*')
            .in('participant_id', memberIds)
            .order('created_at', { ascending: false })
            .limit(100)
        ]);
        lbRows = lbRes.data || [];
        txRows = txRes.data || [];
      }

      const lbMap = new Map(lbRows.map((r) => [r.participant_id, r]));
      const memberMap = new Map((membersRaw || []).map((m) => [m.id, m]));

      const transactions = txRows.map((tx) => {
        const m = memberMap.get(tx.participant_id);
        return {
          ...tx,
          participant_name: m?.full_name || 'Member',
          participant_code: m?.participant_code || 'P000'
        };
      });

      const members = (membersRaw || []).map((m) => {
        const lb = lbMap.get(m.id);
        const latestTx = transactions.find((tx) => tx.participant_id === m.id);
        return {
          id: m.id,
          participant_code: m.participant_code,
          full_name: m.full_name,
          email: m.email,
          status: m.status || 'Active',
          quiz_points: lb?.online_points || 0,
          offline_points: lb?.offline_points || 0,
          total_points: lb?.total_points || 0,
          rank: lb?.rank || '-',
          latest_activity: latestTx ? latestTx.reason : 'Waiting for first activity',
          latest_activity_at: latestTx?.created_at || m.created_at
        };
      });

      return {
        team_id: teamId,
        team_name: membersRaw?.[0]?.team_name || teamUsername,
        team_username: teamUsername,
        total_points: members.reduce((s, m) => s + m.total_points, 0),
        quiz_points: members.reduce((s, m) => s + m.quiz_points, 0),
        offline_points: members.reduce((s, m) => s + m.offline_points, 0),
        members,
        transactions
      };
    }

    return eventStore.getTeamDashboard(teamUsername || teamId);
  },

  /**
   * Retrieve participant profile with their live points and rank.
   */
  async getProfile(participantId) {
    if (isLiveSupabaseMode()) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(participantId));
      const query = supabase.from('participants').select('*');
      const { data: p, error } = isUuid
        ? await query.eq('id', participantId).maybeSingle()
        : await query.or(`participant_code.eq.${participantId},email.eq.${participantId}`).maybeSingle();

      if (error || !p) return null;

      const { data: lb } = await supabase
        .from('leaderboard')
        .select('total_points, online_points, offline_points, rank')
        .eq('participant_id', p.id)
        .maybeSingle();

      return {
        ...p,
        username: p.participant_code,
        total_points: lb?.total_points || 0,
        quiz_points: lb?.online_points || 0,
        offline_points: lb?.offline_points || 0,
        rank: lb?.rank || '-'
      };
    }

    const participant = eventStore.getParticipantById(participantId);
    if (!participant) return null;

    const leaderboard = eventStore.getLeaderboard();
    const rankEntry = leaderboard.find((item) => item.participant_id === participant.id);

    return {
      ...participant,
      total_points: rankEntry?.total_points || 0,
      quiz_points: rankEntry?.quiz_points || 0,
      offline_points: rankEntry?.offline_points || 0,
      rank: rankEntry?.rank || '-'
    };
  },

  /**
   * Retrieve personal point ledger history for a participant.
   */
  async getMyHistory(participantId) {
    if (isLiveSupabaseMode()) {
      const { data, error } = await supabase
        .from('points_transactions')
        .select('*')
        .eq('participant_id', participantId)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    }

    return eventStore.getTransactions({ participantId });
  }
};
export default participantService;
