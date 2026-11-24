import React from 'react';
import { Users, UserCheck, Zap, Target, TrendingUp } from 'lucide-react';

export function AdminStats({
  totalParticipants = 250,
  activeParticipants = 180,
  totalQuizzesCompleted = 150,
  offlineGamesPlayed = 120
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Total Registered</span>
          <Users className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-3xl font-black font-space text-white">{totalParticipants}</div>
        <span className="text-[10px] text-slate-400 font-mono mt-1 block">Registered Competitors</span>
      </div>

      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Active Participants</span>
          <UserCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-3xl font-black font-space text-emerald-300">{activeParticipants}</div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mt-1">
          <TrendingUp className="w-3 h-3" />
          <span>Active in Booths & Quizzes</span>
        </div>
      </div>

      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Quiz Completed</span>
          <Zap className="w-4 h-4 text-purple-400" />
        </div>
        <div className="text-3xl font-black font-space text-purple-300">{totalQuizzesCompleted}</div>
        <span className="text-[10px] text-purple-300/70 font-mono mt-1 block">Verified Test Runs</span>
      </div>

      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Offline Games Played</span>
          <Target className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-3xl font-black font-space text-amber-300">{offlineGamesPlayed}</div>
        <span className="text-[10px] text-amber-400/70 font-mono mt-1 block">Treasure Hunt, Escape Room, etc.</span>
      </div>
    </div>
  );
}
export default AdminStats;
