/**
 * @typedef {Object} Activity
 * @property {string} id - Database UUID
 * @property {string} title - Activity display title
 * @property {string} [description] - Full instructions
 * @property {'online_quiz'|'offline_game'|'bonus'} activity_type - Type classification
 * @property {number} max_points - Maximum point ceiling
 * @property {boolean} is_active - Availability toggle
 * @property {string} [starts_at] - Scheduled opening timestamp
 * @property {string} [ends_at] - Scheduled closing timestamp
 * @property {string} created_at - Creation timestamp
 */
module.exports = {};
