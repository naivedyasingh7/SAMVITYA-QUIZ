import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar.jsx';
import { AdminStats } from '../components/AdminStats.jsx';
import { adminService } from '../services/adminService.js';
import { pointsService } from '../../automatic-scoring/services/pointsService.js';
import { eventStore } from '../../../shared/services/eventStore.js';
import {
  Shield,
  Award,
  Activity,
  Users,
  ArrowRight,
  History,
  Download,
  Upload,
  HardDrive,
  Wifi,
  Trophy,
  FileText
} from 'lucide-react';
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
    setRecentTransactions(txs.slice(0, 8));
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
    a.download = `protocol-zero-backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
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
    a.download = `protocol-zero-leaderboard-${new Date().toISOString().slice(0, 10)}.csv`;
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

  const txBadge = (type) => {
    if (type === 'quiz_award') return { label: 'QUIZ', cls: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
    if (type === 'offline_challenge') return { label: 'OFFLINE', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
    return { label: 'ADJUST', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-8 space-y-7 max-w-7xl mx-auto">
        {/* Control Room Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900/70 to-purple-950/40 border border-white/10 p-5 sm:p-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[10px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
                <Shield className="w-3 h-3" />
                Event Control Room
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE SYNC
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-space">
              Protocol Zero Administrator Console
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Monitor live point inflows, manage quiz &amp; booth activities, award offline points, and audit every transaction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/leaderboard"
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Standings</span>
            </Link>
            <Link
              to="/admin/award-points"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Award Points</span>
            </Link>
          </div>
        </div>

        {/* Live Aggregate KPI Stats */}
        <AdminStats
          totalParticipants={stats.totalParticipants}
          totalPointsAwarded={stats.totalPointsAwarded}
          activeActivities={stats.activeActivities}
          totalQuizzesCompleted={stats.totalQuizzesCompleted}
        />

        {/* Quick Operations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/participants"
            className="glass-card p-5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                  <Users className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors">
                Participants Directory
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Search competitors, tick off offline challenges, and inspect score histories.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-indigo-300">
              {stats.totalParticipants} registered &rarr;
            </div>
          </Link>

          <Link
            to="/admin/activities"
            className="glass-card p-5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <Activity className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-emerald-200 transition-colors">
                Manage Activities
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Create new quizzes or offline challenges, toggle availability, and set max points.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-emerald-300">
              {stats.activeActivities} active &rarr;
            </div>
          </Link>

          <Link
            to="/admin/quiz-manager"
            className="glass-card p-5 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all group flex flex-col justify-between sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <FileText className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-purple-200 transition-colors">
                Quiz Question Banks
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Author questions, upload CSVs, assign answer keys, and run simulated tests.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-purple-300">
              Open Quiz Studio &rarr;
            </div>
          </Link>
        </div>

        {/* Live Immutable Transaction Stream */}
        <div className="glass-card border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                Live Audit Stream (Latest Transactions)
              </h3>
            </div>
            <Link to="/scoring" className="text-xs text-indigo-400 hover:text-indigo-300 font-mono">
              Full Ledger &rarr;
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No transactions recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {recentTransactions.map((tx) => {
                const badge = txBadge(tx.transaction_type);
                return (
                  <div
                    key={tx.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2.5 px-2 rounded-lg hover:bg-white/[0.025] transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold shrink-0 ${badge.cls}`}>
                        {badge.label}
                      </span>
                      <span className="text-slate-200 font-medium truncate">{tx.reason}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 font-mono shrink-0">
                      <span
                        className={`font-bold px-2 py-0.5 rounded border ${
                          tx.points >= 0
                            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                            : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                        }`}
                      >
                        {tx.points >= 0 ? `+${tx.points}` : tx.points} pts
                      </span>
                      <span className="text-slate-500 text-[10px]">
                        {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Event Fallback & Disaster Recovery Console */}
        <div className="glass-card border border-amber-500/25 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
                  Event Backup &amp; Storage Health
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Offline-resilient persistence active. Export snapshots or CSV backups anytime during the event.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Wifi className="w-3 h-3" />
                <span>{storageHealth.status}</span>
              </span>
              <span className="text-slate-400">
                <strong className="text-white">{storageHealth.estimatedKB} KB</strong> ({storageHealth.quotaPercent}%)
              </span>
            </div>
          </div>

          {/* Visual storage quota bar */}
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                storageHealth.quotaPercent > 80 ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.max(2, storageHealth.quotaPercent)}%` }}
            />
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
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export JSON Snapshot</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Leaderboard CSV</span>
            </button>

            <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-semibold text-indigo-200 flex items-center gap-2 transition-colors">
              <Upload className="w-3.5 h-3.5 text-indigo-300" />
              <span>Restore JSON Backup</span>
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
