export const adminService = {
  async getOverviewStats() {
    return { totalParticipants: 0, totalPointsAwarded: 0, activeActivities: 0 };
  },
  async awardOfflinePoints({ participant_id, activity_id, points, reason }) {
    console.log('Admin awarding points:', { participant_id, activity_id, points, reason });
    return { success: true };
  }
};
