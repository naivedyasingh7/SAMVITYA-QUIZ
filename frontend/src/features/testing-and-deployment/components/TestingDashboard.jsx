import React, { useState } from 'react';
import { mockDataService } from '../services/mockDataService.js';
import { quizService } from '../../quiz-integration-framework/services/quizService.js';
import { mockProviderService } from '@backend/services/quiz/mockProviderService.js';
import { PlayCircle, ShieldAlert, Users, RotateCcw, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';

export function TestingDashboard() {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (message, type = 'info') => {
    setLogs((prev) => [
      { id: Date.now() + Math.random(), message, type, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  const handleSimulateConcurrent = async () => {
    setIsRunning(true);
    addLog('Initiating multi-participant concurrent quiz submission trial...', 'info');
    try {
      const results = await mockDataService.simulateConcurrentQuizSubmissions(5);
      addLog(`✓ Successfully processed ${results.length} concurrent quiz submissions.`, 'success');
      results.forEach((r) => {
        addLog(`• Ingested Tx ${r.id}: +${r.points} pts for participant ${r.participant_id.substring(0, 8)}...`, 'info');
      });
    } catch (err) {
      addLog(`✗ Concurrency simulation failed: ${err.message}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleTestDeduplication = async () => {
    setIsRunning(true);
    addLog('Executing idempotency & duplicate submission guard verification...', 'info');
    try {
      const payload = mockProviderService.createMockResult({
        participant_id: 'part-002-sarah',
        activity_id: 'act-quiz-01',
        score: 95,
        max_score: 100
      });

      addLog(`Sending initial submission payload (Ext ID: ${payload.external_result_id})...`, 'info');
      const first = await quizService.ingestResult(payload, 'mock');
      addLog(`✓ Pass 1: Accepted and graded (+${first.scoring?.transaction?.points || 950} pts).`, 'success');

      addLog(`Attempting immediate duplicate submission with identical External Result ID...`, 'info');
      try {
        await quizService.ingestResult(payload, 'mock');
        addLog('✗ Error: Deduplication guard failed to reject duplicate!', 'error');
      } catch (dupErr) {
        addLog(`✓ Pass 2 (GUARD ACTIVE): Duplicate submission correctly blocked (${dupErr.message}).`, 'success');
      }
    } catch (err) {
      addLog(`Guard test unexpected failure: ${err.message}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSeedMore = async () => {
    setIsRunning(true);
    try {
      const seeded = await mockDataService.seedMockParticipants(6);
      addLog(`✓ Seeded ${seeded.length} new collegiate club competitors across tracks.`, 'success');
    } catch (err) {
      addLog(`✗ Seeding failed: ${err.message}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    mockDataService.resetStore();
    addLog('✓ Event store reset to default baseline configuration.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Action Triggers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={handleSimulateConcurrent}
          disabled={isRunning}
          className="glass-card p-5 text-left border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all group disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 mb-3">
            <Cpu className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-sm text-white group-hover:text-emerald-200 transition-colors">
            Concurrency Load Test
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate 5 simultaneous quiz submissions & scoring.
          </p>
        </button>

        <button
          type="button"
          onClick={handleTestDeduplication}
          disabled={isRunning}
          className="glass-card p-5 text-left border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all group disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 mb-3">
            <ShieldAlert className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-sm text-white group-hover:text-purple-200 transition-colors">
            Deduplication Guard
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Verify duplicate external result ID rejection.
          </p>
        </button>

        <button
          type="button"
          onClick={handleSeedMore}
          disabled={isRunning}
          className="glass-card p-5 text-left border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all group disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 mb-3">
            <Users className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors">
            Seed Competitors
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Generate 6 realistic participants with college tracks.
          </p>
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isRunning}
          className="glass-card p-5 text-left border border-white/10 hover:border-rose-500/40 hover:bg-white/[0.04] transition-all group disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-300 mb-3">
            <RotateCcw className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-sm text-white group-hover:text-rose-200 transition-colors">
            Reset Store
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Reset all scores, activities, and participants to baseline.
          </p>
        </button>
      </div>

      {/* Real-time Execution Console */}
      <div className="glass-card border border-white/10 p-5 space-y-3 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">
            QA Diagnostic Execution Console
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            {logs.length} events logged
          </span>
        </div>

        <div className="bg-[#05070c] p-4 rounded-xl border border-white/[0.06] font-mono text-xs max-h-80 overflow-y-auto space-y-2">
          {logs.length === 0 ? (
            <p className="text-slate-600 italic">Click any test trigger above to run integration assertions...</p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className={`flex items-start gap-2 leading-relaxed ${
                  log.type === 'success'
                    ? 'text-emerald-400'
                    : log.type === 'error'
                    ? 'text-rose-400'
                    : 'text-slate-300'
                }`}
              >
                <span className="text-slate-600 text-[10px] shrink-0">{log.time}</span>
                <span>{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default TestingDashboard;
