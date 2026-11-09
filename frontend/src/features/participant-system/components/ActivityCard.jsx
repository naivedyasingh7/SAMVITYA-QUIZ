import React from 'react';

/**
 * Card component for online quiz or offline activity.
 */
export function ActivityCard({ activity, onStart }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-400 transition-all">
      <h4 className="font-bold">{activity?.title || 'Activity Title'}</h4>
      <p className="text-sm text-gray-600">{activity?.description}</p>
      <button onClick={() => onStart?.(activity)} className="mt-3 text-sm font-semibold text-indigo-600">
        Start Activity &rarr;
      </button>
    </div>
  );
}
