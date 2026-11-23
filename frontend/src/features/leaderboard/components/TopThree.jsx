import React from 'react';

export function TopThree({ topEntries = [] }) {
  return (
    <div className="flex justify-center items-end space-x-3 my-8">
      {/* 2nd Place */}
      <div className="text-center">
        <div className="w-20 h-24 glass-card border-white/10 flex items-center justify-center font-mono font-bold text-lg text-slate-300">
          2
        </div>
        <p className="text-xs font-medium text-slate-300 mt-2 truncate max-w-[80px]">
          {topEntries[1]?.full_name || '2nd Place'}
        </p>
      </div>

      {/* 1st Place */}
      <div className="text-center">
        <div className="w-24 h-32 glass-surface border-indigo-500/30 flex items-center justify-center font-mono font-bold text-2xl text-indigo-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          1
        </div>
        <p className="text-xs font-semibold text-white mt-2 truncate max-w-[96px]">
          {topEntries[0]?.full_name || '1st Place'}
        </p>
      </div>

      {/* 3rd Place */}
      <div className="text-center">
        <div className="w-20 h-16 glass-card border-white/10 flex items-center justify-center font-mono font-bold text-base text-slate-400">
          3
        </div>
        <p className="text-xs font-medium text-slate-300 mt-2 truncate max-w-[80px]">
          {topEntries[2]?.full_name || '3rd Place'}
        </p>
      </div>
    </div>
  );
}
