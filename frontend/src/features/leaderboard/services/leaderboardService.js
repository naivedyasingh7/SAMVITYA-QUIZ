import { eventStore } from '../../../shared/services/eventStore.js';
import { isLiveSupabaseMode, supabase } from '../../../shared/services/supabaseMode.js';

export const leaderboardService = {
  /**
   * Retrieve live rankings with complete breakdown.
   * Supports optional track filtering and pagination per API_CONTRACTS.md (GET /api/leaderboard?limit=50&offset=0).
   */
  async getRankings(options = {}) {
    if (isLiveSupabaseMode()) {
      const offset = Number(options.offset) || 0;
      const limit = options.limit !== undefined ? Number(options.limit) : 500;

      const { data, error } = await supabase
        .from('leaderboard')
        .select(`
          participant_id,
          total_points,
          online_points,
          offline_points,
          last_updated_at,
          participants!inner (
            participant_code,
            full_name,
            email,
            status
          )
        `)
        .eq('participants.status', 'active')
        .order('total_points', { ascending: false })
        .order('online_points', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw new Error(error.message);

      return (data || []).map((row, index) => ({
        rank: offset + index + 1,
        participant_id: row.participant_id,
        username: row.participants?.participant_code || 'P000',
        participant_code: row.participants?.participant_code || 'P000',
        full_name: row.participants?.full_name || 'Competitor',
        email: row.participants?.email || '',
        quiz_points: row.online_points || 0,
        offline_points: row.offline_points || 0,
        game_points: row.offline_points || 0,
        total_points: row.total_points || 0,
        last_updated: row.last_updated_at
      }));
    }

    const list = eventStore.getLeaderboard();
    let result = [...list];

    if (options.track && options.track !== 'all') {
      result = result.filter((item) => item.track === options.track);
    }

    if (options.offset !== undefined || options.limit !== undefined) {
      const offset = Number(options.offset) || 0;
      const limit = options.limit !== undefined ? Number(options.limit) : result.length;
      result = result.slice(offset, offset + limit);
    }

    return result;
  },

  /**
   * Officially lock the leaderboard and declare winners.
   */
  async declareWinners(declarationData = {}) {
    if (isLiveSupabaseMode()) {
      const rankings = await this.getRankings({ limit: 3 });
      const { data: authData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('winner_declarations')
        .insert({
          title: declarationData.title || 'Protocol Zero 2026 Grand Championship Winners',
          winners_snapshot: rankings,
          is_locked: true,
          declared_by_admin_id: authData?.user?.id || null
        })
        .select()
        .single();
      if (error) throw new Error(error.message);
      return {
        ...data,
        winners: data.winners_snapshot || rankings
      };
    }

    return eventStore.declareWinners({
      title: declarationData.title || 'Protocol Zero 2026 Grand Championship Winners',
      adminId: declarationData.adminId || 'admin-001'
    });
  },

  /**
   * Unlock leaderboard to accept further scores.
   */
  async unlockLeaderboard() {
    if (isLiveSupabaseMode()) {
      const { error } = await supabase
        .from('winner_declarations')
        .update({ is_locked: false })
        .eq('is_locked', true);
      if (error) throw new Error(error.message);
      return { success: true };
    }

    return eventStore.unlockLeaderboard();
  },

  /**
   * Check if leaderboard is currently locked.
   */
  async isLocked() {
    if (isLiveSupabaseMode()) {
      const { data } = await supabase
        .from('winner_declarations')
        .select('is_locked')
        .eq('is_locked', true)
        .limit(1)
        .maybeSingle();
      return Boolean(data?.is_locked);
    }

    return eventStore.isLeaderboardLocked();
  },

  /**
   * Get winner declaration metadata.
   */
  async getWinnerDeclaration() {
    if (isLiveSupabaseMode()) {
      const { data } = await supabase
        .from('winner_declarations')
        .select('*')
        .eq('is_locked', true)
        .order('declared_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!data) return null;
      return {
        ...data,
        winners: data.winners_snapshot || []
      };
    }

    return eventStore.getWinnerDeclaration();
  }
};
export default leaderboardService;
