import { useState, useEffect } from 'react';

export function useLeaderboard() {
  const [entries, setEntries] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Subscribe to Supabase Realtime channel for points_transactions

  return { entries, isLocked, isLoading };
}
