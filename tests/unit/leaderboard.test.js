import { describe, it, expect, beforeEach } from 'vitest';
import { leaderboardService } from '../../frontend/src/features/leaderboard/services/leaderboardService.js';
import { eventStore } from '../../frontend/src/shared/services/eventStore.js';
import { mockProviderService } from '../../backend/services/quiz/mockProviderService.js';

describe('Module 5: Leaderboard & Rankings (Priyanshu)', () => {
  beforeEach(() => {
    // Reset eventStore to clean default seed state before each test
    eventStore.resetToDefaults();
  });

  describe('Leaderboard Sorting & Ranking', () => {
    it('orders entries by total_points descending with sequential 1-based ranks', async () => {
      const rankings = await leaderboardService.getRankings();
      expect(Array.isArray(rankings)).toBe(true);
      expect(rankings.length).toBeGreaterThan(0);

      for (let i = 0; i < rankings.length - 1; i++) {
        expect(rankings[i].total_points).toBeGreaterThanOrEqual(rankings[i + 1].total_points);
        expect(rankings[i].rank).toBe(i + 1);
      }
    });

    it('accurately breaks down total points into quiz_points and offline_points', async () => {
      const rankings = await leaderboardService.getRankings();
      const topCompetitor = rankings[0];

      expect(topCompetitor).toBeDefined();
      expect(typeof topCompetitor.quiz_points).toBe('number');
      expect(typeof topCompetitor.offline_points).toBe('number');
      expect(typeof topCompetitor.manual_adjustments).toBe('number');

      // Cumulative verified points formula: Total = Quiz + Offline + Adjustments
      const calculatedTotal =
        topCompetitor.quiz_points +
        topCompetitor.offline_points +
        topCompetitor.manual_adjustments;
      expect(topCompetitor.total_points).toBe(calculatedTotal);
    });
  });

  describe('Leaderboard Service Operations', () => {
    it('supports track filtering per category', async () => {
      const allRankings = await leaderboardService.getRankings();
      const aiRankings = await leaderboardService.getRankings({ track: 'AI & Systems' });

      expect(Array.isArray(aiRankings)).toBe(true);
      aiRankings.forEach((entry) => {
        expect(entry.track).toBe('AI & Systems');
      });
      expect(aiRankings.length).toBeLessThanOrEqual(allRankings.length);
    });

    it('supports pagination with limit and offset query parameters', async () => {
      const page1 = await leaderboardService.getRankings({ limit: 2, offset: 0 });
      const page2 = await leaderboardService.getRankings({ limit: 2, offset: 2 });

      expect(page1.length).toBeLessThanOrEqual(2);
      expect(page2.length).toBeLessThanOrEqual(2);
      if (page1.length > 0 && page2.length > 0) {
        expect(page1[0].participant_id).not.toBe(page2[0].participant_id);
      }
    });
  });

  describe('Winner Declaration & Leaderboard Locking', () => {
    it('locks leaderboard and freezes top-3 podium', async () => {
      expect(await leaderboardService.isLocked()).toBe(false);

      const declaration = await leaderboardService.declareWinners({
        title: 'samVITya 2026 Grand Championship Finale',
        adminId: 'admin-head-001'
      });

      expect(declaration).toBeDefined();
      expect(declaration.is_locked).toBe(true);
      expect(declaration.winners.length).toBeLessThanOrEqual(3);
      expect(declaration.winners[0].rank).toBe(1);
      expect(await leaderboardService.isLocked()).toBe(true);

      const fetchedDecl = await leaderboardService.getWinnerDeclaration();
      expect(fetchedDecl.title).toBe('samVITya 2026 Grand Championship Finale');
    });

    it('prevents non-adjustment point transactions when locked', async () => {
      await leaderboardService.declareWinners({
        title: 'Freeze Test Ceremony',
        adminId: 'admin-001'
      });

      const participants = eventStore.getParticipants();
      const testParticipant = participants[0];

      // Regular score addition should be rejected
      expect(() => {
        eventStore.recordTransaction({
          participant_id: testParticipant.id,
          points: 100,
          transaction_type: 'quiz_award',
          reason: 'Attempt while frozen'
        });
      }).toThrowError(/locked/i);
    });

    it('allows unlocking leaderboard to resume scoring', async () => {
      await leaderboardService.declareWinners({ title: 'Temporary Lock' });
      expect(await leaderboardService.isLocked()).toBe(true);

      await leaderboardService.unlockLeaderboard();
      expect(await leaderboardService.isLocked()).toBe(false);
      expect(await leaderboardService.getWinnerDeclaration()).toBeNull();
    });
  });

  describe('Real-Time Dynamic Update Integration with Mock Quiz Results', () => {
    it('recalculates ranks and increases score when a mock quiz result is awarded', async () => {
      const initialRankings = await leaderboardService.getRankings();
      const target = initialRankings[initialRankings.length - 1]; // pick lowest ranked participant
      const initialPoints = target.total_points;

      // Simulate a mock quiz result using mockProviderService
      const mockResult = mockProviderService.createMockResult({
        participant_id: target.participant_id,
        activity_id: 'act-quiz-trivia',
        score: 100,
        max_score: 100
      });

      expect(mockResult.raw_score).toBe(100);

      // Award the points via eventStore
      eventStore.recordTransaction({
        participant_id: target.participant_id,
        activity_id: 'act-quiz-trivia',
        points: 500,
        transaction_type: 'quiz_award',
        reason: 'Perfect score on Trivia Challenge'
      });

      // Fetch updated rankings
      const updatedRankings = await leaderboardService.getRankings();
      const updatedTarget = updatedRankings.find((p) => p.participant_id === target.participant_id);

      expect(updatedTarget).toBeDefined();
      expect(updatedTarget.total_points).toBe(initialPoints + 500);
      expect(updatedTarget.quiz_points).toBe(target.quiz_points + 500);
      expect(updatedTarget.rank).toBeLessThanOrEqual(target.rank);
    });
  });
});
