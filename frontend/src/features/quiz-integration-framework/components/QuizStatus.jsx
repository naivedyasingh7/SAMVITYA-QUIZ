import React from 'react';

export function QuizStatus({ attempt }) {
  if (!attempt) {
    return (
      <div className="flex items-center gap-2 p-3 glass-card border-dashed text-xs text-slate-400">
        <span className="w-2 h-2 rounded-xs bg-slate-500"></span>
        <span>No active quiz attempt tracked. Generate a launch link above.</span>
      </div>
    );
  }

  const isCompleted = attempt.status === 'completed';
  const isInProgress = attempt.status === 'in_progress';

  return (
    <div className="p-3.5 glass-card space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-xs ${
              isCompleted
                ? 'bg-emerald-400'
                : isInProgress
                ? 'bg-amber-400 animate-pulse'
                : 'bg-slate-400'
            }`}
          />
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-300">
            Session Status
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-medium border ${
              isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : isInProgress
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-white/[0.04] border-white/10 text-slate-300'
            }`}
          >
            {attempt.status?.toUpperCase() || 'READY'}
          </span>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Provider: {attempt.provider || 'native'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06] text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Attempt ID</span>
          <span className="font-mono text-white font-medium truncate block" title={attempt.attempt_id}>
            {attempt.attempt_id}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Started At</span>
          <span className="text-slate-200 block">
            {attempt.started_at ? new Date(attempt.started_at).toLocaleTimeString() : 'Just now'}
          </span>
        </div>
      </div>
    </div>
  );
}
