import { providerRegistry } from '../providers/providerRegistry.js';

export const launchService = {
  async launchQuiz(participantId, activityId, providerName = 'mock') {
    const provider = providerRegistry.get(providerName);
    const attemptId = `att-${Date.now()}`;
    const launchUrl = await provider.generateLaunchUrl(participantId, attemptId);
    return { attempt_id: attemptId, launch_url: launchUrl };
  }
};
