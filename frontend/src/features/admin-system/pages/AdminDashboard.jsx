import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { AdminStats } from '../components/AdminStats.jsx';
import { adminService } from '../services/adminService.js';
import { pointsService } from '../../automatic-scoring/services/pointsService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Shield, PlusCircle, Award, Activity, Users, ArrowRight, History, CheckCircle, Download, Upload, HardDrive, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalPointsAwarded: 0,
    activeActivities: 0,
    totalQuizzesCompleted: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [storageHealth, setStorageHealth] = useState(eventStore.getStorageHealth());
  const [backupMsg, setBackupMsg] = useState(null);

  const loadData = async () => {
    const s = await adminService.getOverviewStats();
    const txs = await pointsService.getTransactions();
    setStats(s);
    setRecentTransactions(txs.slice(0, 6));
    setStorageHealth(eventStore.getStorageHealth());
  };

  useEffect(() => {
    loadData();
    const unsub = eventStore.subscribe(() => loadData());
    return unsub;
  }, []);

  const handleExportSnapshot = () => {
    const snapshot = eventStore.exportBackupSnapshot();
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `samvitya-backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg('Full JSON snapshot exported successfully.');
  };

  const handleExportCsv = () => {
    const csv = eventStore.exportLeaderboardCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `samvitya-leaderboard-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg('Leaderboard CSV backup exported (formula-injection protected).');
  };

  const handleRestoreSnapshot = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        const res = eventStore.restoreBackupSnapshot(parsed);
        setBackupMsg(`Restored ${res.restoredParticipants} participants & ${res.restoredTransactions} transactions.`);
      } catch (err) {
        setBackupMsg(`Restore failed: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                Event Operations Control Room
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-space">
              samVITya '26 Administrator Console
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitor real-time point inflows, manage event activities, award offline challenge points, and audit scores.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/award-points"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Award Offline Points</span>
            </Link>
          </div>
        </div>

        {/* Aggregate KPI Stats */}
        <AdminStats
          totalParticipants={stats.totalParticipants}
          totalPointsAwarded={stats.totalPointsAwarded}
          activeActivities={stats.activeActivities}
          totalQuizzesCompleted={stats.totalQuizzesCompleted}
        />

        {/* Quick Management Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/activities"
            className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300">
                <Activity className="w-5 h-5 stroke-[1.75]" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors">
              Manage Activities
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Add new challenges, toggle active state, and calibrate max points.
            </p>
          </Link>

          <Link
            to="/admin/participants"
            className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
                <Users className="w-5 h-5 stroke-[1.75]" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors">
              Participants Directory
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              View registered club competitors, audit points, and generate QR passes.
            </p>
          </Link>

          <Link
            to="/admin/quiz-manager"
            className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                <Shield className="w-5 h-5 stroke-[1.75]" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors">
              Quiz Question Banks
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Author questions, assign answer keys, and test simulated attempts.
            </p>
          </Link>
        </div>

        {/* Live Immutable Transaction Stream */}
        <div className="glass-card border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                Live Audit Stream (Last 6 Transactions)
              </h3>
            </div>
            <Link to="/scoring" className="text-xs text-indigo-400 hover:text-indigo-300 font-mono">
              View Scoring Ledger &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-indigo-300 font-semibold">{tx.id}</span>
                  <span className="text-slate-300 font-medium">{tx.reason}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    +{tx.points} pts
                  </span>
                  <span className="text-slate-500 text-[10px]">
                    {new Date(tx.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Fallback & Disaster Recovery Console */}
        <div className="glass-card border border-amber-500/25 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                  Event Fallback & Disaster Recovery
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Offline-resilient local persistence active. Export snapshots or CSV backups anytime during the event.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Wifi className="w-3 h-3" />
                <span>Local Fallback Ready</span>
              </span>
              <span className="text-slate-400">
                Storage: <strong className="text-white">{storageHealth.estimatedKB} KB</strong> ({storageHealth.quotaPercent}%)
              </span>
            </div>
          </div>

          {backupMsg && (
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              {backupMsg}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportSnapshot}
              className="px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Full JSON Snapshot</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Leaderboard CSV</span>
            </button>

            <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-semibold text-indigo-200 flex items-center gap-2 transition-colors">
              <Upload className="w-3.5 h-3.5 text-indigo-300" />
              <span>Restore from JSON Backup</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleRestoreSnapshot}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
