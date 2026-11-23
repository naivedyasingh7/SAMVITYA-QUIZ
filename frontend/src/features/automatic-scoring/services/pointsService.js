import { validatePointsTransaction } from '../../../../../shared/validators/points.validator.js';

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

    const recorded = {
      id: `pt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...transaction,
      created_at: new Date().toISOString()
    };

    return {
      success: true,
      transaction: recorded
    };
  }
};
