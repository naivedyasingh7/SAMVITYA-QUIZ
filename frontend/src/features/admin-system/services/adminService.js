import { eventStore } from '../../../shared/services/eventStore.js';
import { isLiveSupabaseMode, supabase } from '../../../shared/services/supabaseMode.js';
import { pointsService } from '../../automatic-scoring/services/pointsService.js';
import { leaderboardService } from '../../leaderboard/services/leaderboardService.js';

export const adminService = {
  /**
   * Compute aggregate live statistics for Protocol Zero admin overview.
   */
  async getOverviewStats() {
    if (isLiveSupabaseMode()) {
      const [
        { count: participantCount },
        { data: activities },
        { data: txs },
        isLocked
      ] = await Promise.all([
        supabase.from('participants').select('id', { count: 'exact', head: true }),
        supabase.from('activities').select('id, is_active'),
        supabase.from('points_transactions').select('points, transaction_type'),
        leaderboardService.isLocked()
      ]);

      const totalParticipants = participantCount || 0;
      const txList = txs || [];
      const totalPointsAwarded = txList.reduce((sum, tx) => sum + (tx.points || 0), 0);
      const activeActivities = (activities || []).filter((a) => a.is_active).length;
      const avgScore = totalParticipants > 0 ? Math.round(totalPointsAwarded / totalParticipants) : 0;
      const quizCount = txList.filter((t) => t.transaction_type === 'quiz_award').length;

      return {
        totalParticipants,
        totalPointsAwarded,
        activeActivities,
        averageScore: avgScore,
        totalQuizzesCompleted: quizCount,
        isLeaderboardLocked: isLocked
      };
    }

    const participants = eventStore.getParticipants();
    const activities = eventStore.getActivities();
    const transactions = eventStore.getTransactions();

    const totalPointsAwarded = transactions.reduce((sum, tx) => sum + (tx.points || 0), 0);
    const activeActivities = activities.filter((a) => a.is_active).length;
    const avgScore = participants.length > 0 ? Math.round(totalPointsAwarded / participants.length) : 0;
    const quizCount = transactions.filter((t) => t.transaction_type === 'quiz_award').length;

    return {
      totalParticipants: participants.length,
      totalPointsAwarded,
      activeActivities,
      averageScore: avgScore,
      totalQuizzesCompleted: quizCount,
      isLeaderboardLocked: eventStore.isLeaderboardLocked()
    };
  },

  /**
   * Award offline-game points to an individual participant with mandatory audit reason.
   */
  async awardOfflinePoints({ participant_id, activity_id, points, reason, admin_id = 'admin-001' }) {
    if (isLiveSupabaseMode()) {
      const res = await pointsService.recordTransaction({
        participant_id,
        activity_id,
        points: Number(points),
        transaction_type: 'offline_challenge',
        reason,
        admin_id
      });
      return res.transaction;
    }

    return eventStore.recordTransaction({
      participant_id,
      activity_id,
      points: Number(points),
      transaction_type: 'offline_challenge',
      reason,
      admin_id
    });
  },

  /**
   * Fetch all participants with their live calculated rank and point balance.
   */
  async getAllParticipants() {
    if (isLiveSupabaseMode()) {
      return leaderboardService.getRankings();
    }

    return eventStore.getLeaderboard();
  }
};
export default adminService;
