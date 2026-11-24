import React from 'react';
import { PlayCircle, Award, Clock, ArrowRight, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ActivityCard({ activity, participantId, onStart }) {
  const navigate = useNavigate();
  if (!activity) return null;

  const isQuiz = activity.type === 'quiz';

  const handleLaunch = () => {
    if (onStart) {
      onStart(activity);
    } else if (isQuiz) {
      navigate(`/quiz-simulation?act=${activity.id}&pid=${participantId || 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81'}`);
    }
  };

  return (
    <div className="glass-card p-5 flex flex-col justify-between hover:border-purple-500/40 hover:bg-white/[0.04] transition-all group duration-200 relative overflow-hidden">
      {/* Glow on hover */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition-all pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold border ${
              isQuiz
                ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
            }`}
          >
            {isQuiz ? <Zap className="w-3 h-3" /> : <Target className="w-3 h-3" />}
            <span>{isQuiz ? 'Online Quiz' : 'Offline Challenge'}</span>
          </span>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
            <Award className="w-3 h-3" />
            <span>+{activity.max_points} pts</span>
          </div>
        </div>

        <h4 className="font-bold text-base text-white tracking-tight group-hover:text-purple-200 transition-colors">
          {activity.title}
        </h4>
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {activity.description || 'Compete and earn club championship points.'}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>{activity.is_active ? 'Live Now' : 'Closed'}</span>
        </span>

        {isQuiz ? (
          <button
            type="button"
            onClick={handleLaunch}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <PlayCircle className="w-3.5 h-3.5 stroke-[2]" />
            <span>Enter Quiz</span>
          </button>
        ) : (
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            Booth Check-in
          </span>
        )}
      </div>
    </div>
  );
}
export default ActivityCard;
