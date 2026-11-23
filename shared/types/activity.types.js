/**
 * Shared Type Definitions: Activity Module
 *
 * @typedef {Object} Activity
 * @property {string} id - UUID primary key
 * @property {string} title - Activity display name
 * @property {'quiz'|'offline_challenge'|'workshop'|'puzzle'} type
 * @property {number} max_points - Maximum points awardable
 * @property {boolean} is_active - Status flag
 * @property {string} [starts_at] - Scheduled opening timestamp
 * @property {string} [ends_at] - Scheduled closing timestamp
 * @property {string} created_at - Creation timestamp
 */
export default {};
