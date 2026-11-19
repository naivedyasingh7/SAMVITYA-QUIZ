export const leaderboardService = {
  async getRankings() {
    return [];
  },
  async declareWinners(declarationData) {
    console.log('Declaring winners:', declarationData);
    return { success: true };
  }
};
