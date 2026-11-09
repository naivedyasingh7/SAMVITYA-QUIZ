import React from 'react';

/**
 * RegisterPage component placeholder.
 * Allows new participants to register or returning participants to log in via email.
 */
export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Participant Registration</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Scan QR or enter your details below</p>
      {/* TODO: Connect with participantService.register() */}
    </div>
  );
}
