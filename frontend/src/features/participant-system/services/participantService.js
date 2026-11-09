import { storage } from '../../shared/utils/storage.js';

export const participantService = {
  /**
   * Register new participant or recognize returning participant.
   * @param {import('../../../../shared/types/participant.types.js').ParticipantRegistrationPayload} payload
   */
  async register(payload) {
    // TODO: Connect with Supabase / Edge Function
    console.log('Registering participant:', payload);
    return {
      id: 'mock-uuid',
      participant_code: 'EVT26-P0001',
      full_name: payload.full_name,
      email: payload.email
    };
  },

  /**
   * Retrieve current participant profile by ID.
   * @param {string} participantId
   */
  async getProfile(participantId) {
    console.log('Fetching profile for:', participantId);
    return null;
  }
};
