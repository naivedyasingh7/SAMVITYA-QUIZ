import React from 'react';

export function RankCard({ rank, points }) {
  return (
    <div className="bg-indigo-600 text-white p-4 rounded-xl flex justify-between items-center">
      <div>
        <span className="text-indigo-200 text-xs uppercase font-bold tracking-wider">Your Standing</span>
        <h4 className="text-2xl font-black">Rank #{rank || '-'}</h4>
      </div>
      <div className="text-right">
        <span className="text-indigo-200 text-xs">Total Points</span>
        <p className="text-2xl font-bold">{points || 0}</p>
      </div>
    </div>
  );
}
