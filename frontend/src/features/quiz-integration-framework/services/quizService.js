import { validateQuizResult } from '../../../../shared/validators/quizResult.validator.js';

export const quizService = {
  async submitResult(normalizedResult) {
    const validation = validateQuizResult(normalizedResult);
    if (!validation.isValid) {
      throw new Error(`Invalid result: ${validation.errors.join(', ')}`);
    }
    console.log('Valid quiz result received, routing to scoring engine:', normalizedResult);
    return { success: true };
  }
};
