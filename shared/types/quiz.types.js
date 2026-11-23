/**
 * Shared Type Definitions: Quiz Integration
 *
 * @typedef {Object} QuizAttempt
 * @property {string} id - UUID primary key
 * @property {string} participant_id - UUID
 * @property {string} activity_id - UUID
 * @property {'started'|'in_progress'|'completed'|'abandoned'} status
 * @property {string} started_at - ISO timestamp
 * @property {string} [completed_at] - ISO timestamp
 *
 * @typedef {Object} NormalizedQuizResult
 * @property {string} [attempt_id] - Internal attempt UUID if tracked
 * @property {string} participant_id - Participant UUID
 * @property {string} activity_id - Activity UUID
 * @property {string} provider - Provider key (e.g. 'mock', 'kahoot', 'wayground')
 * @property {string} external_result_id - Provider's result ID for idempotency deduplication
 * @property {number} raw_score - Score returned by external provider
 * @property {number} max_score - Max score possible on that quiz
 * @property {'completed'|'partial'|'disqualified'} completion_status
 * @property {Record<string, any>} [metadata] - Optional additional answers/timing data
 */
export default {};
