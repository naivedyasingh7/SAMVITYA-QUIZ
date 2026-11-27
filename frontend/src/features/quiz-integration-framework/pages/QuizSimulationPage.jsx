import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { quizService } from '../services/quizService.js';
import { questionBankService } from '../services/questionBankService.js';
import { Card } from '../../../shared/components/Card.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Trophy, AlertCircle, CheckCircle2, Check } from 'lucide-react';

export default function QuizSimulationPage() {
  const [searchParams] = useSearchParams();

  const participantId = searchParams.get('pid') || 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81';
  const [attemptId] = useState(() => searchParams.get('aid') || `att-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
  const activityId = searchParams.get('act') || 'act-quiz-tech-trivia';

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Jumble the 50-question bank and assign 10 random questions to this participant attempt
    const randomized = questionBankService.getRandomizedQuizQuestions(
      activityId,
      10,
      `${participantId}:${attemptId}`
    );
    setQuestions(randomized);
  }, [activityId, participantId, attemptId]);

  const handleSelectAnswer = (qId, optionIdx) => {
    if (submissionResult) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleAutoFillAnswers = (perfect = true) => {
    const answers = {};
    questions.forEach((q, idx) => {
      answers[q.id] = perfect ? q.correctIndex : (idx % 2 === 0 ? q.correctIndex : 0);
    });
    setSelectedAnswers(answers);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Calculate score against live question bank
    let earnedPoints = 0;
    let maxPossiblePoints = 0;
    let correctCount = 0;

    questions.forEach((q) => {
      const qPoints = Number(q.points) || 25;
      maxPossiblePoints += qPoints;
      if (selectedAnswers[q.id] === q.correctIndex) {
        earnedPoints += qPoints;
        correctCount += 1;
      }
    });

    if (maxPossiblePoints === 0) maxPossiblePoints = 100;

    const rawPayload = {
      attempt_id: attemptId,
      participant_id: participantId,
      activity_id: activityId,
      provider: 'native',
      external_result_id: `NAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      raw_score: earnedPoints,
      max_score: maxPossiblePoints,
      completion_status: 'completed',
      metadata: {
        correct_answers: correctCount,
        total_questions: questions.length,
        answered_count: Object.keys(selectedAnswers).length,
        engine: 'Native In-House Quiz Platform',
        submitted_at: new Date().toISOString()
      }
    };

    try {
      const response = await quizService.ingestResult(rawPayload, 'native');
      setSubmissionResult(response);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit quiz result');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-purple-600/20 text-purple-200 border border-purple-500/30">
              Online Quiz Centre
            </span>
            <span className="text-xs text-slate-400 font-mono">Attempt: {attemptId}</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1.5 tracking-tight">Technical Quiz Challenge (10 Random Questions)</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            10 randomized technical questions jumbled from the 50-question bank (10 points each). Instant automated grading into the live leaderboard.
          </p>
        </div>

        <Link
          to="/leaderboard"
          className="text-xs text-slate-300 hover:text-white font-medium px-3.5 py-1.5 border border-white/10 bg-white/[0.04] rounded-md hover:bg-white/[0.08] transition-colors flex items-center gap-1.5 w-fit"
        >
          <Trophy className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>View Leaderboard</span>
        </Link>
      </div>

      {/* Session Metadata Card */}
      <div className="glass-surface rounded-xl p-4 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <span className="text-slate-400 uppercase font-medium block text-[10px] tracking-wider">Participant Token</span>
          <span className="font-mono text-white truncate block mt-0.5" title={participantId}>
            {participantId}
          </span>
        </div>
        <div>
          <span className="text-slate-400 uppercase font-medium block text-[10px] tracking-wider">Activity Identifier</span>
          <span className="font-mono text-indigo-300 truncate block mt-0.5" title={activityId}>
            {activityId}
          </span>
        </div>
        <div>
          <span className="text-slate-400 uppercase font-medium block text-[10px] tracking-wider">Quiz Progress</span>
          <span className="text-emerald-300 font-mono tabular-nums block mt-0.5 font-semibold">
            {Object.keys(selectedAnswers).length} of {questions.length} Answered (100 Pts Max)
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-md text-rose-300 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 stroke-[1.75]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Completion View */}
      {submissionResult ? (
        <Card className="text-center py-12 space-y-6 border-emerald-500/30 bg-emerald-500/[0.02]">
          <div className="flex justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Quiz Completed</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Your answers have been graded and recorded directly into the verified immutable event ledger.
            </p>
          </div>

          <div className="inline-flex items-center gap-6 p-5 glass-surface rounded-xl">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Total Score</div>
              <div className="text-2xl font-bold text-slate-100 font-mono tabular-nums mt-0.5">
                {submissionResult.data.raw_score} / {submissionResult.data.max_score}
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Points Ledger</div>
              <div className="text-xl font-bold text-indigo-300 font-mono tabular-nums mt-0.5">
                +{submissionResult.scoring?.points || submissionResult.data.raw_score} pts
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <Link to="/leaderboard">
              <Button type="button" className="py-2.5 px-6 font-semibold">
                Check Live Rank on Leaderboard
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* Questions Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-slate-400">
              Select your answers:
            </span>
            <button
              type="button"
              onClick={() => handleAutoFillAnswers(true)}
              className="text-slate-400 hover:text-slate-200 transition-colors underline"
            >
              Autofill Correct Answers (Quick Test)
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="p-12 text-center glass-card border-dashed text-slate-400 text-xs">
              No questions found for this quiz. Admins can author questions in the Admin Quiz Manager.
            </div>
          ) : (
            questions.map((q, idx) => (
              <Card key={q.id} className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-md bg-white/[0.06] border border-white/10 text-slate-300">
                      Q{idx + 1}
                    </span>
                    <p className="text-xs font-semibold text-white leading-relaxed">{q.prompt}</p>
                  </div>
                  <span className="text-[10px] font-mono tabular-nums bg-white/[0.04] text-slate-300 px-2 py-0.5 rounded-md border border-white/10 shrink-0">
                    {q.points || 25} pts
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    return (
                      <label
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer text-xs transition-colors ${
                          isSelected
                            ? 'border-indigo-500/70 bg-indigo-500/10 text-white font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                            : 'border-white/[0.06] hover:border-white/15 text-slate-300 bg-white/[0.02] hover:bg-white/[0.04]'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={isSelected}
                          onChange={() => handleSelectAnswer(q.id, optIdx)}
                          className="text-indigo-500 focus:ring-indigo-400 accent-indigo-600"
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </Card>
            ))
          )}

          {questions.length > 0 && (
            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(selectedAnswers).length === 0}
              variant="emerald"
              className="w-full py-2.5 text-xs font-semibold"
            >
              <Check className="w-3.5 h-3.5 stroke-[2]" />
              <span>{isSubmitting ? 'Submitting & Grading Quiz...' : 'Submit Quiz Answers'}</span>
            </Button>
          )}
        </form>
      )}
    </div>
  );
}
