import React from 'react';
import { Users, Coins, Zap, Activity } from 'lucide-react';

export function AdminStats({
  totalParticipants = 0,
  totalPointsAwarded = 0,
  activeActivities = 0,
  totalQuizzesCompleted = 0
}) {
  const cards = [
    {
      label: 'Total Competitors',
      value: totalParticipants.toLocaleString(),
      sub: 'Registered & active IDs',
      icon: Users,
      accent: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/25',
      iconColor: 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30',
      valueColor: 'text-white'
    },
    {
      label: 'Total Points Issued',
      value: totalPointsAwarded.toLocaleString(),
      sub: 'Immutable ledger sum',
      icon: Coins,
      accent: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/25',
      iconColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
      valueColor: 'text-emerald-300'
    },
    {
      label: 'Quizzes Completed',
      value: totalQuizzesCompleted.toLocaleString(),
      sub: 'Validated quiz submissions',
      icon: Zap,
      accent: 'from-purple-500/20 to-purple-500/5 border-purple-500/25',
      iconColor: 'text-purple-300 bg-purple-500/15 border-purple-500/30',
      valueColor: 'text-purple-300'
    },
    {
      label: 'Active Activities',
      value: activeActivities.toLocaleString(),
      sub: 'Live quizzes & offline booths',
      icon: Activity,
      accent: 'from-amber-500/20 to-amber-500/5 border-amber-500/25',
      iconColor: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
      valueColor: 'text-amber-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${c.accent} border p-5 transition-all hover:translate-y-[-1px] shadow-lg`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  {c.label}
                </span>
                <div className={`text-3xl font-black font-space tabular-nums mt-1.5 ${c.valueColor}`}>
                  {c.value}
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${c.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono mt-3 block">{c.sub}</span>
          </div>
        );
      })}
    </div>
  );
}
export default AdminStats;
