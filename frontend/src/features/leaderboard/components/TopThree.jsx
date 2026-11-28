import React from 'react';
import { Trophy, Crown, Sparkles, Award } from 'lucide-react';

export function TopThree({ topEntries = [] }) {
  if (topEntries.length === 0) return null;

  const first = topEntries[0];
  const second = topEntries[1];
  const third = topEntries[2];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-10 max-w-4xl mx-auto px-4">
      {/* 2nd Place (Silver) */}
      {second && (
        <div className="order-2 sm:order-1 flex flex-col items-center w-full sm:w-60">
          <div className="glass-card p-5 w-full text-center border-slate-400/30 hover:border-slate-300/50 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400/10 rounded-full blur-xl pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-slate-700/80 border-2 border-slate-300 flex items-center justify-center mx-auto mb-3 text-slate-200 font-bold text-lg shadow-lg">
              2
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              Runner Up
            </span>
            <h4 className="font-extrabold text-white text-base mt-1 truncate">{second.full_name}</h4>
            <p className="text-[11px] min-h-[16px]" aria-hidden="true">&nbsp;</p>
            <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-center gap-1 text-sm font-mono font-black text-slate-200">
              <Award className="w-4 h-4 text-slate-400" />
              <span>{second.total_points} pts</span>
            </div>
          </div>
          <div className="hidden sm:block w-full h-8 bg-slate-800/40 border border-white/5 rounded-b-xl" />
        </div>
      )}

      {/* 1st Place (Gold Podium - Elevated) */}
      {first && (
        <div className="order-1 sm:order-2 flex flex-col items-center w-full sm:w-64 -translate-y-2 sm:-translate-y-4">
          <div className="glass-surface p-6 w-full text-center border-amber-400/40 hover:border-amber-400/70 transition-all shadow-2xl relative overflow-hidden group ring-1 ring-amber-400/20">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-yellow-200 flex items-center justify-center mx-auto mb-3 text-slate-950 font-black text-2xl shadow-xl shadow-amber-500/30">
              <Crown className="w-8 h-8 fill-slate-950" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Grand Champion</span>
            </span>
            <h4 className="font-black text-white text-lg mt-1 tracking-tight truncate">{first.full_name}</h4>
            <p className="text-xs min-h-[16px]" aria-hidden="true">&nbsp;</p>
            <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-center gap-1.5 text-lg font-mono font-black text-amber-300">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>{first.total_points} pts</span>
            </div>
          </div>
          <div className="hidden sm:block w-full h-14 bg-amber-950/20 border border-amber-500/20 rounded-b-xl" />
        </div>
      )}

      {/* 3rd Place (Bronze) */}
      {third && (
        <div className="order-3 flex flex-col items-center w-full sm:w-60">
          <div className="glass-card p-5 w-full text-center border-amber-700/30 hover:border-amber-700/50 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-700/10 rounded-full blur-xl pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-amber-900/60 border-2 border-amber-600 flex items-center justify-center mx-auto mb-3 text-amber-300 font-bold text-lg shadow-lg">
              3
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
              2nd Runner Up
            </span>
            <h4 className="font-extrabold text-white text-base mt-1 truncate">{third.full_name}</h4>
            <p className="text-[11px] min-h-[16px]" aria-hidden="true">&nbsp;</p>
            <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-center gap-1 text-sm font-mono font-black text-amber-400">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{third.total_points} pts</span>
            </div>
          </div>
          <div className="hidden sm:block w-full h-4 bg-slate-800/40 border border-white/5 rounded-b-xl" />
        </div>
      )}
    </div>
  );
}
export default TopThree;
