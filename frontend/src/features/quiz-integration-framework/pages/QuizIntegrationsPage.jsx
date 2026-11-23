import React, { useState } from 'react';
import { useQuizIntegration } from '../hooks/useQuizIntegration.js';
import { ProviderSelector } from '../components/ProviderSelector.jsx';
import { QuizLinkForm } from '../components/QuizLinkForm.jsx';
import { QuizStatus } from '../components/QuizStatus.jsx';
import { ImportHistory } from '../components/ImportHistory.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { AlertCircle, Check, X, Play } from 'lucide-react';

export default function QuizIntegrationsPage() {
  const {
    activeAttempt,
    selectedProvider,
    setSelectedProvider,
    providers,
    history,
    isLoading,
    error,
    lastIngestion,
    generateLaunchLink,
    simulateMockCompletion,
    refreshHistory,
    clearError
  } = useQuizIntegration();

  // Simulation controls state
  const [simScore, setSimScore] = useState(85);
  const [simMaxScore, setSimMaxScore] = useState(100);
  const [simNotification, setSimNotification] = useState(null);

  const handleSimulate = async () => {
    try {
      setSimNotification(null);
      const res = await simulateMockCompletion({
        participantId: activeAttempt?.participant_id || 'e4b52c08-0bf4-4f0f-8c38-89c89895ff81',
        activityId: activeAttempt?.activity_id || 'act-quiz-tech-trivia',
        attemptId: activeAttempt?.attempt_id,
        score: Number(simScore),
        maxScore: Number(simMaxScore)
      });
      setSimNotification({
        type: 'success',
        message: `Successfully ingested result: ${res.data.external_result_id} (${res.data.raw_score}/${res.data.max_score} pts)`
      });
    } catch (err) {
      setSimNotification({
        type: 'error',
        message: err.message || 'Simulation failed'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider rounded-md bg-white/[0.06] text-slate-300 border border-white/10">
              Phase 3 • Native Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Branch: feature/quiz-integration-framework</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1.5 tracking-tight">Quiz Integration Framework</h1>
          <p className="text-xs text-slate-400">
            Session token generator, native quiz launcher, and normalized scoring verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Total Ingested</div>
            <div className="text-xl font-bold text-indigo-300 font-mono tabular-nums">{history.length}</div>
          </div>
        </div>
      </div>

      {/* Error or Alert banner */}
      {(error || simNotification) && (
        <div
          className={`p-3.5 rounded-md border flex items-center justify-between text-xs font-medium ${
            (error || simNotification?.type === 'error')
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {(error || simNotification?.type === 'error') ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 stroke-[1.75]" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2]" />
            )}
            <span>{error || simNotification?.message}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              clearError();
              setSimNotification(null);
            }}
            className="text-slate-400 hover:text-white p-0.5 ml-4 rounded transition-colors"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Launch & Provider Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card title="1. Select Platform Engine">
            <ProviderSelector
              selected={selectedProvider}
              onSelect={setSelectedProvider}
              providers={providers}
            />
          </Card>

          <Card title="2. Quiz Launch & Session Tracking">
            <QuizLinkForm
              onGenerate={generateLaunchLink}
              activeAttempt={activeAttempt}
              isLoading={isLoading}
            />
          </Card>

          <Card title="3. Live Attempt Session State">
            <QuizStatus attempt={activeAttempt} />
          </Card>
        </div>

        {/* Right Column: Ingestion Simulator & Audit Log (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card title="Quiz Scoring Simulator (Ingestion Test)">
            <p className="text-xs text-slate-400 mb-4">
              Simulate scoring callbacks to verify normalization, database persistence, and point calculations.
            </p>

            <div className="p-4 glass-card space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">
                    Raw Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={simMaxScore}
                    value={simScore}
                    onChange={(e) => setSimScore(e.target.value)}
                    className="glass-input w-full px-3 py-1.5 text-xs font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">
                    Max Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={simMaxScore}
                    onChange={(e) => setSimMaxScore(e.target.value)}
                    className="glass-input w-full px-3 py-1.5 text-xs font-mono tabular-nums"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Score percentage</span>
                  <span className="font-mono tabular-nums text-white">
                    {Math.round((Number(simScore) / Number(simMaxScore || 1)) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={simMaxScore}
                  value={simScore}
                  onChange={(e) => setSimScore(e.target.value)}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  type="button"
                  onClick={handleSimulate}
                  disabled={isLoading}
                  className="w-full py-2 text-xs"
                >
                  <Play className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>{isLoading ? 'Ingesting Result...' : 'Simulate Quiz Ingestion'}</span>
                </Button>
              </div>
            </div>

            {lastIngestion && (
              <div className="mt-4 p-3 glass-card text-xs space-y-1.5">
                <div className="flex items-center justify-between text-white font-medium">
                  <span>Normalized Payload Hand-Off</span>
                  <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-md font-mono">
                    VALIDATED
                  </span>
                </div>
                <pre className="text-[11px] font-mono bg-black/40 p-2.5 rounded-md border border-white/[0.06] overflow-x-auto text-slate-300">
                  {JSON.stringify(lastIngestion.data, null, 2)}
                </pre>
              </div>
            )}
          </Card>

          <Card title="Ingestion History & Audit Log">
            <ImportHistory
              imports={history}
              onRefresh={refreshHistory}
              isLoading={isLoading}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
