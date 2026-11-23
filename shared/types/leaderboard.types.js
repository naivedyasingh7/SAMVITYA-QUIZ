/**
 * Shared Type Definitions: Leaderboard Module
 *
 * @typedef {Object} LeaderboardEntry
 * @property {string} participant_id - UUID
 * @property {string} full_name - Participant name
 * @property {string} participant_code - e.g. EVT26-P0102
 * @property {number} total_points - Cumulative earned points
 * @property {number} quiz_points - Breakdown: quiz points
 * @property {number} offline_points - Breakdown: offline challenge points
 * @property {number} manual_adjustments - Breakdown: adjustment points
 * @property {number} rank - Current ranking (1-based)
 * @property {string} last_updated - ISO timestamp of latest score change
 *
 * @typedef {Object} WinnerDeclaration
 * @property {string} id - UUID
 * @property {string} title - Ceremony or final event title
 * @property {Array<{rank: number, participant_id: string, full_name: string, total_points: number}>} winners
 * @property {boolean} is_locked - Whether scores can still change
 * @property {string} declared_by_admin_id - Admin UUID
 * @property {string} declared_at - ISO timestamp
 */
export default {};
