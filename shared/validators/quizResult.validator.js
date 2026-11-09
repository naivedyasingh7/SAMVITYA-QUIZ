/**
 * Validates a normalized quiz result prior to points calculation.
 * @param {Object} result
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateQuizResult(result) {
  const errors = [];
  if (!result || typeof result !== 'object') {
    return { isValid: false, errors: ['Result payload must be an object'] };
  }

  if (!result.participant_id) errors.push('participant_id is required');
  if (!result.activity_id) errors.push('activity_id is required');
  if (!result.provider) errors.push('provider identifier is required');
  if (!result.external_result_id) errors.push('external_result_id is required for idempotency');

  if (typeof result.raw_score !== 'number' || result.raw_score < 0) {
    errors.push('raw_score must be a non-negative number');
  }
  if (typeof result.max_score !== 'number' || result.max_score <= 0) {
    errors.push('max_score must be a positive number');
  }
  if (result.raw_score > result.max_score) {
    errors.push('raw_score cannot exceed max_score');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
