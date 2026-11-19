import React from 'react';

/**
 * QRRegistration component placeholder.
 * Handles QR code scanning and displaying generated QR for participants.
 */
export function QRRegistration({ onScan, participantCode }) {
  return (
    <div className="border border-dashed border-gray-300 p-6 rounded-lg text-center">
      <p className="text-gray-500 font-medium">QR Scanner / Display Component</p>
      {participantCode && <p className="mt-2 text-indigo-600 font-bold">{participantCode}</p>}
    </div>
  );
}
