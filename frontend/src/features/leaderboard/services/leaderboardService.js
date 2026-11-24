import { eventStore } from '../../../shared/services/eventStore.js';

export const leaderboardService = {
  /**
   * Retrieve live rankings with complete breakdown.
   */
  async getRankings() {
    return eventStore.getLeaderboard();
  },

  /**
   * Officially lock the leaderboard and declare winners.
   */
  async declareWinners(declarationData = {}) {
    return eventStore.declareWinners({
      title: declarationData.title || 'samVITya 2026 Grand Championship Winners',
      adminId: declarationData.adminId || 'admin-001'
    });
  },

  /**
   * Unlock leaderboard to accept further scores.
   */
  async unlockLeaderboard() {
    return eventStore.unlockLeaderboard();
  },

  /**
   * Check if leaderboard is currently locked.
   */
  async isLocked() {
    return eventStore.isLeaderboardLocked();
  },

  /**
   * Get winner declaration metadata.
   */
  async getWinnerDeclaration() {
    return eventStore.getWinnerDeclaration();
  }
};
export default leaderboardService;
