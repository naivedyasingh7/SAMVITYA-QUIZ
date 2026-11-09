export const mockProviderService = {
  createMockResult({ participant_id, activity_id, score = 85, max_score = 100 }) {
    return {
      attempt_id: `att-${Date.now()}`,
      participant_id,
      activity_id,
      provider: 'mock',
      external_result_id: `SIM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      raw_score: score,
      max_score: max_score,
      completion_status: 'completed',
      metadata: { simulated_at: new Date().toISOString() }
    };
  }
};
