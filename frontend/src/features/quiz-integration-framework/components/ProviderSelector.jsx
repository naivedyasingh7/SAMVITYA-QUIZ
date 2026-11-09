import React from 'react';

export function ProviderSelector({ selected, onSelect }) {
  return (
    <select value={selected} onChange={(e) => onSelect(e.target.value)} className="border p-2 rounded">
      <option value="mock">Mock Simulator Provider</option>
      <option value="kahoot" disabled>Kahoot (Phase 2 Integration)</option>
      <option value="wayground" disabled>Wayground (Phase 2 Integration)</option>
    </select>
  );
}
