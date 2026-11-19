import React from 'react';

export function ParticipantTable({ participants = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3">Code</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-3 font-mono">{p.participant_code}</td>
              <td className="p-3 font-medium">{p.full_name}</td>
              <td className="p-3 text-gray-500">{p.email}</td>
              <td className="p-3">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
