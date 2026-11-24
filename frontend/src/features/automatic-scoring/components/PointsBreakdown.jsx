import React from 'react';
import { Award, CheckCircle, Zap } from 'lucide-react';

export function PointsBreakdown({ rawScore = 0, maxScore = 100, pointsAwarded = 0, activityTitle = 'Quiz Arena' }) {
  const percentage = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0;

  return (
    <div className="glass-surface p-4 rounded-xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase text-slate-400">{activityTitle}</span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <CheckCircle className="w-3 h-3" />
          <span>Formula: Linear Scaling</span>
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs text-slate-400 block font-mono">Raw Test Performance</span>
          <span className="text-xl font-bold font-mono text-white">
            {rawScore} / {maxScore}{' '}
            <span className="text-xs font-normal text-slate-400 font-mono">({percentage}%)</span>
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block font-mono">Event Points Credited</span>
          <span className="text-2xl font-black font-space bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            +{pointsAwarded} pts
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
export default PointsBreakdown;
