import React from 'react';

export function AdminStats({ totalParticipants = 0, totalPointsAwarded = 0, activeActivities = 0 }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <span className="text-gray-500 text-sm">Participants</span>
        <p className="text-2xl font-bold">{totalParticipants}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <span className="text-gray-500 text-sm">Points Awarded</span>
        <p className="text-2xl font-bold">{totalPointsAwarded}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <span className="text-gray-500 text-sm">Active Activities</span>
        <p className="text-2xl font-bold">{activeActivities}</p>
      </div>
    </div>
  );
}
