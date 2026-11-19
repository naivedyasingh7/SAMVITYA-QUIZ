import React from 'react';

/**
 * Displays participant profile card, human-readable ID, and point tally.
 */
export function ParticipantProfile({ participant }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-semibold text-lg">{participant?.full_name || 'Participant Name'}</h3>
      <p className="text-sm text-gray-500">{participant?.participant_code || 'EVT26-P0000'}</p>
    </div>
  );
}
