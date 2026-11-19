import { BaseQuizProvider } from './baseProvider.js';

/**
 * Concrete Mock Provider simulating external quiz platforms (e.g. Kahoot, Wayground)
 * without external third-party dependencies.
 */
export class MockQuizProvider extends BaseQuizProvider {
  constructor() {
    super('mock', {
      displayName: 'Mock Simulator Engine',
      description: 'Built-in zero-dependency quiz simulator for instant local testing and automated scoring verification.',
      isEnabled: true
    });
  }

  /**
   * Generates a local simulation launch URL embedded with participant & attempt tokens.
   * @param {string} participantId
   * @param {string} attemptId
   * @param {Object} [config]
   * @returns {Promise<string>}
   */
  async generateLaunchUrl(participantId, attemptId, config = {}) {
    const params = new URLSearchParams({
      pid: participantId || '',
      aid: attemptId || '',
      act: config.activityId || config.activity_id || '',
      provider: this.name,
      ts: Date.now().toString()
    });

    const baseUrl = config.baseUrl || window?.location?.origin || '';
    return `${baseUrl}/quiz-simulation?${params.toString()}`;
  }

  /**
   * Normalizes incoming simulated payload into strict NormalizedQuizResult contract.
   * @param {Object} rawPayload
   * @returns {import('../../../../../shared/types/quiz.types.js').NormalizedQuizResult}
   */
  normalizeResult(rawPayload) {
    if (!rawPayload || typeof rawPayload !== 'object') {
      throw new Error('Raw payload must be an object');
    }

    const timestamp = Date.now();
    const rawScore = Number(rawPayload.raw_score ?? rawPayload.score ?? 0);
    const maxScore = Number(rawPayload.max_score ?? 100);

    return {
      attempt_id: rawPayload.attempt_id || `att-${timestamp}`,
      participant_id: rawPayload.participant_id,
      activity_id: rawPayload.activity_id,
      provider: 'mock',
      external_result_id: rawPayload.external_result_id || `MOCK-${timestamp}-${Math.floor(Math.random() * 10000)}`,
      raw_score: rawScore,
      max_score: maxScore > 0 ? maxScore : 100,
      completion_status: rawPayload.completion_status || 'completed',
      metadata: {
        time_taken_seconds: rawPayload.metadata?.time_taken_seconds || Math.floor(Math.random() * 100 + 20),
        correct_answers: rawPayload.metadata?.correct_answers ?? Math.round((rawScore / (maxScore || 100)) * 20),
        total_questions: rawPayload.metadata?.total_questions ?? 20,
        ingested_at: new Date().toISOString(),
        ...(rawPayload.metadata || {})
      }
    };
  }
}
