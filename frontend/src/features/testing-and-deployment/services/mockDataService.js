export const mockDataService = {
  generateParticipants(count = 5) {
    return Array.from({ length: count }, (_, i) => ({
      id: `mock-user-${i + 1}`,
      participant_code: `EVT26-P${String(i + 1).padStart(4, '0')}`,
      full_name: `Test Participant ${i + 1}`,
      email: `test${i + 1}@example.com`
    }));
  }
};
