import { supabase } from '../../utils/supabaseClient.js';

// In-memory fallback cache when Supabase is running in demo/offline mode
const localAttemptsCache = new Map();

/**
 * Service to manage quiz attempt lifecycle and session tracking.
 * Complies with public.quiz_attempts schema.
 */
export const quizAttemptService = {
  /**
   * Creates a new quiz attempt record in the database.
   * @param {string} participantId - Participant UUID
   * @param {string} activityId - Activity UUID
   * @param {string} [customAttemptId] - Optional predefined attempt ID
   * @returns {Promise<{ id: string, participant_id: string, activity_id: string, status: string, started_at: string }>}
   */
  async createAttempt(participantId, activityId, customAttemptId = null) {
    if (!participantId) throw new Error('participantId is required to start an attempt');
    if (!activityId) throw new Error('activityId is required to start an attempt');

    const attemptId = customAttemptId || `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const attemptRecord = {
      id: attemptId,
      participant_id: participantId,
      activity_id: activityId,
      status: 'in_progress',
      started_at: new Date().toISOString(),
      completed_at: null
    };

    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('quiz_attempts')
          .insert([
            {
              id: attemptRecord.id,
              participant_id: attemptRecord.participant_id,
              activity_id: attemptRecord.activity_id,
              status: attemptRecord.status,
              started_at: attemptRecord.started_at
            }
          ])
          .select()
          .single();

        if (!error && data) {
          localAttemptsCache.set(attemptRecord.id, data);
          return data;
        }
      }
    } catch (err) {
      console.warn('Supabase insert failed, falling back to local memory store:', err.message);
    }

    localAttemptsCache.set(attemptRecord.id, attemptRecord);
    return attemptRecord;
  },

  /**
   * Fetches an attempt by its ID.
   * @param {string} attemptId
   * @returns {Promise<Object|null>}
   */
  async getAttempt(attemptId) {
    if (!attemptId) return null;

    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('id', attemptId)
          .single();

        if (!error && data) return data;
      }
    } catch (err) {
      console.warn('Supabase fetch failed:', err.message);
    }

    return localAttemptsCache.get(attemptId) || null;
  },

  /**
   * Updates the status of an attempt (e.g. 'completed' or 'abandoned').
   * @param {string} attemptId
   * @param {'in_progress'|'completed'|'abandoned'} status
   * @returns {Promise<Object>}
   */
  async updateAttemptStatus(attemptId, status = 'completed') {
    const completedAt = status === 'completed' ? new Date().toISOString() : null;
    const updates = { status, completed_at: completedAt };

    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('quiz_attempts')
          .update(updates)
          .eq('id', attemptId)
          .select()
          .single();

        if (!error && data) {
          localAttemptsCache.set(attemptId, data);
          return data;
        }
      }
    } catch (err) {
      console.warn('Supabase update failed:', err.message);
    }

    const existing = localAttemptsCache.get(attemptId) || { id: attemptId };
    const updated = { ...existing, ...updates };
    localAttemptsCache.set(attemptId, updated);
    return updated;
  },

  /**
   * Retrieves all attempts for a given participant.
   * @param {string} participantId
   * @returns {Promise<Array>}
   */
  async getAttemptsByParticipant(participantId) {
    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('participant_id', participantId)
          .order('started_at', { ascending: false });

        if (!error && data) return data;
      }
    } catch (err) {
      console.warn('Supabase list failed:', err.message);
    }

    return Array.from(localAttemptsCache.values())
      .filter((att) => att.participant_id === participantId)
      .sort((a, b) => new Date(b.started_at) - new Date(a.started_at));
  }
};
