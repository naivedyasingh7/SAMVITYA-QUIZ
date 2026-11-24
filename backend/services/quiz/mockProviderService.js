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
   * Generates simulated questions for the interactive test runner (10 Easy Questions).
   */
  getSampleQuiz() {
    return [
      {
        id: 'q1',
        prompt: 'What does HTML stand for in web development?',
        options: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Logic', 'Home Tool Management Layout'],
        correctIndex: 0
      },
      {
        id: 'q2',
        prompt: 'Which of the following data types in Python is immutable (cannot be modified after creation)?',
        options: ['List', 'Tuple', 'Dictionary', 'Set'],
        correctIndex: 1
      },
      {
        id: 'q3',
        prompt: 'Which Git command records staged snapshots into the project commit history?',
        options: ['git push', 'git stage', 'git commit', 'git pull'],
        correctIndex: 2
      },
      {
        id: 'q4',
        prompt: 'What standard HTTP status code signifies that a web request succeeded?',
        options: ['200 OK', '404 Not Found', '500 Server Error', '403 Forbidden'],
        correctIndex: 0
      },
      {
        id: 'q5',
        prompt: 'Which fundamental data structure follows the First-In, First-Out (FIFO) principle?',
        options: ['Stack', 'Queue', 'Binary Search Tree', 'Graph'],
        correctIndex: 1
      },
      {
        id: 'q6',
        prompt: 'In JavaScript, which keyword is used to declare a variable whose value can be reassigned?',
        options: ['const', 'let', 'fixed', 'immutable'],
        correctIndex: 1
      },
      {
        id: 'q7',
        prompt: 'Which SQL clause is used to filter records and return only rows that satisfy a condition?',
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctIndex: 2
      },
      {
        id: 'q8',
        prompt: 'Which protocol secures web traffic between a browser and a web server using encryption?',
        options: ['HTTP', 'FTP', 'HTTPS', 'Telnet'],
        correctIndex: 2
      },
      {
        id: 'q9',
        prompt: 'What does RAM stand for in computer hardware?',
        options: ['Random Access Memory', 'Readily Actionable Module', 'Rapid Array Memory', 'Read And Modify'],
        correctIndex: 0
      },
      {
        id: 'q10',
        prompt: 'What is the time complexity of accessing an element in an array by its index?',
        options: ['O(1) - Constant Time', 'O(n) - Linear Time', 'O(log n) - Logarithmic Time', 'O(n^2) - Quadratic Time'],
        correctIndex: 0
      }
    ];
  }
};
