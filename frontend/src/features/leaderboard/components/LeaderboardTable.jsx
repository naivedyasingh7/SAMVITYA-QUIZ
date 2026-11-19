import React from 'react';

export function LeaderboardTable({ entries = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 w-16">Rank</th>
            <th className="p-4">Participant</th>
            <th className="p-4 text-right">Online Pts</th>
            <th className="p-4 text-right">Offline Pts</th>
            <th className="p-4 text-right font-bold">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.participant_id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-bold text-gray-700">#{entry.rank}</td>
              <td className="p-4 font-medium">{entry.full_name}</td>
              <td className="p-4 text-right text-gray-500">{entry.online_points}</td>
              <td className="p-4 text-right text-gray-500">{entry.offline_points}</td>
              <td className="p-4 text-right font-bold text-indigo-600">{entry.total_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
