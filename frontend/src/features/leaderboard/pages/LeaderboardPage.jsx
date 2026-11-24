import React, { useState, useEffect } from 'react';
import { leaderboardService } from '../services/leaderboardService.js';
import { TopThree } from '../components/TopThree.jsx';
import { LeaderboardTable } from '../components/LeaderboardTable.jsx';
import { WinnerAnnouncement } from '../components/WinnerAnnouncement.jsx';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Trophy, RotateCcw, Sparkles, Radio, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LeaderboardPage() {
  const [rankings, setRankings] = useState([]);
  const [declaration, setDeclaration] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    setIsRefreshing(true);
    const list = await leaderboardService.getRankings();
    const decl = await leaderboardService.getWinnerDeclaration();
    setRankings(list);
    setDeclaration(decl);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  useEffect(() => {
    loadData();
    const unsub = eventStore.subscribe(() => {
      loadData();
    });
    return unsub;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              <span>Realtime WebSocket Leaderboard</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-space">
            samVITya '26 Grand Championship Standings
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Live cumulative scores computed from validated speed quizzes, lab escape rooms, and technical hack challenges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Scores'}</span>
          </button>

          <Link
            to="/leaderboard/analytics"
            className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Analytics</span>
          </Link>
        </div>
      </div>

      {/* Official Winner Banner if Locked */}
      <WinnerAnnouncement declaration={declaration} />

      {/* Top 3 Championship Podium */}
      <TopThree topEntries={rankings.slice(0, 3)} />

      {/* Full Ranking Table */}
      <LeaderboardTable entries={rankings} />
    </div>
  );
}
