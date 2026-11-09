import React from 'react';

export function ImportHistory({ imports = [] }) {
  return (
    <div className="border rounded p-4 bg-gray-50">
      <h4 className="font-semibold mb-2">Ingestion History</h4>
      <p className="text-xs text-gray-500">{imports.length} results recorded</p>
    </div>
  );
}
