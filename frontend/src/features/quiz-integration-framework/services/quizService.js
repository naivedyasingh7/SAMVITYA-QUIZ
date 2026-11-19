import { validateQuizResult } from '../../../../../shared/validators/quizResult.validator.js';
import { providerRegistry } from '../providers/providerRegistry.js';
import { quizAttemptService } from '../../../../../backend/services/quiz/quizAttemptService.js';
import { supabase } from '../../../../../backend/utils/supabaseClient.js';
import { scoringService } from '../../automatic-scoring/services/scoringService.js';
import { pointsService } from '../../automatic-scoring/services/pointsService.js';

// Local cache for ingested results (used for offline/demo/testing modes)
const localResultsCache = [];

/**
 * Service to manage external result ingestion, validation, normalization,
 * and routing to Divya's Automatic Scoring Engine.
 */
export const quizService = {
  /**
   * Ingests, normalizes, validates, and records an incoming quiz result.
   * Adheres to POST /api/quiz/results API contract.
   * @param {Object} rawPayload - Raw incoming payload from provider simulation or webhook
   * @param {string} [providerName='mock'] - Originating provider
   * @param {Object} [activityConfig] - Optional activity metadata for scoring
   * @returns {Promise<{ success: boolean, data: import('../../../../shared/types/quiz.types.js').NormalizedQuizResult, scoring: any }>}
   */
  async ingestResult(rawPayload, providerName = 'mock', activityConfig = null) {
    if (!rawPayload || typeof rawPayload !== 'object') {
      throw new Error('Payload must be a valid object');
    }

    // 1. Resolve provider and normalize result
    const provider = providerRegistry.get(providerName);
    const normalized = typeof provider.normalizeResult === 'function'
      ? provider.normalizeResult(rawPayload)
      : rawPayload;

    // 2. Validate normalized result against shared validator
    const validation = validateQuizResult(normalized);
    if (!validation.isValid) {
      throw new Error(`Quiz Result Validation Failed: ${validation.errors.join(', ')}`);
    }

    // 3. Mark attempt as completed in database / cache
    if (normalized.attempt_id) {
      await quizAttemptService.updateAttemptStatus(normalized.attempt_id, 'completed');
    }

    // 4. Save result to quiz_results table with idempotency guard
    let savedResult = {
      id: `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...normalized,
      created_at: new Date().toISOString()
    };

    try {
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase
          .from('quiz_results')
          .insert([
            {
              attempt_id: normalized.attempt_id,
              participant_id: normalized.participant_id,
              activity_id: normalized.activity_id,
              provider: normalized.provider,
              external_result_id: normalized.external_result_id,
              raw_score: normalized.raw_score,
              max_score: normalized.max_score,
              completion_status: normalized.completion_status,
              metadata: normalized.metadata || {}
            }
          ])
          .select()
          .single();

        if (error) {
          if (error.code === '23505') { // Postgres unique_violation
            throw new Error(`Duplicate submission detected: ${normalized.external_result_id}`);
          }
          console.warn('Supabase quiz_results insert notice:', error.message);
        } else if (data) {
          savedResult = data;
        }
      }
    } catch (err) {
      if (err.message?.includes('Duplicate submission')) throw err;
      console.warn('Proceeding with cached store for quiz result:', err.message);
    }

    // Deduplication check for local cache
    const duplicate = localResultsCache.find(
      (r) => r.activity_id === normalized.activity_id && r.external_result_id === normalized.external_result_id
    );
    if (duplicate) {
      throw new Error(`A result with external_result_id '${normalized.external_result_id}' has already been ingested.`);
    }

    localResultsCache.unshift(savedResult);

    // 5. Automatic Hand-off to Divya's Scoring Engine
    let scoringResult = null;
    try {
      if (scoringService && typeof scoringService.evaluateQuizScore === 'function') {
        const evaluated = scoringService.evaluateQuizScore(normalized, activityConfig || {
          title: 'Quiz Challenge',
          max_points: 1000
        });

        if (pointsService && typeof pointsService.recordTransaction === 'function') {
          scoringResult = await pointsService.recordTransaction({
            participant_id: normalized.participant_id,
            activity_id: normalized.activity_id,
            points: evaluated.points,
            transaction_type: evaluated.transaction_type || 'quiz_award',
            reason: evaluated.reason || `Quiz Score: ${normalized.raw_score}/${normalized.max_score}`
          });
        }
      }
    } catch (scoringErr) {
      console.warn('Automatic scoring engine notification notice:', scoringErr.message);
    }

    return {
      success: true,
      data: savedResult,
      scoring: scoringResult,
      message: 'Quiz result ingested, validated, and passed to scoring engine',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Retrieves ingestion history.
   * @param {Object} [filter]
   * @param {string} [filter.activityId]
   * @param {string} [filter.participantId]
   * @returns {Promise<Array>}
   */
  async getIngestionHistory(filter = {}) {
    try {
      if (supabase && typeof supabase.from === 'function') {
        let query = supabase
          .from('quiz_results')
          .select('*')
          .order('created_at', { ascending: false });

        if (filter.activityId) query = query.eq('activity_id', filter.activityId);
        if (filter.participantId) query = query.eq('participant_id', filter.participantId);

        const { data, error } = await query;
        if (!error && Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn('Supabase history fetch notice:', err.message);
    }

    let results = [...localResultsCache];
    if (filter.activityId) {
      results = results.filter((r) => r.activity_id === filter.activityId);
    }
    if (filter.participantId) {
      results = results.filter((r) => r.participant_id === filter.participantId);
    }
    return results;
  }
};
