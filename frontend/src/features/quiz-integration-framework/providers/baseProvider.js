/**
 * Abstract Base Provider for Quiz Platforms (Kahoot, Wayground, Mock, etc.)
 */
export class BaseQuizProvider {
  constructor(name) {
    if (this.constructor === BaseQuizProvider) {
      throw new Error("BaseQuizProvider is abstract and cannot be instantiated directly.");
    }
    this.name = name;
  }

  /**
   * Generates participant launch URL with tracking parameters.
   * @param {string} participantId
   * @param {string} attemptId
   * @param {Object} [config]
   * @returns {Promise<string>}
   */
  async generateLaunchUrl(participantId, attemptId, config = {}) {
    throw new Error("generateLaunchUrl() must be implemented by subclass.");
  }

  /**
   * Normalizes incoming raw provider score into standard NormalizedQuizResult format.
   * @param {Object} rawPayload
   * @returns {import('../../../../shared/types/quiz.types.js').NormalizedQuizResult}
   */
  normalizeResult(rawPayload) {
    throw new Error("normalizeResult() must be implemented by subclass.");
  }
}
