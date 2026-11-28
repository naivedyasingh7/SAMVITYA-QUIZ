import { eventStore } from '../../../shared/services/eventStore.js';
import { isLiveSupabaseMode, supabase } from '../../../shared/services/supabaseMode.js';

export const activityService = {
  /**
   * List all registered event activities.
   */
  async listActivities() {
    if (isLiveSupabaseMode()) {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return (data || []).map((a) => ({
        ...a,
        type: a.activity_type === 'online_quiz' ? 'quiz' : 'offline_challenge'
      }));
    }

    return eventStore.getActivities();
  },

  /**
   * Create a new club activity.
   */
  async createActivity(activityData) {
    if (isLiveSupabaseMode()) {
      const activity_type = activityData.type === 'quiz' ? 'online_quiz' : 'offline_game';
      const { data, error } = await supabase
        .from('activities')
        .insert({
          title: activityData.title,
          description: activityData.description || '',
          activity_type,
          max_points: Number(activityData.max_points) || 100,
          is_active: true
        })
        .select()
        .single();
      if (error) throw new Error(error.message);
      return {
        ...data,
        type: data.activity_type === 'online_quiz' ? 'quiz' : 'offline_challenge'
      };
    }

    return eventStore.createActivity(activityData);
  },

  /**
   * Toggle active/inactive state of an activity.
   */
  async toggleActivity(id) {
    if (isLiveSupabaseMode()) {
      const { data: current, error: fetchErr } = await supabase
        .from('activities')
        .select('is_active')
        .eq('id', id)
        .single();
      if (fetchErr) throw new Error(fetchErr.message);

      const { data, error } = await supabase
        .from('activities')
        .update({ is_active: !current.is_active })
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return {
        ...data,
        type: data.activity_type === 'online_quiz' ? 'quiz' : 'offline_challenge'
      };
    }

    return eventStore.toggleActivity(id);
  }
};
export default activityService;
