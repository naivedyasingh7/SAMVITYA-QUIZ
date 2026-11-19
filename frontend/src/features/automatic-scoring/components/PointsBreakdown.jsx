import React from 'react';

export function PointsBreakdown({ rawScore, maxScore, pointsAwarded }) {
  return (
    <div className="text-sm bg-slate-50 p-3 rounded border">
      <div>Raw Score: {rawScore} / {maxScore}</div>
      <div className="font-bold text-indigo-600">Points Awarded: {pointsAwarded}</div>
    </div>
  );
}
