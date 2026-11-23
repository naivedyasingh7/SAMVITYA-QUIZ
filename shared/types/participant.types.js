/**
 * Shared Type Definitions: Participant Module
 *
 * @typedef {Object} Participant
 * @property {string} id - UUID primary key
 * @property {string} full_name - Participant full name
 * @property {string} email - Unique email address
 * @property {string} participant_code - Formatted code e.g. EVT26-P0102
 * @property {string} qr_code_data - Payload embedded inside QR code
 * @property {string} [phone]
 * @property {string} [organization]
 * @property {string} created_at - Registration ISO timestamp
 *
 * @typedef {Object} CreateParticipantInput
 * @property {string} full_name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [organization]
 */
export default {};
