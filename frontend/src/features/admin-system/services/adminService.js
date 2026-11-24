import { eventStore } from '../../../shared/services/eventStore.js';

export const adminService = {
  /**
   * Compute aggregate live statistics for samVITya admin overview.
   */
  async getOverviewStats() {
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
    return eventStore.getLeaderboard();
  }
};
export default adminService;
