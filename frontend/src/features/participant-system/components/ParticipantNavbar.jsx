import React from 'react';

export function ParticipantNavbar({ participantCode }) {
  return (
    <div className="flex justify-between items-center py-3 border-b">
      <span className="font-bold text-indigo-600">Event Participant</span>
      <span className="text-sm bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{participantCode}</span>
    </div>
  );
}
