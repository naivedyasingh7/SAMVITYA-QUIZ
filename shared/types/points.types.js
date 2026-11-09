/**
 * @typedef {Object} PointsTransaction
 * @property {string} id - Transaction UUID
 * @property {string} participant_id - Recipient participant UUID
 * @property {string} [activity_id] - Source activity UUID (if applicable)
 * @property {string} [quiz_result_id] - Source quiz result UUID (if applicable)
 * @property {number} points - Points awarded (positive) or deducted (negative)
 * @property {'quiz_award'|'offline_award'|'bonus'|'deduction'|'manual_correction'} transaction_type
 * @property {string} reason - Detailed human-readable explanation
 * @property {string} [created_by_admin_id] - Admin UUID if manually authorized
 * @property {string} created_at - ISO 8601 timestamp
 */

/**
 * @typedef {Object} ScoringRule
 * @property {string} id - Rule UUID
 * @property {string} activity_id - Activity UUID
 * @property {'linear_scale'|'percentile'|'fixed_brackets'|'threshold'} calculation_method
 * @property {Record<string, any>} parameters
 */
module.exports = {};
