import { MockQuizProvider } from './mockProvider.js';
import { BaseQuizProvider } from './baseProvider.js';

class NativeQuizProvider extends MockQuizProvider {
  constructor() {
    super();
    this.name = 'native';
    this.displayName = 'Native In-House Quiz Platform';
    this.description = 'Direct internal quiz platform with live admin-authored questions and instant scoring.';
  }

  async generateLaunchUrl(participantId, attemptId, config = {}) {
    const params = new URLSearchParams({
      pid: participantId || '',
      aid: attemptId || '',
      act: config.activityId || config.activity_id || 'act-quiz-tech-trivia',
      provider: 'native'
    });
    const baseUrl = config.baseUrl || (typeof window !== 'undefined' ? window.location?.origin : '') || '';
    return `${baseUrl}/quiz-session?${params.toString()}`;
  }

  normalizeResult(rawPayload) {
    const res = super.normalizeResult(rawPayload);
    res.provider = 'native';
    return res;
  }
}

class ProviderRegistry {
  constructor() {
    this.registry = new Map();
    const defaultMock = new MockQuizProvider();
    const nativeEngine = new NativeQuizProvider();

    this.registry.set('mock', defaultMock);
    this.registry.set('native', nativeEngine);
  }

  /**
   * Retrieves a registered provider by name. Defaults to 'native'.
   * @param {string} [providerName='native']
   * @returns {BaseQuizProvider}
   */
  get(providerName = 'native') {
    const key = (providerName || 'native').toLowerCase();
    const provider = this.registry.get(key);
    if (!provider) {
      throw new Error(`Quiz provider '${providerName}' is not registered. Available: ${Array.from(this.registry.keys()).join(', ')}`);
    }
    return provider;
  }

  register(name, providerInstance) {
    if (!name || typeof name !== 'string') {
      throw new Error('Provider name must be a non-empty string');
    }
    this.registry.set(name.toLowerCase(), providerInstance);
  }

  has(name) {
    return this.registry.has((name || '').toLowerCase());
  }

  list() {
    return Array.from(this.registry.values()).map((p) =>
      typeof p.getProviderInfo === 'function' ? p.getProviderInfo() : { id: p.name, name: p.name, description: '', isEnabled: true }
    );
  }
}

export const providerRegistry = new ProviderRegistry();
export { NativeQuizProvider };
