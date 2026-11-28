import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Sparkles, Lock } from 'lucide-react';

export function WinnerAnnouncement({ declaration }) {
  if (!declaration || !declaration.is_locked) return null;

  useEffect(() => {
    // Fire celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [declaration]);

  return (
    <div className="glass-surface border-2 border-amber-400/50 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center my-6 ring-2 ring-amber-400/20">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
        <Lock className="w-3.5 h-3.5" />
        <span>Official Championship Results Locked</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-space max-w-2xl mx-auto">
        {declaration.title || 'Protocol Zero 2026 Grand Championship Winners Declared!'}
      </h2>
      <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
        All scores have been officially validated and finalized. Congratulations to the champions!
      </p>

      {declaration.winners && declaration.winners.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-3xl mx-auto">
          {declaration.winners.map((winner) => (
            <div
              key={winner.participant_id}
              className={`p-4 rounded-xl border text-center ${
                winner.rank === 1
                  ? 'bg-amber-500/20 border-amber-400/50 shadow-lg'
                  : 'bg-white/[0.04] border-white/10'
              }`}
            >
              <div className="text-2xl mb-1">{winner.rank === 1 ? '🥇' : winner.rank === 2 ? '🥈' : '🥉'}</div>
              <span className="text-[10px] font-mono text-amber-300 uppercase font-bold block">
                Rank #{winner.rank}
              </span>
              <h4 className="font-bold text-white text-sm mt-0.5 truncate">{winner.full_name}</h4>
              <span className="text-xs font-mono font-bold text-slate-300 mt-1 block">
                {winner.total_points} Points
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default WinnerAnnouncement;
