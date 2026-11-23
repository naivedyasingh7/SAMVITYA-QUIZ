import React from 'react';

export function WinnerAnnouncement({ declaration }) {
  if (!declaration) return null;
  return (
    <div className="glass-surface border border-indigo-500/30 p-6 rounded-xl text-center my-6">
      <h2 className="text-xl font-bold text-white tracking-tight">{declaration.title || 'Official Winners Declared'}</h2>
      <p className="text-xs text-slate-300 mt-1">Leaderboard has been officially locked and verified.</p>
    </div>
  );
}
