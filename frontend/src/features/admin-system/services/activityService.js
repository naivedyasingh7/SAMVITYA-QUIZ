import { eventStore } from '../../../shared/services/eventStore.js';

export const activityService = {
  /**
   * List all registered event activities.
   */
  async listActivities() {
    return eventStore.getActivities();
  },

  /**
   * Create a new club activity.
   */
  async createActivity(activityData) {
    return eventStore.createActivity(activityData);
  },

  /**
   * Toggle active/inactive state of an activity.
   */
  async toggleActivity(id) {
    return eventStore.toggleActivity(id);
  }
};
export default activityService;
