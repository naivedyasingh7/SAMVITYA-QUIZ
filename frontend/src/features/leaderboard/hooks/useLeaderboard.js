import { useState, useEffect, useCallback } from 'react';
import { leaderboardService } from '../services/leaderboardService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { supabase } from '../../../../../backend/utils/supabaseClient.js';

/**
 * Custom React Hook for live leaderboard rankings, lock status, and real-time updates.
 * Adheres to shared/contracts/leaderboard.contract.md:
 * Exported: useLeaderboard() => { entries, isLoading, isLocked, refresh }
 *
 * @param {Object} [options]
 * @param {string} [options.track] - Filter by specific track ('AI & Systems', etc.)
 * @param {number} [options.limit] - Limit number of returned rows
 * @param {number} [options.offset] - Offset for pagination
 * @returns {{ entries: Array, isLocked: boolean, isLoading: boolean, refresh: () => Promise<void> }}
 */
export function useLeaderboard(options = {}) {
  const [entries, setEntries] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const [rankings, locked] = await Promise.all([
        leaderboardService.getRankings(options),
        leaderboardService.isLocked()
      ]);
      setEntries(rankings || []);
      setIsLocked(Boolean(locked));
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [options.track, options.limit, options.offset]);

  useEffect(() => {
    refresh();

    // 1. Subscribe to local reactive event store (instant updates across tabs/portals)
    const unsubStore = eventStore.subscribe(() => {
      refresh();
    });

    // 2. Supabase sync: Realtime WebSocket for admins only; jittered polling for 500+ public viewers
    const isMockMode = import.meta.env.VITE_ENABLE_MOCK_DATA !== 'false';

    let realtimeChannel = null;
    let pollTimer = null;

    if (!isMockMode) {
      if (options.enableRealtime && supabase && typeof supabase.channel === 'function') {
        try {
          realtimeChannel = supabase
            .channel('public:leaderboard_realtime')
            .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'points_transactions' },
              () => refresh()
            )
            .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'winner_declarations' },
              () => refresh()
            )
            .subscribe();
        } catch (err) {
          console.warn('Supabase realtime subscription notice:', err.message);
        }
      } else {
        // Staggered 10-15s polling avoids Supabase Free 200-connection WebSocket limit at 500 users
        const jitterMs = 10000 + Math.floor(Math.random() * 5000);
        pollTimer = setInterval(() => {
          refresh();
        }, jitterMs);
      }
    }

    return () => {
      if (typeof unsubStore === 'function') unsubStore();
      if (pollTimer) clearInterval(pollTimer);
      if (realtimeChannel && typeof realtimeChannel.unsubscribe === 'function') {
        realtimeChannel.unsubscribe();
      }
    };
  }, [refresh, options.enableRealtime]);

  return { entries, isLocked, isLoading, refresh };
}

export default useLeaderboard;
