import React from 'react';

export function TopThree({ topEntries = [] }) {
  return (
    <div className="flex justify-center items-end space-x-4 my-8">
      {/* 2nd Place */}
      <div className="text-center">
        <div className="w-20 h-24 bg-slate-200 rounded-t-lg flex items-center justify-center font-bold text-xl">2</div>
        <p className="text-xs font-semibold mt-1">{topEntries[1]?.full_name || '2nd Place'}</p>
      </div>
      {/* 1st Place */}
      <div className="text-center">
        <div className="w-24 h-32 bg-amber-300 rounded-t-lg flex items-center justify-center font-bold text-2xl">👑 1</div>
        <p className="text-xs font-bold mt-1">{topEntries[0]?.full_name || '1st Place'}</p>
      </div>
      {/* 3rd Place */}
      <div className="text-center">
        <div className="w-20 h-16 bg-amber-600/30 rounded-t-lg flex items-center justify-center font-bold text-xl">3</div>
        <p className="text-xs font-semibold mt-1">{topEntries[2]?.full_name || '3rd Place'}</p>
      </div>
    </div>
  );
}
