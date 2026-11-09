import React from 'react';

export function WinnerAnnouncement({ declaration }) {
  if (!declaration) return null;
  return (
    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 p-6 rounded-xl text-center shadow-lg my-6">
      <h2 className="text-2xl font-black">{declaration.title || 'Official Winners Declared!'}</h2>
      <p className="font-medium mt-1">Leaderboard has been officially locked.</p>
    </div>
  );
}
