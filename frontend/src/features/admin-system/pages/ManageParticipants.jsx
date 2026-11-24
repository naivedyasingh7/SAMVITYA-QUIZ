import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { ParticipantTable } from '../components/ParticipantTable.jsx';
import { adminService } from '../services/adminService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Users, Search, PlusCircle, X, Award, CheckCircle } from 'lucide-react';

export default function ManageParticipants() {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState('');
  const [awardModalParticipant, setAwardModalParticipant] = useState(null);
  const [pointsToAward, setPointsToAward] = useState(100);
  const [reason, setReason] = useState('');
  const [awardSuccess, setAwardSuccess] = useState(false);

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
    const q = search.toLowerCase();
    return (
      p.full_name?.toLowerCase().includes(q) ||
      p.participant_code?.toLowerCase().includes(q) ||
      p.organization?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q)
    );
  });

  const handleAwardSubmit = async (e) => {
    e.preventDefault();
    if (!awardModalParticipant) return;

    try {
      await adminService.awardOfflinePoints({
        participant_id: awardModalParticipant.participant_id || awardModalParticipant.id,
        points: Number(pointsToAward),
        reason: reason.trim() || 'Offline Challenge Point Award'
      });
      setAwardSuccess(true);
      setTimeout(() => {
        setAwardSuccess(false);
        setAwardModalParticipant(null);
        setReason('');
      }, 1500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                Competitor Roster
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-space">
              Manage Registered Participants
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Total {participants.length} competitors registered across technical clubs and tracks.
            </p>
          </div>

          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name, ID code, or club..."
              className="w-full glass-input pl-9 pr-3 py-2 text-xs text-white rounded-lg"
            />
          </div>
        </div>

        {/* Participant Table */}
        <ParticipantTable
          participants={filtered}
          onAwardPoints={(p) => setAwardModalParticipant(p)}
        />

        {/* Modal: Quick Award Points to Selected Participant */}
        {awardModalParticipant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="glass-surface max-w-md w-full p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-white">
                    Award Points to {awardModalParticipant.full_name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setAwardModalParticipant(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {awardSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Points Awarded Successfully!</h4>
                  <p className="text-xs text-slate-400">Score has been added to participant's ledger.</p>
                </div>
              ) : (
                <form onSubmit={handleAwardSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Participant Code</label>
                    <input
                      type="text"
                      disabled
                      value={`${awardModalParticipant.participant_code} (${awardModalParticipant.organization || 'Club'})`}
                      className="w-full glass-input px-3 py-2 bg-white/[0.02] text-slate-400 font-mono rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Points to Award</label>
                    <div className="flex gap-2 mb-2">
                      {[50, 100, 250, 500].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPointsToAward(num)}
                          className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                            pointsToAward === num
                              ? 'bg-indigo-600 text-white shadow'
                              : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]'
                          }`}
                        >
                          +{num}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={pointsToAward}
                      onChange={(e) => setPointsToAward(e.target.value)}
                      className="w-full glass-input px-3 py-2 text-white font-mono rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Reason / Justification</label>
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="e.g. Completed Hardware lab puzzle #3"
                      className="w-full glass-input px-3 py-2 text-white rounded-lg"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setAwardModalParticipant(null)}
                      className="px-4 py-2 text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md"
                    >
                      Confirm Award
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
