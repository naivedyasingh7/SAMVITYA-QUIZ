import { validatePointsTransaction } from '../../../../../shared/validators/points.validator.js';
import { eventStore } from '../../../shared/services/eventStore.js';

export const pointsService = {
  /**
   * Records a validated points transaction in the event ledger.
   * @param {Object} transaction
   */
  async recordTransaction(transaction) {
    const validation = validatePointsTransaction(transaction);
    if (!validation.isValid) {
      throw new Error(`Points transaction validation failed: ${validation.errors.join(', ')}`);
    }

    const recorded = eventStore.recordTransaction({
      participant_id: transaction.participant_id,
      activity_id: transaction.activity_id || null,
      points: Number(transaction.points),
      transaction_type: transaction.transaction_type || 'quiz_award',
      reason: transaction.reason || 'Points adjustment',
      admin_id: transaction.admin_id || null
    });

    return {
      success: true,
      transaction: recorded
    };
  },

  /**
   * Fetch transaction ledger with optional filters.
   */
  async getTransactions(filter = {}) {
    return eventStore.getTransactions(filter);
  },

  /**
   * Apply an administrative point correction or deduction with audit reason.
   */
  async manualAdjustment({ participant_id, points, reason, admin_id = 'admin-001' }) {
    if (!reason || reason.trim().length < 5) {
      throw new Error('A detailed audit justification (at least 5 characters) is required for manual adjustments.');
    }

    return this.recordTransaction({
      participant_id,
      points: Number(points),
      transaction_type: 'manual_adjustment',
      reason: `[ADMIN CORRECTION] ${reason.trim()}`,
      admin_id
    });
  }
};
export default pointsService;
