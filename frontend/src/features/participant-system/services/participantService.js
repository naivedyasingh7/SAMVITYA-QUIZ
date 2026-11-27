import { eventStore } from '../../../shared/services/eventStore.js';

export const participantService = {
  /**
   * Register new participant or recognize returning participant.
   */
  async register({ full_name, email, organization = '', track = 'General Tech' }) {
    const participant = eventStore.registerParticipant({
      fullName: full_name,
      email,
      organization,
      track
    });
    return participant;
  },

  /**
   * Retrieve participant profile with their live points and rank.
   */
  async getProfile(participantId) {
    const participant = eventStore.getParticipantById(participantId);
    if (!participant) return null;

    const leaderboard = eventStore.getLeaderboard();
    const rankEntry = leaderboard.find((item) => item.participant_id === participant.id);

    return {
      ...participant,
      total_points: rankEntry?.total_points || 0,
      quiz_points: rankEntry?.quiz_points || 0,
      offline_points: rankEntry?.offline_points || 0,
      rank: rankEntry?.rank || '-'
    };
  },

  /**
   * Retrieve personal point ledger history for a participant.
   */
  async getMyHistory(participantId) {
    return eventStore.getTransactions({ participantId });
  },

  /**
   * Contract-aligned aliases (see shared/contracts/participant.contract.md).
   */
  async registerParticipant(data) {
    return this.register({
      full_name: data.full_name || data.fullName,
      email: data.email,
      organization: data.organization,
      track: data.track
    });
  },

  async getParticipantByCode(code) {
    if (!code) return null;
    return eventStore.getParticipantById(code);
  },

  async getParticipantProfile(id) {
    return this.getProfile(id);
  }
};
export default participantService;
