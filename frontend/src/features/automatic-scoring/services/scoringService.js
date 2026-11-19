import { calculatePoints } from '../utils/calculatePoints.js';

export const scoringService = {
  evaluateQuizScore(normalizedResult, activityConfig) {
    const points = calculatePoints(
      normalizedResult.raw_score,
      normalizedResult.max_score,
      activityConfig?.max_points || 1000
    );

    return {
      points,
      reason: `Completed ${activityConfig?.title || 'Quiz'} (${normalizedResult.raw_score}/${normalizedResult.max_score})`,
      transaction_type: 'quiz_award'
    };
  }
};
