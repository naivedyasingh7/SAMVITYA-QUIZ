import { describe, it, expect } from 'vitest';
import { validateParticipantRegistration } from '../../shared/validators/participant.validator.js';

describe('Participant Validator', () => {
  it('validates a correct participant payload', () => {
    const payload = {
      full_name: 'Jordan Lee',
      email: 'jordan@example.com'
    };
    const res = validateParticipantRegistration(payload);
    expect(res.isValid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  it('rejects missing or invalid email', () => {
    const payload = { full_name: 'Jordan Lee', email: 'not-an-email' };
    const res = validateParticipantRegistration(payload);
    expect(res.isValid).toBe(false);
    expect(res.errors).toContain('A valid email address is required');
  });
});
