export const activityService = {
  async listActivities() {
    return [];
  },
  async createActivity(activityData) {
    console.log('Creating activity:', activityData);
    return { id: 'act-uuid', ...activityData };
  }
};
