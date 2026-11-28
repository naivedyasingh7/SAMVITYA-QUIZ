import React, { useState } from 'react';
import { Trophy, Crown, Medal, Search, Flame, Zap, ShieldCheck } from 'lucide-react';

export function LeaderboardSection({ onOpenSimulator }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Initial deterministic mock data matching the database schema
  const initialEntries = [
    { rank: 1, participant_id: 'p-01', participant_code: 'EVT26-P0102', full_name: 'Alex Mercer', organization: 'School of CSE', total_points: 3450, online_points: 2200, offline_points: 1250, badge: 'Gold 👑' },
    { rank: 2, participant_id: 'p-02', participant_code: 'EVT26-P0884', full_name: 'Sophia Rao', organization: 'Robotics Club', total_points: 3100, online_points: 2000, offline_points: 1100, badge: 'Silver 🥈' },
    { rank: 3, participant_id: 'p-03', participant_code: 'EVT26-P0219', full_name: 'Karan Mehra', organization: 'CyberSec Wing', total_points: 2950, online_points: 2150, offline_points: 800, badge: 'Bronze 🥉' },
    { rank: 4, participant_id: 'p-04', participant_code: 'EVT26-P0512', full_name: 'Ananya Sharma', organization: 'AI/ML Guild', total_points: 2700, online_points: 1800, offline_points: 900, badge: 'Top 5' },
    { rank: 5, participant_id: 'p-05', participant_code: 'EVT26-P0741', full_name: 'Rohan Verma', organization: 'ACM Chapter', total_points: 2550, online_points: 1950, offline_points: 600, badge: 'Top 5' },
    { rank: 6, participant_id: 'p-06', participant_code: 'EVT26-P0330', full_name: 'Divyesh Patel', organization: 'School of CSE', total_points: 2400, online_points: 1600, offline_points: 800, badge: 'Contender' },
    { rank: 7, participant_id: 'p-07', participant_code: 'EVT26-P0911', full_name: 'Sneha Reddy', organization: 'Web3 Syndicate', total_points: 2250, online_points: 1750, offline_points: 500, badge: 'Contender' }
  ];

  const filtered = initialEntries.filter(
    (e) =>
      e.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.participant_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="leaderboard" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#050508] overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-[11px] uppercase tracking-[0.25em] mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> PERSON 5 • Priyansh MODULE
          </div>
          <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            LIVE EVENT <span className="text-gradient">LEADERBOARD</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            Realtime cumulative points calculated exclusively from verified transactions. Streamed with zero delay via Supabase Realtime WebSocket channels.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mt-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Sync Active • Instant Update on Points Award</span>
          </div>
        </div>

        {/* Top 3 Podium (HackX Signature Podium Design) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-6 mb-14 max-w-3xl mx-auto">
          
          {/* 2nd Place: Silver */}
          <div className="w-full sm:w-1/3 flex flex-col items-center order-2 sm:order-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800/80 border border-slate-600/50 p-2 shadow-xl flex items-center justify-center mb-3 relative group">
              <span className="font-sans font-black text-2xl text-slate-300">#2</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-400 text-slate-900 font-black text-xs flex items-center justify-center shadow">
                2
              </div>
            </div>
            <h4 className="font-sans font-bold text-white text-base sm:text-lg text-center truncate max-w-[200px]">
              {initialEntries[1].full_name}
            </h4>
            <span className="font-mono text-xs text-slate-400">{initialEntries[1].participant_code}</span>
            <div className="w-full mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-center">
              <span className="font-mono text-xl font-black text-slate-200">{initialEntries[1].total_points}</span>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Confirmed Points</span>
            </div>
          </div>

          {/* 1st Place: Gold (Crown) */}
          <div className="w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2 -translate-y-2 sm:-translate-y-6">
            <div className="relative">
              <Crown className="w-8 h-8 text-amber-400 mx-auto mb-1 animate-bounce" />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-600/40 via-amber-400/20 to-purple-500/30 border-2 border-amber-400/80 p-2 shadow-[0_0_40px_rgba(251,191,36,0.35)] flex items-center justify-center relative group">
                <span className="font-sans font-black text-3xl sm:text-4xl text-amber-300">#1</span>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-black font-black text-sm flex items-center justify-center shadow-lg">
                  👑
                </div>
              </div>
            </div>
            <h4 className="font-sans font-black text-amber-300 text-lg sm:text-xl text-center truncate max-w-[220px] mt-2">
              {initialEntries[0].full_name}
            </h4>
            <span className="font-mono text-xs text-amber-200/70">{initialEntries[0].participant_code}</span>
            <div className="w-full mt-3 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center shadow-lg">
              <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400">{initialEntries[0].total_points}</span>
              <span className="text-[10px] font-mono uppercase text-amber-300/80 block">Grand Total Points</span>
            </div>
          </div>

          {/* 3rd Place: Bronze */}
          <div className="w-full sm:w-1/3 flex flex-col items-center order-3 sm:order-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-900/30 border border-amber-700/50 p-2 shadow-xl flex items-center justify-center mb-3 relative group">
              <span className="font-sans font-black text-2xl text-amber-600/90">#3</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-700 text-amber-100 font-black text-xs flex items-center justify-center shadow">
                3
              </div>
            </div>
            <h4 className="font-sans font-bold text-white text-base sm:text-lg text-center truncate max-w-[200px]">
              {initialEntries[2].full_name}
            </h4>
            <span className="font-mono text-xs text-amber-600/80">{initialEntries[2].participant_code}</span>
            <div className="w-full mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-center">
              <span className="font-mono text-xl font-black text-amber-500">{initialEntries[2].total_points}</span>
              <span className="text-[10px] font-mono uppercase text-amber-600/80 block">Confirmed Points</span>
            </div>
          </div>

        </div>

        {/* Table Search & Filter Bar */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search participant or EVT code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="text-xs font-mono text-gray-400 self-end sm:self-auto">
              Showing <span className="text-white font-bold">{filtered.length}</span> verified participants
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/[0.02] border-b border-white/10 text-gray-400 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 w-16 text-center">Rank</th>
                  <th className="p-4">Participant</th>
                  <th className="p-4">Code</th>
                  <th className="p-4 text-right">Online Pts</th>
                  <th className="p-4 text-right">Offline Pts</th>
                  <th className="p-4 text-right font-bold text-white">Total Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filtered.map((entry) => (
                  <tr
                    key={entry.participant_id}
                    className="hover:bg-white/[0.03] transition-colors font-medium text-gray-300"
                  >
                    <td className="p-4 text-center font-mono font-bold text-sm">
                      {entry.rank === 1 ? (
                        <span className="text-amber-400">👑 #1</span>
                      ) : entry.rank === 2 ? (
                        <span className="text-slate-300">🥈 #2</span>
                      ) : entry.rank === 3 ? (
                        <span className="text-amber-600">🥉 #3</span>
                      ) : (
                        `#${entry.rank}`
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm sm:text-base">{entry.full_name}</div>
                      <div className="h-4" aria-hidden="true" />
                    </td>
                    <td className="p-4 font-mono text-xs text-pink-400">{entry.participant_code}</td>
                    <td className="p-4 text-right font-mono text-purple-300">{entry.online_points}</td>
                    <td className="p-4 text-right font-mono text-amber-300">{entry.offline_points}</td>
                    <td className="p-4 text-right font-mono font-black text-sm sm:text-base text-white">
                      {entry.total_points} <span className="text-[10px] text-gray-500 font-normal">PTS</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
