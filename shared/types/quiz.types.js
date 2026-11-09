/**
 * @typedef {Object} QuizAttempt
 * @property {string} id - Attempt UUID
 * @property {string} participant_id - Linked participant UUID
 * @property {string} activity_id - Associated activity UUID
 * @property {'in_progress'|'completed'|'abandoned'} status - State of attempt
 * @property {string} started_at - ISO timestamp
 * @property {string} [completed_at] - ISO timestamp
 */

/**
 * @typedef {Object} NormalizedQuizResult
 * @property {string} attempt_id - Linked attempt UUID
 * @property {string} participant_id - Database UUID of participant
 * @property {string} activity_id - Database UUID of activity
 * @property {string} provider - Provider identifier ('mock', 'kahoot', etc.)
 * @property {string} external_result_id - Platform unique result ID (idempotency key)
 * @property {number} raw_score - Raw score from platform
 * @property {number} max_score - Max possible raw score
 * @property {'completed'|'partial'|'disqualified'} completion_status
 * @property {Record<string, any>} [metadata] - Optional additional answers/timing data
 */
module.exports = {};
