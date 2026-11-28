import React, { useState } from 'react';
import { Trophy, Award, Search, Zap, Target } from 'lucide-react';

export function LeaderboardTable({ entries = [] }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const filtered = entries.filter((entry) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      entry.full_name?.toLowerCase().includes(q) ||
      entry.participant_code?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="space-y-4">
      {/* Search Strip (Track filter removed - empty space preserved) */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search competitor or code..."
            className="w-full glass-input pl-9 pr-3 py-2 text-xs text-white rounded-xl"
          />
        </div>

        <div className="hidden sm:block" aria-hidden="true" />
      </div>

      {/* Table Container */}
      <div className="glass-card border border-white/10 overflow-x-auto shadow-2xl">
        <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
          <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
            <tr>
              <th className="py-3.5 px-3 sm:px-4 w-14 sm:w-16">Rank</th>
              <th className="py-3.5 px-3 sm:px-4">Competitor</th>
              <th className="hidden md:table-cell py-3.5 px-4" aria-label="Empty spacer" />
              <th className="hidden md:table-cell py-3.5 px-4" aria-label="Empty spacer" />
              <th className="py-3.5 px-2.5 sm:px-4 text-right">Quiz</th>
              <th className="py-3.5 px-2.5 sm:px-4 text-right">Offline</th>
              <th className="py-3.5 px-3 sm:px-4 text-right font-bold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-slate-300">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center text-xs text-slate-500 font-mono">
                  No competitors found matching criteria.
                </td>
              </tr>
            ) : (
              paginated.map((entry) => {
                const isTop3 = entry.rank <= 3;
                return (
                  <tr
                    key={entry.participant_id}
                    className={`transition-colors hover:bg-white/[0.03] ${
                      entry.rank === 1
                        ? 'bg-amber-500/[0.04]'
                        : entry.rank === 2
                        ? 'bg-slate-300/[0.02]'
                        : entry.rank === 3
                        ? 'bg-amber-700/[0.02]'
                        : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-sm">
                        {entry.rank === 1 ? (
                          <span className="text-amber-300 font-black flex items-center gap-1">🥇 #1</span>
                        ) : entry.rank === 2 ? (
                          <span className="text-slate-200 font-black flex items-center gap-1">🥈 #2</span>
                        ) : entry.rank === 3 ? (
                          <span className="text-amber-500 font-black flex items-center gap-1">🥉 #3</span>
                        ) : (
                          <span className="text-slate-400">#{entry.rank}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-white block text-sm">{entry.full_name}</span>
                        <span className="text-[10px] font-mono text-purple-300/80">{entry.participant_code}</span>
                      </div>
                    </td>

                    <td className="hidden md:table-cell py-3.5 px-4" />

                    <td className="hidden md:table-cell py-3.5 px-4" />

                    <td className="py-3.5 px-4 text-right font-mono text-indigo-300">
                      {entry.quiz_points || 0}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-emerald-300">
                      {entry.offline_points || 0}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`font-mono font-black text-sm px-2.5 py-1 rounded-lg inline-block ${
                          isTop3
                            ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30'
                            : 'text-white bg-white/[0.04]'
                        }`}
                      >
                        {entry.total_points || 0}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] bg-white/[0.01] text-xs font-mono text-slate-400">
            <span>
              Showing {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)} of {filtered.length} competitors
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-40 text-white"
              >
                Prev
              </button>
              <span className="text-slate-300">
                Page {safePage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-40 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default LeaderboardTable;
