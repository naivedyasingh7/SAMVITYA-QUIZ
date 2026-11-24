import { eventStore } from '../../../shared/services/eventStore.js';
import { mockProviderService } from '../../../../../backend/services/quiz/mockProviderService.js';

export const mockDataService = {
  /**
   * Seed bulk simulated participants.
   */
  async seedMockParticipants(count = 10) {
    const names = [
      'Vikram Aditya', 'Sneha Rao', 'Arjun Kapoor', 'Meera Nair',
      'Rahul Joshi', 'Pooja Iyer', 'Aditya Sen', 'Kavita Menon'
    ];
    const tracks = ['AI & Systems', 'Cybersecurity', 'Web3 & DeFi', 'UI/UX Design', 'Robotics'];

    const created = [];
    for (let i = 0; i < Math.min(count, names.length); i++) {
      const p = eventStore.registerParticipant({
        fullName: names[i],
        email: `${names[i].toLowerCase().replace(/\s+/g, '.')}@vit.ac.in`,
        organization: 'VIT Technical Guild',
        track: tracks[i % tracks.length]
      });
      created.push(p);
    }
    return created;
  },

  /**
   * Generate simulated concurrent quiz submissions.
   */
  async simulateConcurrentQuizSubmissions(count = 5) {
    const participants = eventStore.getParticipants();
    const activities = eventStore.getActivities().filter((a) => a.type === 'quiz');

    if (participants.length === 0 || activities.length === 0) {
      throw new Error('No participants or quiz activities available to simulate.');
    }

    const results = [];
    for (let i = 0; i < count; i++) {
      const part = participants[i % participants.length];
      const act = activities[i % activities.length];
      const score = Math.floor(65 + Math.random() * 35);
      const points = Math.round((score / 100) * act.max_points);

      const tx = eventStore.recordTransaction({
        participant_id: part.id,
        activity_id: act.id,
        points,
        transaction_type: 'quiz_award',
        reason: `Simulated Quiz: ${act.title} (${score}/100)`
      });
      results.push(tx);
    }
    return results;
  },

  /**
   * Reset store to default clean seed.
   */
  resetStore() {
    eventStore.resetToDefaults();
  }
};
export default mockDataService;
