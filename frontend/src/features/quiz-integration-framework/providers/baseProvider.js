/**
 * Abstract Base Provider for Quiz Platforms (Kahoot, Wayground, Mock, etc.)
 * Defines the contract that every concrete provider adapter must satisfy.
 */
export class BaseQuizProvider {
  /**
   * @param {string} name - Identifier of the provider (e.g. 'mock', 'kahoot', 'wayground')
   * @param {Object} [metadata] - Optional descriptive information
   */
  constructor(name, metadata = {}) {
    if (this.constructor === BaseQuizProvider) {
      throw new Error("BaseQuizProvider is abstract and cannot be instantiated directly.");
    }
    if (!name || typeof name !== 'string') {
      throw new Error("BaseQuizProvider requires a valid string name identifier.");
    }
    this.name = name;
    this.displayName = metadata.displayName || name.toUpperCase();
    this.description = metadata.description || `Adapter for ${name}`;
    this.isEnabled = metadata.isEnabled ?? true;
  }

  /**
   * Generates participant launch URL with tracking parameters.
   * @param {string} participantId - Database UUID or code of participant
   * @param {string} attemptId - Tracked attempt identifier (att-xxxx)
   * @param {Object} [config] - Provider-specific configurations (e.g., activityId, quizExternalUrl)
   * @returns {Promise<string>}
   */
  async generateLaunchUrl(participantId, attemptId, config = {}) {
    throw new Error(`generateLaunchUrl() must be implemented by subclass ${this.constructor.name}.`);
  }

  /**
   * Normalizes incoming raw provider score into standard NormalizedQuizResult format.
   * @param {Object} rawPayload - Raw incoming payload from webhook or client callback
   * @returns {import('../../../../../shared/types/quiz.types.js').NormalizedQuizResult}
   */
  normalizeResult(rawPayload) {
    throw new Error(`normalizeResult() must be implemented by subclass ${this.constructor.name}.`);
  }

  /**
   * Returns provider information and capabilities.
   * @returns {{ id: string, name: string, description: string, isEnabled: boolean }}
   */
  getProviderInfo() {
    return {
      id: this.name,
      name: this.displayName,
      description: this.description,
      isEnabled: this.isEnabled
    };
  }
}
