import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth.js';
import { participantService } from '../services/participantService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { History, Award, Calendar, Filter, ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyHistoryPage() {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const activeId = currentUser?.id || 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81';

  const loadHistory = async () => {
    const list = await participantService.getMyHistory(activeId);
    setHistory(list);
  };

  useEffect(() => {
    loadHistory();
    const unsub = eventStore.subscribe(() => loadHistory());
    return unsub;
  }, [activeId]);

  const filtered = history.filter((item) => {
    const matchesType = filterType === 'all' || item.transaction_type === filterType;
    const matchesSearch = item.reason?.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalEarned = history.reduce((sum, h) => sum + (h.points || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-4 h-4 text-purple-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 font-semibold">
              Audit Ledger
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight font-space">
            My Points & Score History
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable log of all points awarded, quiz attempts, and verified challenge completions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 border-white/10 text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Cumulative Points</span>
            <span className="text-xl font-black font-space text-purple-300">
              +{totalEarned} pts
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/10 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'all' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({history.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('quiz_award')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'quiz_award' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Quizzes
          </button>
          <button
            type="button"
            onClick={() => setFilterType('offline_challenge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'offline_challenge' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Offline Labs
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by description..."
          className="glass-input px-3.5 py-2 text-xs text-white rounded-xl w-full sm:w-64"
        />
      </div>

      {/* Ledger Table */}
      <div className="glass-card border border-white/10 overflow-hidden shadow-2xl">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No point entries recorded yet. Complete an event quiz or check in at a challenge booth!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Activity Reason</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Points</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-purple-300">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-white max-w-sm">
                      {item.reason}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.04] border border-white/10 text-slate-300">
                        {item.transaction_type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-black text-emerald-400 text-sm">
                        +{item.points}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
