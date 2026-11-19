/**
 * Mock Provider Service
 * Simulates external quiz platforms (Kahoot, Wayground, Quizizz) for testing
 * and validation without needing real third-party API credentials.
 */
export const mockProviderService = {
  /**
   * Generates a normalized mock quiz completion result.
   * @param {Object} options
   * @param {string} options.participant_id
   * @param {string} options.activity_id
   * @param {string} [options.attempt_id]
   * @param {number} [options.score]
   * @param {number} [options.max_score]
   * @param {Object} [options.metadata]
   * @returns {import('../../../shared/types/quiz.types.js').NormalizedQuizResult}
   */
  createMockResult({
    participant_id,
    activity_id,
    attempt_id = null,
    score = 85,
    max_score = 100,
    metadata = {}
  }) {
    if (!participant_id) throw new Error('participant_id is required');
    if (!activity_id) throw new Error('activity_id is required');

    const rawScore = Number(score);
    const maxPossibleScore = Number(max_score);
    const timestamp = Date.now();
    const generatedAttemptId = attempt_id || `att-${timestamp}-${Math.random().toString(36).substring(2, 6)}`;
    const externalResultId = `MOCK-RES-${timestamp}-${Math.floor(Math.random() * 10000)}`;

    return {
      attempt_id: generatedAttemptId,
      participant_id,
      activity_id,
      provider: 'mock',
      external_result_id: externalResultId,
      raw_score: rawScore,
      max_score: maxPossibleScore,
      completion_status: 'completed',
      metadata: {
        time_taken_seconds: metadata.time_taken_seconds || Math.floor(Math.random() * 90 + 30),
        correct_answers: metadata.correct_answers || Math.round((rawScore / maxPossibleScore) * 20),
        total_questions: metadata.total_questions || 20,
        platform: 'Mock Quiz Simulator v1.0',
        simulated_at: new Date().toISOString(),
        ...metadata
      }
    };
  },

  /**
   * Generates simulated questions for the interactive test runner.
   */
  getSampleQuiz() {
    return [
      {
        id: 'q1',
        prompt: 'Which data structure is primarily used to implement LRU cache?',
        options: ['Queue + Stack', 'Doubly Linked List + Hash Map', 'Binary Search Tree', 'Min Heap'],
        correctIndex: 1
      },
      {
        id: 'q2',
        prompt: 'In PostgreSQL, which constraint guarantees idempotency of result submissions?',
        options: ['CHECK constraint', 'UNIQUE constraint on (activity_id, external_result_id)', 'FOREIGN KEY with CASCADE', 'DEFAULT gen_random_uuid()'],
        correctIndex: 1
      },
      {
        id: 'q3',
        prompt: 'What pattern allows swapping external quiz platforms without altering the core codebase?',
        options: ['Observer Pattern', 'Adapter / Registry Pattern', 'Singleton Pattern', 'Decorator Pattern'],
        correctIndex: 1
      }
    ];
  }
};
