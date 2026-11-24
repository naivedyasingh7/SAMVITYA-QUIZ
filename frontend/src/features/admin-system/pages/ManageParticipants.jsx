import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { ParticipantTable } from '../components/ParticipantTable.jsx';
import { adminService } from '../services/adminService.js';
import { pointsService } from '../../automatic-scoring/services/pointsService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { QRScannerModal } from '../../../shared/components/QRScannerModal.jsx';
import { Users, Search, Camera, Plus, Minus, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function ManageParticipants() {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null); // { participant, type: 'add' | 'deduct' }
  const [pointsVal, setPointsVal] = useState(20);
  const [reason, setReason] = useState('');
  const [adminName, setAdminName] = useState('admin-001');
  const [notice, setNotice] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const loadParticipants = async () => {
    const list = await adminService.getAllParticipants();
    setParticipants(list);
  };

  useEffect(() => {
    loadParticipants();
    const unsub = eventStore.subscribe(() => loadParticipants());
    return unsub;
  }, []);

  const filtered = participants.filter((p) => {
    const q = search.toLowerCase().trim();
    const u = (p.username || p.participant_code || '').toLowerCase();
    const n = (p.full_name || '').toLowerCase();
    const org = (p.organization || '').toLowerCase();
    return u.includes(q) || n.includes(q) || org.includes(q);
  });

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    if (!activeModal?.participant) return;

    const isDeduct = activeModal.type === 'deduct';
    const finalPoints = isDeduct ? -Math.abs(Number(pointsVal)) : Math.abs(Number(pointsVal));

    try {
      if (isDeduct) {
        await pointsService.manualAdjustment({
          participant_id: activeModal.participant.participant_id || activeModal.participant.id,
          points: finalPoints,
          reason: reason.trim() || 'Offline game deduction',
          admin_id: adminName
        });
      } else {
        await adminService.awardOfflinePoints({
          participant_id: activeModal.participant.participant_id || activeModal.participant.id,
          points: finalPoints,
          reason: reason.trim() || 'Offline game points added',
          admin_id: adminName
        });
      }

      setNotice({
        type: 'success',
        text: `Successfully ${isDeduct ? 'deducted' : 'added'} ${Math.abs(finalPoints)} points for ${activeModal.participant.username}!`
      });
      setTimeout(() => {
        setNotice(null);
        setActiveModal(null);
        setReason('');
      }, 1500);
    } catch (err) {
      setNotice({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                Competitor Directory
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-space">
              Participant Management
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live table of all registered competitors, quiz points, offline game points, and total score.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsScannerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-indigo-200 border border-indigo-400/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>Scan QR Pass</span>
            </button>

            <div className="w-56 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search username (e.g. P001)..."
                className="w-full glass-input pl-9 pr-3 py-2 text-xs text-white rounded-xl"
              />
            </div>
          </div>
        </div>

        {notice && (
          <div
            className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              notice.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {notice.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{notice.text}</span>
          </div>
        )}

        {/* Live Table */}
        <ParticipantTable
          participants={filtered}
          onAwardPoints={(p) => {
            setActiveModal({ participant: p, type: 'add' });
            setPointsVal(20);
            setReason('Treasure Hunt: Task completion');
          }}
          onDeductPoints={(p) => {
            setActiveModal({ participant: p, type: 'deduct' });
            setPointsVal(10);
            setReason('Penalty deduction for rule violation');
          }}
        />

        {/* Add/Deduct Points Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <div className="glass-surface max-w-md w-full p-6 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="font-bold text-sm text-white">
                  {activeModal.type === 'deduct' ? 'Deduct Points from' : 'Add Points to'}{' '}
                  <span className="text-indigo-300 font-mono font-bold">
                    {activeModal.participant.username}
                  </span>{' '}
                  ({activeModal.participant.full_name})
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleActionSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Points Delta *</label>
                  <div className="flex gap-2 mb-2">
                    {[10, 20, 30, 50].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPointsVal(v)}
                        className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                          pointsVal === v
                            ? activeModal.type === 'deduct'
                              ? 'bg-rose-600 text-white shadow'
                              : 'bg-emerald-600 text-white shadow'
                            : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]'
                        }`}
                      >
                        {activeModal.type === 'deduct' ? '-' : '+'}
                        {v}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={pointsVal}
                    onChange={(e) => setPointsVal(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-white font-mono rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Game / Audit Reason *
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Treasure Hunt clue #2 solved"
                    className="w-full glass-input px-3 py-2 text-white rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Authorized Admin ID *
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full glass-input px-3 py-2 text-white rounded-lg"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg font-bold shadow-md transition-all ${
                      activeModal.type === 'deduct'
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                    }`}
                  >
                    {activeModal.type === 'deduct' ? 'Confirm Deduction' : 'Confirm Award'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* QR Scanner */}
        <QRScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onParticipantFound={(matched) => {
            setActiveModal({ participant: matched, type: 'add' });
            setPointsVal(20);
            setReason('Treasure Hunt clue completion');
          }}
        />
      </div>
    </div>
  );
}
