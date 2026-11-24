import React, { useState } from 'react';
import { Sliders, CheckCircle, ShieldCheck } from 'lucide-react';

export function ScoringRulesForm({ onSave }) {
  const [calculationMethod, setCalculationMethod] = useState('linear_scale');
  const [speedBonus, setSpeedBonus] = useState(true);
  const [accuracyThreshold, setAccuracyThreshold] = useState(90);
  const [accuracyMultiplier, setAccuracyMultiplier] = useState(1.15);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      calculationMethod,
      speedBonus,
      accuracyThreshold: Number(accuracyThreshold),
      accuracyMultiplier: Number(accuracyMultiplier)
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="glass-card p-6 border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-400" />
          <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
            Automated Scoring Engine Parameters
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Active Ingestion Guard</span>
        </span>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-1.5 font-semibold">
          <CheckCircle className="w-4 h-4" />
          <span>Scoring rules updated and applied to future ingestions!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Base Calculation Algorithm</label>
          <select
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value)}
            className="w-full glass-input px-3 py-2 bg-slate-900 text-white rounded-lg"
          >
            <option value="linear_scale">Linear Scaling (Raw Score / Max Score * Activity Max Points)</option>
            <option value="fixed_brackets">Tiered Bracket Multipliers (Gold &gt; 85%, Silver &gt; 65%, Bronze &gt; 45%)</option>
            <option value="percentile">Dynamic Percentile Curve</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Honor Roll Threshold (%)
            </label>
            <input
              type="number"
              min="50"
              max="100"
              value={accuracyThreshold}
              onChange={(e) => setAccuracyThreshold(e.target.value)}
              className="w-full glass-input px-3 py-2 text-white font-mono rounded-lg"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Top Tier Multiplier
            </label>
            <input
              type="number"
              step="0.05"
              min="1.0"
              max="2.0"
              value={accuracyMultiplier}
              onChange={(e) => setAccuracyMultiplier(e.target.value)}
              className="w-full glass-input px-3 py-2 text-white font-mono rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="speedBonus"
            checked={speedBonus}
            onChange={(e) => setSpeedBonus(e.target.checked)}
            className="rounded bg-white/[0.05] border-white/20 text-purple-600 focus:ring-0"
          />
          <label htmlFor="speedBonus" className="text-slate-300 text-xs">
            Grant speed bonus (+5% max points) if quiz completed in under 5 minutes
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-md shadow-purple-600/30"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
}
export default ScoringRulesForm;
