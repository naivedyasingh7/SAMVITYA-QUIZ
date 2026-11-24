import React, { useState } from 'react';
import { History, Search, ArrowDownRight, ArrowUpRight, ShieldAlert } from 'lucide-react';

export function TransactionHistory({ transactions = [] }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = transactions.filter((tx) => {
    const matchesType = filterType === 'all' || tx.transaction_type === filterType;
    const matchesSearch =
      tx.reason?.toLowerCase().includes(search.toLowerCase()) ||
      tx.participant_id?.toLowerCase().includes(search.toLowerCase()) ||
      tx.id?.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="glass-card border border-white/10 p-5 space-y-4 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div>
          <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
            Global Points Ledger Audit Log ({transactions.length} Records)
          </h3>
          <p className="text-[11px] text-slate-400">
            Immutable blockchain-style transaction stream. All adjustments are cryptographically signed and permanent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, reason, participant..."
            className="glass-input px-3 py-1.5 text-xs text-white rounded-lg w-52"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
          <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Tx ID</th>
              <th className="py-2.5 px-3">Participant ID</th>
              <th className="py-2.5 px-3">Reason / Activity</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Points Delta</th>
              <th className="py-2.5 px-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-xs text-slate-500">
                  No transactions found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((tx) => {
                const isPositive = (tx.points || 0) >= 0;
                return (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-medium text-purple-300">
                      {tx.id}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 max-w-[130px] truncate" title={tx.participant_id}>
                      {tx.participant_id}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-white max-w-xs">
                      {tx.reason}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.04] border border-white/10 text-slate-300">
                        {tx.transaction_type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`font-mono font-black text-xs px-2 py-0.5 rounded inline-flex items-center gap-0.5 ${
                          isPositive
                            ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                            : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {tx.points} pts
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[10px] text-slate-500">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TransactionHistory;
