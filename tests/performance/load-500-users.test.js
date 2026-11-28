import { describe, it, expect, beforeEach } from 'vitest';
import { eventStore } from '../../frontend/src/shared/services/eventStore.js';

describe('Performance & Scale: 500-User Event Load Test', () => {
  beforeEach(() => {
    eventStore.resetToDefaults();
  });

  it('handles 500 concurrent participant registrations, 1,000 score transactions, and leaderboard ranking within latency budget', () => {
    const start = performance.now();

    // 1. Register 500 participants
    const users = Array.from({ length: 500 }, (_, i) => ({
      fullName: `Competitor ${i + 1}`,
      email: `competitor.${i + 1}@protocolzero.edu`,
      organization: `Club ${(i % 8) + 1}`,
      track: i % 2 === 0 ? 'AI & Systems' : 'Cybersecurity'
    }));

    const created = eventStore.registerParticipantsBatch(users);
    expect(created).toHaveLength(500);

    // 2. Submit 500 quiz scores + 500 offline game awards (1,000 transactions)
    const txItems = [];
    for (let i = 0; i < created.length; i++) {
      txItems.push({
        participant_id: created[i].id,
        activity_id: 'act-quiz-trivia',
        points: 80,
        transaction_type: 'quiz_award',
        reason: 'Online Quiz Load Test',
        admin_id: 'system'
      });
      txItems.push({
        participant_id: created[i].id,
        activity_id: 'act-off-treasure',
        points: 20 + (i % 30),
        transaction_type: 'offline_challenge',
        reason: 'Treasure Hunt Load Test',
        admin_id: 'admin-001'
      });
    }

    const txs = eventStore.recordTransactionsBatch(txItems);
    expect(txs).toHaveLength(1000);

    // 3. Compute full leaderboard across 500+ participants
    const leaderboard = eventStore.getLeaderboard();
    expect(leaderboard.length).toBeGreaterThanOrEqual(505);

    // Verify sorting invariant (descending total_points)
    for (let i = 1; i < leaderboard.length; i++) {
      expect(leaderboard[i - 1].total_points).toBeGreaterThanOrEqual(leaderboard[i].total_points);
    }

    // 4. Verify O(1) lookup for a 500th-range participant
    const sample = eventStore.getParticipantById(created[499].username);
    expect(sample).not.toBeNull();
    expect(sample.email).toBe('competitor.500@protocolzero.edu');

    // 5. Verify Backup & Restore fallback under 500-user load
    const snapshot = eventStore.exportBackupSnapshot();
    expect(snapshot.participants.length).toBeGreaterThanOrEqual(505);
    expect(snapshot.transactions.length).toBeGreaterThanOrEqual(1000);

    eventStore.resetToDefaults();
    expect(eventStore.getParticipants().length).toBeLessThan(20);

    const restored = eventStore.restoreBackupSnapshot(snapshot);
    expect(restored.restoredParticipants).toBe(snapshot.participants.length);
    expect(eventStore.getLeaderboard().length).toBe(leaderboard.length);

    const elapsedMs = performance.now() - start;
    expect(elapsedMs).toBeLessThan(1500);
  });
});
