import React, { useState, useEffect } from 'react';
import { ScoringRulesForm } from '../components/ScoringRulesForm.jsx';
import { TransactionHistory } from '../components/TransactionHistory.jsx';
import { pointsService } from '../services/pointsService.js';
import { adminService } from '../../admin-system/services/adminService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { ShieldCheck, Plus, Minus, AlertTriangle, CheckCircle, Scale } from 'lucide-react';

export default function ScoringManagement() {
  const [transactions, setTransactions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedPartId, setSelectedPartId] = useState('');
  const [adjustPoints, setAdjustPoints] = useState(50);
  const [adjustReason, setAdjustReason] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const loadData = async () => {
    const txs = await pointsService.getTransactions();
    const parts = await adminService.getAllParticipants();
    setTransactions(txs);
    setParticipants(parts);
    if (parts.length > 0 && !selectedPartId) {
      setSelectedPartId(parts[0].participant_id || parts[0].id);
    }
  };

  useEffect(() => {
    loadData();
    const unsub = eventStore.subscribe(() => loadData());
    return unsub;
  }, []);

  const handleAdjustment = async (isDeduction = false) => {
    if (!selectedPartId || !adjustReason.trim()) {
      setStatusMsg({ type: 'error', text: 'Participant and audit reason are required.' });
      return;
    }

    try {
      const finalPoints = isDeduction ? -Math.abs(Number(adjustPoints)) : Math.abs(Number(adjustPoints));
      await pointsService.manualAdjustment({
        participant_id: selectedPartId,
        points: finalPoints,
        reason: adjustReason.trim(),
        admin_id: 'admin-001'
      });
      setStatusMsg({
        type: 'success',
        text: `Successfully recorded ${finalPoints > 0 ? '+' : ''}${finalPoints} points adjustment.`
      });
      setAdjustReason('');
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Scale className="w-4 h-4 text-purple-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 font-semibold">
            Point Engine & Audit Bureau
          </span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight font-space">
          Automated Scoring Engine & Transaction Ledger
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Review scoring formulas, idempotency verification logs, and apply audited manual score adjustments.
        </p>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Top 2 Columns: Scoring Rules & Manual Correction Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scoring Rule Configuration */}
        <ScoringRulesForm onSave={(rules) => console.log('Saved rules:', rules)} />

        {/* Manual Point Adjustment / Deduction Console */}
        <div className="glass-card p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
              Administrative Score Adjustment Console
            </h3>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Audit Required
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Competitor</label>
              <select
                value={selectedPartId}
                onChange={(e) => setSelectedPartId(e.target.value)}
                className="w-full glass-input px-3 py-2 bg-slate-900 text-white rounded-lg"
              >
                {participants.map((p) => (
                  <option key={p.participant_id || p.id} value={p.participant_id || p.id}>
                    {p.full_name} ({p.participant_code}) — Balance: {p.total_points || 0} pts
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Point Magnitude</label>
              <input
                type="number"
                min="1"
                max="2000"
                value={adjustPoints}
                onChange={(e) => setAdjustPoints(e.target.value)}
                className="w-full glass-input px-3 py-2 text-white font-mono rounded-lg"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Justification Reason *</label>
              <input
                type="text"
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="e.g. Invalidation of question #4 error, or bonus task completion"
                className="w-full glass-input px-3 py-2 text-white rounded-lg"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleAdjustment(false)}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Award Adjustment (+{adjustPoints})</span>
              </button>
              <button
                type="button"
                onClick={() => handleAdjustment(true)}
                className="flex-1 py-2 px-3 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Apply Deduction (-{adjustPoints})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Immutable Ledger Table */}
      <TransactionHistory transactions={transactions} />
    </div>
  );
}
