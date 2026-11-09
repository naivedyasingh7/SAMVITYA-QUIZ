import { BaseQuizProvider } from './baseProvider.js';

/**
 * Mock Provider simulating external quiz platforms without third-party dependencies.
 */
export class MockQuizProvider extends BaseQuizProvider {
  constructor() {
    super('mock');
  }

  async generateLaunchUrl(participantId, attemptId, config = {}) {
    return `/quiz-simulation?pid=${participantId}&aid=${attemptId}`;
  }

  normalizeResult(rawPayload) {
    return {
      attempt_id: rawPayload.attempt_id,
      participant_id: rawPayload.participant_id,
      activity_id: rawPayload.activity_id,
      provider: 'mock',
      external_result_id: rawPayload.external_result_id || `MOCK-${Date.now()}`,
      raw_score: Number(rawPayload.raw_score || 0),
      max_score: Number(rawPayload.max_score || 100),
      completion_status: 'completed',
      metadata: rawPayload.metadata || {}
    };
  }
}
