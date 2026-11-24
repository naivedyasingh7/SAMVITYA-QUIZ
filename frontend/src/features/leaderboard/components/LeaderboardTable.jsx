import React, { useState } from 'react';
import { Trophy, Award, Search, Zap, Target } from 'lucide-react';

export function LeaderboardTable({ entries = [] }) {
  const [search, setSearch] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');

  const tracks = ['all', 'AI & Systems', 'Cybersecurity', 'Algorithms', 'Web3 & DeFi', 'Robotics', 'UI/UX Design'];

  const filtered = entries.filter((entry) => {
    const matchesSearch =
      entry.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      entry.participant_code?.toLowerCase().includes(search.toLowerCase()) ||
      entry.organization?.toLowerCase().includes(search.toLowerCase());
    const matchesTrack = trackFilter === 'all' || entry.track === trackFilter;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Strip */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search competitor, code, or club..."
            className="w-full glass-input pl-9 pr-3 py-2 text-xs text-white rounded-xl"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-[10px] uppercase font-mono text-slate-400 mr-1 hidden sm:inline">Track:</span>
          {tracks.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrackFilter(t)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                trackFilter === t
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'All Tracks' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-card border border-white/10 overflow-hidden shadow-2xl">
        <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
          <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase text-[10px]">
            <tr>
              <th className="py-3.5 px-4 w-16">Rank</th>
              <th className="py-3.5 px-4">Competitor</th>
              <th className="py-3.5 px-4">Guild / Club</th>
              <th className="py-3.5 px-4">Track</th>
              <th className="py-3.5 px-4 text-right">Quiz Pts</th>
              <th className="py-3.5 px-4 text-right">Offline Pts</th>
              <th className="py-3.5 px-4 text-right font-bold">Total Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center text-xs text-slate-500 font-mono">
                  No competitors found matching criteria.
                </td>
              </tr>
            ) : (
              filtered.map((entry) => {
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

                    <td className="py-3.5 px-4 text-slate-300">
                      {entry.organization || 'VIT Technical Guild'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] border border-white/10 text-slate-300">
                        {entry.track || 'General Tech'}
                      </span>
                    </td>

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
      </div>
    </div>
  );
}
export default LeaderboardTable;
