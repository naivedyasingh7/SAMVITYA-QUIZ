import { describe, it, expect } from 'vitest';
import { validateQuizResult } from '../../shared/validators/quizResult.validator.js';
import { BaseQuizProvider } from '../../frontend/src/features/quiz-integration-framework/providers/baseProvider.js';
import { MockQuizProvider } from '../../frontend/src/features/quiz-integration-framework/providers/mockProvider.js';
import { providerRegistry } from '../../frontend/src/features/quiz-integration-framework/providers/providerRegistry.js';
import { quizService } from '../../frontend/src/features/quiz-integration-framework/services/quizService.js';
import { mockProviderService } from '../../backend/services/quiz/mockProviderService.js';

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
    expect(valid.errors.length).toBe(0);
  });

  it('rejects invalid quiz result payloads with clear errors', () => {
    const invalidResult = {
      attempt_id: 'att-123',
      participant_id: '',
      activity_id: 'act-123',
      raw_score: 150,
      max_score: 100
    };
    const valid = validateQuizResult(invalidResult);
    expect(valid.isValid).toBe(false);
    expect(valid.errors).toContain('participant_id is required');
    expect(valid.errors).toContain('raw_score cannot exceed max_score');
  });

  it('enforces BaseQuizProvider abstract contract', () => {
    expect(() => new BaseQuizProvider('test')).toThrowError('BaseQuizProvider is abstract');
  });

  it('MockQuizProvider generates proper launch URL with tracking parameters', async () => {
    const mock = new MockQuizProvider();
    const url = await mock.generateLaunchUrl('user-123', 'att-999', { activityId: 'act-456' });
    expect(url).toContain('pid=user-123');
    expect(url).toContain('aid=att-999');
    expect(url).toContain('act=act-456');
    expect(url).toContain('provider=mock');
  });

  it('MockQuizProvider normalizes raw payloads to match NormalizedQuizResult', () => {
    const mock = new MockQuizProvider();
    const raw = {
      participant_id: 'p-001',
      activity_id: 'a-001',
      score: 85,
      max_score: 100,
      metadata: { correct_answers: 17 }
    };
    const normalized = mock.normalizeResult(raw);
    expect(normalized.provider).toBe('mock');
    expect(normalized.raw_score).toBe(85);
    expect(normalized.max_score).toBe(100);
    expect(normalized.external_result_id).toBeDefined();
    expect(normalized.completion_status).toBe('completed');
  });

  it('providerRegistry resolves registered providers and throws for unknown ones', () => {
    const provider = providerRegistry.get('mock');
    expect(provider).toBeInstanceOf(MockQuizProvider);
    expect(() => providerRegistry.get('nonexistent-engine')).toThrowError('not registered');
  });

  it('ingests result successfully and enforces deduplication idempotency', async () => {
    const testResult = mockProviderService.createMockResult({
      participant_id: 'part-dedup-test',
      activity_id: 'act-dedup-test',
      score: 95,
      max_score: 100
    });

    // First ingestion should succeed
    const firstAttempt = await quizService.ingestResult(testResult, 'mock');
    expect(firstAttempt.success).toBe(true);
    expect(firstAttempt.data.raw_score).toBe(95);

    // Duplicate ingestion with identical external_result_id must fail
    await expect(quizService.ingestResult(testResult, 'mock')).rejects.toThrowError(
      /already been ingested|Duplicate submission/
    );
  });
});
