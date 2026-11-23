/**
 * Shared Type Definitions: Points & Transactions
 *
 * @typedef {Object} PointsTransaction
 * @property {string} id - UUID primary key
 * @property {string} participant_id - Foreign key to participants.id
 * @property {string} [activity_id] - Optional foreign key to activities.id
 * @property {number} points - Signed integer (positive award or negative deduction)
 * @property {'quiz_award'|'offline_challenge'|'manual_adjustment'|'penalty'} transaction_type
 * @property {string} [reason] - Context or audit explanation
 * @property {string} [admin_id] - UUID of admin who authorized manual adjustment
 * @property {string} created_at - ISO timestamp
 *
 * @typedef {Object} ScoringRule
 * @property {string} id - UUID
 * @property {string} activity_id - Associated activity
 * @property {'linear_scale'|'percentile'|'fixed_brackets'|'threshold'} calculation_method
 * @property {Record<string, any>} parameters
 */
export default {};
