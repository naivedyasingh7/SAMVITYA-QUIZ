export const quizAttemptService = {
  async trackAttempt(participantId, activityId) {
    console.log('Tracking attempt for participant:', participantId, 'activity:', activityId);
    return { id: `att-${Date.now()}`, status: 'in_progress' };
  }
};
