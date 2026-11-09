/**
 * Validates a point transaction payload.
 * @param {Object} tx
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validatePointsTransaction(tx) {
  const errors = [];
  if (!tx || typeof tx !== 'object') {
    return { isValid: false, errors: ['Transaction payload must be an object'] };
  }

  if (!tx.participant_id) errors.push('participant_id is required');
  if (typeof tx.points !== 'number' || !Number.isInteger(tx.points)) {
    errors.push('points must be an integer');
  }
  if (!tx.transaction_type) errors.push('transaction_type is required');
  if (!tx.reason || tx.reason.trim().length < 3) {
    errors.push('A descriptive reason is required (at least 3 characters)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
