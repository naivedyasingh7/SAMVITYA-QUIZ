import React from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard.js';

/**
 * Highlighted rank card for displaying a competitor's live rank and cumulative score.
 * Can be provided with direct rank & points props, or dynamically lookup a participant.
 *
 * @param {Object} props
 * @param {number} [props.rank] - Direct rank number
 * @param {number} [props.points] - Direct total points
 * @param {string} [props.participantId] - Participant UUID to resolve
 * @param {string} [props.participantCode] - Participant code (e.g. EVT26-P0102 / P001)
 */
export function RankCard({ rank, points, participantId, participantCode }) {
  const { entries } = useLeaderboard();

  let displayRank = rank;
  let displayPoints = points;

  if (participantId || participantCode) {
    const matched = entries.find(
      (e) =>
        (participantId && e.participant_id === participantId) ||
        (participantCode && (e.participant_code === participantCode || e.username === participantCode))
    );
    if (matched) {
      displayRank = matched.rank;
      displayPoints = matched.total_points;
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 backdrop-blur-md text-white p-5 rounded-2xl flex justify-between items-center border border-purple-500/20 shadow-xl">
      <div>
        <span className="text-purple-300 text-[10px] font-mono uppercase tracking-widest font-bold">
          Your Live Standing
        </span>
        <h4 className="text-3xl font-black font-space tracking-tight text-white mt-0.5">
          {displayRank ? `#${displayRank}` : 'Unranked'}
        </h4>
      </div>
      <div className="text-right">
        <span className="text-purple-300 text-[10px] font-mono uppercase tracking-widest font-bold">
          Verified Points
        </span>
        <p className="text-3xl font-black font-mono text-emerald-400 mt-0.5">
          {displayPoints ?? 0}
        </p>
      </div>
    </div>
  );
}

export default RankCard;
