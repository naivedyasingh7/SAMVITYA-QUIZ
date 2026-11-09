/**
 * @typedef {Object} Participant
 * @property {string} id - Database UUID
 * @property {string} participant_code - Human readable code (e.g., 'EVT26-P0102')
 * @property {string} full_name - Participant's full legal/preferred name
 * @property {string} email - Verified email address
 * @property {string} [phone] - Optional phone number
 * @property {string} [organization] - School, company, or team name
 * @property {string} [avatar_url] - URL to profile avatar
 * @property {'active'|'disqualified'|'withdrawn'} status - Current status
 * @property {string} created_at - ISO 8601 timestamp
 */

/**
 * @typedef {Object} ParticipantRegistrationPayload
 * @property {string} full_name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [organization]
 */
module.exports = {};
