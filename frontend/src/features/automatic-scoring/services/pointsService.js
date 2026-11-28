import { validatePointsTransaction } from '../../../../../shared/validators/points.validator.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { isLiveSupabaseMode, supabase } from '../../../shared/services/supabaseMode.js';

function mapTransactionTypeToSql(type) {
  if (type === 'quiz_award') return 'quiz_award';
  if (type === 'offline_challenge' || type === 'offline_award') return 'offline_award';
  if (type === 'manual_adjustment' || type === 'manual_correction') return 'manual_correction';
  if (type === 'deduction') return 'deduction';
  return 'offline_award';
}

export const pointsService = {
  /**
   * Records a validated points transaction in the event ledger.
   * @param {Object} transaction
   */
  async recordTransaction(transaction) {
    const validation = validatePointsTransaction(transaction);
    if (!validation.isValid) {
      throw new Error(`Points transaction validation failed: ${validation.errors.join(', ')}`);
    }

    if (isLiveSupabaseMode()) {
      const { data: authData } = await supabase.auth.getUser();
      const sqlType = mapTransactionTypeToSql(transaction.transaction_type);

      const { data, error } = await supabase
        .from('points_transactions')
        .insert({
          participant_id: transaction.participant_id,
          activity_id: transaction.activity_id || null,
          points: Number(transaction.points),
          transaction_type: sqlType,
          reason: transaction.reason || 'Points adjustment',
          created_by_admin_id: authData?.user?.id || null
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return {
        success: true,
        transaction: data
      };
    }

    const recorded = eventStore.recordTransaction({
      participant_id: transaction.participant_id,
      activity_id: transaction.activity_id || null,
      points: Number(transaction.points),
      transaction_type: transaction.transaction_type || 'quiz_award',
      reason: transaction.reason || 'Points adjustment',
      admin_id: transaction.admin_id || null
    });

    return {
      success: true,
      transaction: recorded
    };
  },

  /**
   * Fetch transaction ledger with optional filters.
   */
  async getTransactions(filter = {}) {
    if (isLiveSupabaseMode()) {
      let query = supabase
        .from('points_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (filter.participantId) {
        query = query.eq('participant_id', filter.participantId);
      }
      if (filter.activityId) {
        query = query.eq('activity_id', filter.activityId);
      }
      if (filter.type) {
        query = query.eq('transaction_type', mapTransactionTypeToSql(filter.type));
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    }

    return eventStore.getTransactions(filter);
  },

  /**
   * Apply an administrative point correction or deduction with audit reason.
   */
  async manualAdjustment({ participant_id, points, reason, admin_id = 'admin-001' }) {
    if (!reason || reason.trim().length < 5) {
      throw new Error('A detailed audit justification (at least 5 characters) is required for manual adjustments.');
    }

    return this.recordTransaction({
      participant_id,
      points: Number(points),
      transaction_type: 'manual_adjustment',
      reason: `[ADMIN CORRECTION] ${reason.trim()}`,
      admin_id
    });
  }
};
export default pointsService;
