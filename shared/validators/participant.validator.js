/**
 * Validates participant registration payload.
 * @param {Object} data
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateParticipantRegistration(data) {
  const errors = [];
  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Payload must be an object'] };
  }

  if (!data.full_name || typeof data.full_name !== 'string' || data.full_name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.push('A valid email address is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
