import React from 'react';
import { Users, Award, Zap, Activity, CheckCircle, TrendingUp } from 'lucide-react';

export function AdminStats({
  totalParticipants = 0,
  totalPointsAwarded = 0,
  activeActivities = 0,
  totalQuizzesCompleted = 0
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/30 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Registered Competitors</span>
          <Users className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-3xl font-black font-space text-white">{totalParticipants}</div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mt-1">
          <TrendingUp className="w-3 h-3" />
          <span>Active Across All Guilds</span>
        </div>
      </div>

      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/30 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Total Points Awarded</span>
          <Award className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-3xl font-black font-space text-amber-300">
          {totalPointsAwarded.toLocaleString()}
        </div>
        <span className="text-[10px] text-slate-400 font-mono mt-1 block">Verified Immutable Ledger</span>
      </div>

      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/30 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Active Events</span>
          <Activity className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-3xl font-black font-space text-emerald-300">{activeActivities}</div>
        <span className="text-[10px] text-emerald-400/70 font-mono mt-1 block">Live for Scoring</span>
      </div>

      <div className="glass-card p-5 border border-white/10 hover:border-indigo-500/30 transition-all">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Quiz Completions</span>
          <Zap className="w-4 h-4 text-purple-400" />
        </div>
        <div className="text-3xl font-black font-space text-purple-300">{totalQuizzesCompleted}</div>
        <span className="text-[10px] text-purple-300/70 font-mono mt-1 block">Validated Submissions</span>
      </div>
    </div>
  );
}
export default AdminStats;
