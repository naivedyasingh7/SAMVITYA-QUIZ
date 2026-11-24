import { eventStore } from '../../../shared/services/eventStore.js';

export const leaderboardService = {
  /**
   * Retrieve live rankings with complete breakdown.
   * Supports optional track filtering and pagination per API_CONTRACTS.md (GET /api/leaderboard?limit=50&offset=0).
   *
   * @param {Object} [options]
   * @param {string} [options.track] - Optional track filter
   * @param {number} [options.limit] - Max entries to return
   * @param {number} [options.offset] - Pagination offset
   * @returns {Promise<Array>}
   */
  async getRankings(options = {}) {
    const list = eventStore.getLeaderboard();
    let result = [...list];

    // Optional track filtering
    if (options.track && options.track !== 'all') {
      result = result.filter((item) => item.track === options.track);
    }

    // Optional limit & offset pagination
    if (options.offset !== undefined || options.limit !== undefined) {
      const offset = Number(options.offset) || 0;
      const limit = options.limit !== undefined ? Number(options.limit) : result.length;
      result = result.slice(offset, offset + limit);
    }

    return result;
  },

  /**
   * Officially lock the leaderboard and declare winners.
   * Freezes podium and sets is_locked = true.
   *
   * @param {Object} [declarationData]
   * @param {string} [declarationData.title]
   * @param {string} [declarationData.adminId]
   * @returns {Promise<Object>}
   */
  async declareWinners(declarationData = {}) {
    return eventStore.declareWinners({
      title: declarationData.title || 'samVITya 2026 Grand Championship Winners',
      adminId: declarationData.adminId || 'admin-001'
    });
  },

  /**
   * Unlock leaderboard to accept further scores.
   * @returns {Promise<{ success: boolean }>}
   */
  async unlockLeaderboard() {
    return eventStore.unlockLeaderboard();
  },

  /**
   * Check if leaderboard is currently locked.
   * @returns {Promise<boolean>}
   */
  async isLocked() {
    return eventStore.isLeaderboardLocked();
  },

  /**
   * Get winner declaration metadata.
   * @returns {Promise<Object|null>}
   */
  async getWinnerDeclaration() {
    return eventStore.getWinnerDeclaration();
  }
};

export default leaderboardService;
