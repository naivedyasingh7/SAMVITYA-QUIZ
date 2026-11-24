import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Trophy, Zap, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { calculatePoints } from '../../features/automatic-scoring/utils/calculatePoints.js';

export function QuizSimulatorModal({ isOpen, onClose, activity, participant, onPointsAwarded }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);

  if (!isOpen) return null;

  // Sample interactive question (Easy technical question)
  const sampleQuestion = {
    title: activity?.title || 'Online Quiz Centre • Tech Challenge',
    prompt: 'What does HTML stand for in web development?',
    options: [
      { id: 'A', text: 'HyperText Markup Language', correct: true },
      { id: 'B', text: 'High Tech Modern Language', correct: false },
      { id: 'C', text: 'Hyper Transfer Markup Logic', correct: false },
      { id: 'D', text: 'Home Tool Management Layout', correct: false }
    ],
    maxPoints: activity?.max_points || 100
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = sampleQuestion.options[selectedOption].correct;
    const rawScore = isCorrect ? 9400 : 2500;
    const maxScore = 10000;
    // Uses Divya's Person 4 automatic scoring engine calculation!
    const pointsAwarded = calculatePoints(rawScore, maxScore, sampleQuestion.maxPoints);

    const simulationResult = {
      attempt_id: `att-sim-${Date.now()}`,
      participant_id: participant?.id || 'demo-user-uuid',
      participant_code: participant?.participant_code || 'EVT26-DEMO',
      external_result_id: `MOCK-RESULT-${Date.now()}`,
      raw_score: rawScore,
      max_score: maxScore,
      points_awarded: pointsAwarded,
      isCorrect,
      timestamp: new Date().toISOString()
    };

    setResultData(simulationResult);
    setIsSubmitted(true);
    onPointsAwarded?.(pointsAwarded, simulationResult);

    if (isCorrect) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setResultData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#090913] border border-white/10 p-6 sm:p-8 shadow-[0_0_60px_rgba(236,72,153,0.25)] overflow-hidden">
        {/* Tech Corner Accents */}
        <div className="tech-corner-tl border-pink-400"></div>
        <div className="tech-corner-tr border-purple-400"></div>
        <div className="tech-corner-bl border-purple-400"></div>
        <div className="tech-corner-br border-pink-400"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                  Person 3 (Ashwin) • Quiz Simulator
                </span>
                <span className="text-gray-400 font-mono text-xs">
                  Max: <strong className="text-white">{sampleQuestion.maxPoints} pts</strong>
                </span>
              </div>
              <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">
                {sampleQuestion.title}
              </h3>
              <p className="text-sm text-gray-300 mt-3 font-medium bg-white/[0.03] p-4 rounded-xl border border-white/5">
                {sampleQuestion.prompt}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5 mb-6">
              {sampleQuestion.options.map((opt, idx) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${
                    selectedOption === idx
                      ? 'bg-purple-600/20 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'bg-white/[0.02] border-white/10 text-gray-300 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center flex-shrink-0 font-bold ${
                      selectedOption === idx ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="leading-snug pt-0.5">{opt.text}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleAnswerSubmit}
              disabled={selectedOption === null}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-sans font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all shadow-lg shadow-purple-600/25"
            >
              Submit Answer & Trigger Scoring Engine
            </button>
          </div>
        ) : (
          <div className="text-center py-2 animate-in zoom-in-95 duration-200">
            <div
              className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3 ${
                resultData.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {resultData.isCorrect ? <CheckCircle className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">
              {resultData.isCorrect ? 'Correct! Quiz Completed' : 'Completed with Partial Score'}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Result ingested by Person 3 adapter & verified by Person 4 scoring engine.
            </p>

            {/* Score Metric Card */}
            <div className="grid grid-cols-2 gap-3 my-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-center border-r border-white/10">
                <span className="text-[11px] font-mono uppercase text-gray-400 tracking-wider">Raw Score</span>
                <p className="text-2xl font-black text-white mt-0.5">
                  {resultData.raw_score} <span className="text-xs font-normal text-gray-500">/ 10,000</span>
                </p>
              </div>
              <div className="text-center">
                <span className="text-[11px] font-mono uppercase text-pink-400 tracking-wider">Event Points</span>
                <p className="text-2xl font-black text-pink-400 mt-0.5">
                  +{resultData.points_awarded} <span className="text-xs font-normal text-pink-300/70">PTS</span>
                </p>
              </div>
            </div>

            {/* Transaction Ledger Verification */}
            <div className="text-left bg-black/40 p-3.5 rounded-lg border border-white/5 font-mono text-[11px] space-y-1 mb-5">
              <div className="text-purple-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>POINTS TRANSACTION COMMITTED TO LEDGER</span>
              </div>
              <div className="text-gray-400">External ID: <span className="text-gray-200">{resultData.external_result_id}</span></div>
              <div className="text-gray-400">Participant: <span className="text-gray-200">{resultData.participant_code}</span></div>
              <div className="text-gray-400">Rule: <span className="text-gray-200">Linear percentage conversion ({resultData.raw_score}/10,000 * {sampleQuestion.maxPoints})</span></div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={resetQuiz}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Try Another
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all"
              >
                View Updated Leaderboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
