import { validatePointsTransaction } from '../../../../shared/validators/points.validator.js';

export const pointsService = {
  /**
   * Writes an immutable transaction to the ledger.
   * @param {import('../../../../shared/types/points.types.js').PointsTransaction} tx
   */
  async recordTransaction(tx) {
    const validation = validatePointsTransaction(tx);
    if (!validation.isValid) {
      throw new Error(`Invalid transaction: ${validation.errors.join(', ')}`);
    }

    console.log('Writing transaction to points_transactions:', tx);
    return {
      id: `tx-${Date.now()}`,
      ...tx,
      created_at: new Date().toISOString()
    };
  }
};
