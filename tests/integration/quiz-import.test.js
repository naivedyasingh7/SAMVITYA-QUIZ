import { describe, it, expect } from 'vitest';
import { validateQuizResult } from '../../shared/validators/quizResult.validator.js';

describe('Integration: Quiz Ingestion & Deduplication Guard', () => {
  it('validates normalized quiz result payload', () => {
    const result = {
      attempt_id: 'att-123',
      participant_id: 'part-123',
      activity_id: 'act-123',
      provider: 'mock',
      external_result_id: 'EXT-999',
      raw_score: 90,
      max_score: 100,
      completion_status: 'completed'
    };
    const valid = validateQuizResult(result);
    expect(valid.isValid).toBe(true);
  });
});
