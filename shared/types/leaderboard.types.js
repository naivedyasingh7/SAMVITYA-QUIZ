/**
 * @typedef {Object} LeaderboardEntry
 * @property {number} rank - Current rank position (1-based)
 * @property {string} participant_id - Database UUID
 * @property {string} participant_code - Display code (e.g., 'EVT26-P0102')
 * @property {string} full_name - Display name
 * @property {string} [organization] - School or team
 * @property {number} total_points - Total verified points
 * @property {number} online_points - Points from online quizzes
 * @property {number} offline_points - Points from offline activities
 * @property {string} last_updated_at - ISO timestamp
 */

/**
 * @typedef {Object} WinnerDeclaration
 * @property {string} id - Declaration UUID
 * @property {string} title - Announcement title
 * @property {Array<LeaderboardEntry>} winners_snapshot - Frozen rank records
 * @property {boolean} is_locked - Whether leaderboard is permanently frozen
 * @property {string} declared_by_admin_id - Admin UUID
 * @property {string} declared_at - ISO timestamp
 */
module.exports = {};
