import React from 'react';

export function ProviderSelector({ selected, onSelect, providers = [] }) {
  const allProviders = [
    {
      id: 'native',
      name: 'Native In-House Quiz Platform',
      status: 'active',
      badge: 'Active & Verified',
      description: 'Zero third-party dependency. Internal question authoring bank, direct session scoring, and real-time ledger writes.'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">
        Active Quiz Platform
      </label>
      <div className="grid grid-cols-1 gap-2.5">
        {allProviders.map((prov) => {
          const isSelected = selected === prov.id || true;

          return (
            <div
              key={prov.id}
              onClick={() => onSelect(prov.id)}
              className="p-3.5 glass-card border-indigo-500/40 bg-indigo-500/[0.04] rounded-lg transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="quiz-provider"
                    value={prov.id}
                    checked={isSelected}
                    onChange={() => onSelect(prov.id)}
                    className="text-indigo-500 focus:ring-indigo-400 accent-indigo-600 h-4 w-4"
                  />
                  <span className="font-semibold text-xs text-white">{prov.name}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-mono uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {prov.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                {prov.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
