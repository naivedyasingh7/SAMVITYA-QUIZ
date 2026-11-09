import { MockQuizProvider } from './mockProvider.js';

const registry = new Map();

// Register default mock provider
registry.set('mock', new MockQuizProvider());

export const providerRegistry = {
  get(providerName = 'mock') {
    const provider = registry.get(providerName);
    if (!provider) throw new Error(`Quiz provider '${providerName}' is not registered.`);
    return provider;
  },
  register(name, providerInstance) {
    registry.set(name, providerInstance);
  }
};
