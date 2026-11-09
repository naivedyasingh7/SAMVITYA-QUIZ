import React from 'react';

export function TransactionHistory({ transactions = [] }) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm text-gray-700">Ledger History</h4>
      {/* TODO: Display immutable points ledger */}
    </div>
  );
}
