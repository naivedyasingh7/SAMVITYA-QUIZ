import { providerRegistry } from '../providers/providerRegistry.js';
import { quizAttemptService } from '../../../../../backend/services/quiz/quizAttemptService.js';

/**
 * Service to orchestrate quiz launching, attempt token generation,
 * and participant tracking parameter injection.
 */
export const launchService = {
  /**
   * Generates a tracked quiz launch session for a participant & activity.
   * Adheres to POST /api/quiz/launch API contract.
   * @param {Object} params
   * @param {string} params.participantId - Database UUID of participant
   * @param {string} params.activityId - Database UUID of activity
   * @param {string} [params.providerName='mock'] - Target provider identifier
   * @param {Object} [params.config={}] - Additional launch options
   * @returns {Promise<{ success: boolean, data: { attempt_id: string, launch_url: string, provider: string } }>}
   */
  async launchQuiz({ participantId, activityId, providerName = 'mock', config = {} }) {
    if (!participantId) {
      throw new Error('participantId is required to launch a quiz');
    }
    if (!activityId) {
      throw new Error('activityId is required to launch a quiz');
    }

    // 1. Resolve registered quiz provider adapter
    const provider = providerRegistry.get(providerName);

    // 2. Create tracked attempt record in the database
    const attempt = await quizAttemptService.createAttempt(participantId, activityId);

    // 3. Generate launch URL with tracking parameters via provider adapter
    const launchUrl = await provider.generateLaunchUrl(participantId, attempt.id, {
      activityId,
      ...config
    });

    return {
      success: true,
      data: {
        attempt_id: attempt.id,
        launch_url: launchUrl,
        provider: provider.name,
        started_at: attempt.started_at,
        status: attempt.status
      },
      message: 'Quiz launch session generated successfully',
      timestamp: new Date().toISOString()
    };
  }
};
