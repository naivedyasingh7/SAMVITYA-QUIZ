import { describe, it, expect, beforeEach } from 'vitest';
import { leaderboardService } from '../../frontend/src/features/leaderboard/services/leaderboardService.js';
import { quizService } from '../../frontend/src/features/quiz-integration-framework/services/quizService.js';
import { mockProviderService } from '../../backend/services/quiz/mockProviderService.js';
import { eventStore } from '../../frontend/src/shared/services/eventStore.js';

describe('Integration Flow: Mock Quiz Result Ingestion -> Automatic Scoring -> Live Leaderboard', () => {
  beforeEach(() => {
    eventStore.resetToDefaults();
  });

  it('completes full pipeline from simulated quiz submission to leaderboard re-ranking', async () => {
    const participants = eventStore.getParticipants();
    expect(participants.length).toBeGreaterThan(0);
    const testCompetitor = participants[0];

    const initialRankings = await leaderboardService.getRankings();
    const initialEntry = initialRankings.find((p) => p.participant_id === testCompetitor.id);
    const startingTotal = initialEntry ? initialEntry.total_points : 0;

    // 1. Generate normalized mock quiz result
    const simulatedResult = mockProviderService.createMockResult({
      participant_id: testCompetitor.id,
      activity_id: 'act-quiz-trivia',
      score: 95,
      max_score: 100,
      metadata: {
        correct_answers: 19,
        total_questions: 20
      }
    });

    expect(simulatedResult.raw_score).toBe(95);
    expect(simulatedResult.provider).toBe('mock');

    // 2. Ingest through quiz service (validates, computes points via scoring engine, records in ledger)
    const ingestionResponse = await quizService.ingestResult(simulatedResult, 'mock', {
      title: 'Online Quiz: Tech & CS Trivia',
      max_points: 1000
    });

    expect(ingestionResponse.success).toBe(true);
    expect(ingestionResponse.scoring).toBeDefined();

    // 3. Query leaderboard to verify reactive score update
    const updatedRankings = await leaderboardService.getRankings();
    const updatedEntry = updatedRankings.find((p) => p.participant_id === testCompetitor.id);

    expect(updatedEntry).toBeDefined();
    expect(updatedEntry.total_points).toBeGreaterThan(startingTotal);
    expect(updatedEntry.quiz_points).toBeGreaterThan(0);

    // 4. Freeze leaderboard as final winner declaration
    const declaration = await leaderboardService.declareWinners({
      title: 'Protocol Zero 2026 Grand Championship Ceremony',
      adminId: 'admin-finalizer'
    });

    expect(declaration.is_locked).toBe(true);
    expect(declaration.winners.length).toBe(3);
    expect(declaration.winners[0].rank).toBe(1);

    // Verify leaderboard is now locked
    expect(await leaderboardService.isLocked()).toBe(true);
  });
});
