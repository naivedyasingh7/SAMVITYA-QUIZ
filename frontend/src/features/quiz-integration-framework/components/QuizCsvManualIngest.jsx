import React, { useState, useEffect } from 'react';
import { eventStore } from '../../../shared/services/eventStore.js';
import { Card } from '../../../shared/components/Card.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { 
  Upload, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Database, 
  FileSpreadsheet, 
  Sparkles, 
  ArrowRight, 
  X,
  History
} from 'lucide-react';

export function QuizCsvManualIngest() {
  const [participants, setParticipants] = useState([]);
  const [quizActivities, setQuizActivities] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  
  // Single Manual Form State
  const [selectedParticipantId, setSelectedParticipantId] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [manualScore, setManualScore] = useState(80);
  const [manualReason, setManualReason] = useState('Online quiz: Completed score');
  
  // CSV Import State
  const [csvText, setCsvText] = useState(`username,score,activity
P001,80,Online Tech Trivia
P002,65,Online Tech Trivia
P003,90,Algorithmic Duel`);
  const [parsedRows, setParsedRows] = useState([]);
  const [csvError, setCsvError] = useState(null);
  
  // Notifications
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = () => {
    const parts = eventStore.getParticipants();
    const acts = eventStore.getActivities().filter(a => a.type === 'quiz');
    const txs = eventStore.getTransactions({ type: 'quiz_award' }).slice(0, 15);
    
    setParticipants(parts);
    setQuizActivities(acts);
    setRecentTransactions(txs);
    
    if (parts.length > 0 && !selectedParticipantId) {
      setSelectedParticipantId(parts[0].id);
    }
    if (acts.length > 0 && !selectedActivityId) {
      setSelectedActivityId(acts[0].id);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = eventStore.subscribe(loadData);
    return unsubscribe;
  }, []);

  // Parse CSV Preview
  const handleParseCsv = () => {
    setCsvError(null);
    setParsedRows([]);
    try {
      if (!csvText.trim()) {
        setCsvError('Please paste CSV text or select a file.');
        return;
      }

      const lines = csvText.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (lines.length <= 1) {
        setCsvError('CSV must have a header row and at least one data row.');
        return;
      }

      const header = lines[0].toLowerCase().split(',').map(h => h.trim());
      const uIndex = header.indexOf('username');
      const sIndex = header.indexOf('score');
      const rIndex = header.indexOf('activity') !== -1 ? header.indexOf('activity') : header.indexOf('reason');

      if (uIndex === -1 || sIndex === -1) {
        setCsvError('CSV header must include at least "username" and "score" columns.');
        return;
      }

      const rows = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim());
        if (parts.length < 2) continue;

        const rawUsername = parts[uIndex] || '';
        const rawScore = Number(parts[sIndex]);
        const rawActivity = rIndex !== -1 ? parts[rIndex] : 'External Quiz Import';

        const matchedParticipant = eventStore.getParticipantById(rawUsername);
        const isValid = Boolean(matchedParticipant) && !isNaN(rawScore) && rawScore >= 0;

        rows.push({
          rowNum: i,
          rawUsername,
          score: isNaN(rawScore) ? 0 : rawScore,
          activity: rawActivity || 'Online Quiz',
          matchedParticipant,
          isValid,
          error: !matchedParticipant ? 'Username not found' : isNaN(rawScore) ? 'Invalid score number' : null
        });
      }

      setParsedRows(rows);
    } catch (err) {
      setCsvError(err.message || 'Failed to parse CSV');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setCsvText(evt.target.result || '');
    };
    reader.readAsText(file);
  };

  const handleImportCsvRecords = async () => {
    const validRows = parsedRows.filter(r => r.isValid);
    if (validRows.length === 0) {
      setNotification({ type: 'error', message: 'No valid records to import.' });
      return;
    }

    setIsSubmitting(true);
    let count = 0;
    try {
      for (const row of validRows) {
        eventStore.recordTransaction({
          participant_id: row.matchedParticipant.id,
          activity_id: selectedActivityId || 'act-quiz-trivia',
          points: row.score,
          transaction_type: 'quiz_award',
          reason: `CSV Import: ${row.activity} (${row.score} pts)`,
          admin_id: 'admin-csv-import'
        });
        count++;
      }

      setNotification({
        type: 'success',
        message: `Successfully imported ${count} quiz scores! Participant tables and leaderboard updated.`
      });
      setParsedRows([]);
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'CSV Import failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!selectedParticipantId) {
      setNotification({ type: 'error', message: 'Please select a participant.' });
      return;
    }
    const scoreVal = Number(manualScore);
    if (isNaN(scoreVal) || scoreVal < 0) {
      setNotification({ type: 'error', message: 'Score must be a positive number.' });
      return;
    }

    try {
      const participant = eventStore.getParticipantById(selectedParticipantId);
      const activity = quizActivities.find(a => a.id === selectedActivityId);
      const actTitle = activity ? activity.title : 'Online Quiz';

      eventStore.recordTransaction({
        participant_id: participant ? participant.id : selectedParticipantId,
        activity_id: selectedActivityId,
        points: scoreVal,
        transaction_type: 'quiz_award',
        reason: manualReason.trim() || `Quiz score: ${actTitle} (${scoreVal} pts)`,
        admin_id: 'admin-manual'
      });

      setNotification({
        type: 'success',
        message: `Awarded ${scoreVal} quiz points to ${participant?.username || selectedParticipantId} (${participant?.full_name})!`
      });
      setManualScore(80);
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Manual entry failed' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-medium border flex items-center justify-between transition-colors ${
            notification.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 stroke-[1.75]" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2]" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Grid: Manual Award on Left, CSV Batch on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Manual Award (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card title="Direct Manual Quiz Score Award">
            <p className="text-xs text-slate-400 mb-4">
              Enter verified scores from external forms, Kahoot, or offline quiz answer sheets.
            </p>

            <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Target Participant *
                </label>
                <select
                  value={selectedParticipantId}
                  onChange={(e) => setSelectedParticipantId(e.target.value)}
                  className="glass-input w-full px-3 py-2 text-xs text-white bg-slate-900"
                >
                  {participants.map((p) => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                      {p.username || p.participant_code} — {p.full_name} ({p.organization || 'Guild'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Quiz Activity
                </label>
                <select
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                  className="glass-input w-full px-3 py-2 text-xs text-white bg-slate-900"
                >
                  {quizActivities.map((a) => (
                    <option key={a.id} value={a.id} className="bg-slate-900 text-white">
                      {a.title} (Max: {a.max_points} pts)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Quiz Score (Points) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  required
                  value={manualScore}
                  onChange={(e) => setManualScore(e.target.value)}
                  className="glass-input w-full px-3 py-2 text-xs font-mono"
                  placeholder="e.g. 80"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Audit Note / Remarks
                </label>
                <input
                  type="text"
                  value={manualReason}
                  onChange={(e) => setManualReason(e.target.value)}
                  className="glass-input w-full px-3 py-2 text-xs"
                  placeholder="e.g. Online quiz: Algorithmic round score"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Credit Quiz Score to Participant</span>
              </Button>
            </form>
          </Card>
        </div>

        {/* Bulk CSV Ingestion (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card title="Bulk CSV Quiz Ingestion">
            <p className="text-xs text-slate-400 mb-3">
              Import batch scores from Google Forms exports or spreadsheet CSVs. Auto-matches unique username (<code className="text-purple-300">P001, P002...</code>).
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  Format: username,score,activity
                </span>
                <label className="cursor-pointer text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>Upload .CSV File</span>
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                rows={5}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder="username,score,activity&#10;P001,80,Tech Trivia&#10;P002,65,Tech Trivia"
                className="glass-input w-full p-2.5 text-xs font-mono"
              />

              {csvError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{csvError}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleParseCsv}
                  className="py-2 text-xs flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Parse & Preview CSV</span>
                </Button>

                {parsedRows.length > 0 && (
                  <Button
                    type="button"
                    disabled={isSubmitting || parsedRows.filter(r => r.isValid).length === 0}
                    onClick={handleImportCsvRecords}
                    className="py-2 text-xs flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>
                      {isSubmitting ? 'Ingesting...' : `Confirm Import (${parsedRows.filter(r => r.isValid).length} Records)`}
                    </span>
                  </Button>
                )}
              </div>

              {/* Preview Table */}
              {parsedRows.length > 0 && (
                <div className="mt-4 border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-2.5 bg-white/[0.04] border-b border-white/[0.08] flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">Parsed Preview</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {parsedRows.filter(r => r.isValid).length} valid / {parsedRows.length} total
                    </span>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/60 text-slate-400 text-[10px] uppercase font-mono border-b border-white/[0.06]">
                        <tr>
                          <th className="py-2 px-3">Username</th>
                          <th className="py-2 px-3">Participant Match</th>
                          <th className="py-2 px-3">Quiz Score</th>
                          <th className="py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {parsedRows.map((row) => (
                          <tr key={row.rowNum} className="hover:bg-white/[0.02]">
                            <td className="py-2 px-3 font-mono font-bold text-white">{row.rawUsername}</td>
                            <td className="py-2 px-3 text-slate-300">
                              {row.matchedParticipant ? row.matchedParticipant.full_name : (
                                <span className="text-rose-400 italic">Not found</span>
                              )}
                            </td>
                            <td className="py-2 px-3 font-mono text-indigo-300 font-semibold">{row.score} pts</td>
                            <td className="py-2 px-3">
                              {row.isValid ? (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                  Valid
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                                  {row.error}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Audit Log: Recent Quiz Ingestion Ledger */}
      <Card title="Recent Quiz Points Ledger">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-slate-400">
            Real-time audit log of all online quiz points credited into the database.
          </span>
          <span className="text-purple-300 font-mono text-[11px]">
            {recentTransactions.length} recorded
          </span>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No quiz awards recorded yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/60 text-slate-400 text-[10px] uppercase font-mono border-b border-white/[0.06]">
                <tr>
                  <th className="py-2.5 px-4">Timestamp</th>
                  <th className="py-2.5 px-4">Participant</th>
                  <th className="py-2.5 px-4">Quiz Score</th>
                  <th className="py-2.5 px-4">Activity / Reason</th>
                  <th className="py-2.5 px-4">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentTransactions.map((tx) => {
                  const part = eventStore.getParticipantById(tx.participant_id);
                  return (
                    <tr key={tx.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-4 font-mono text-slate-400 text-[11px]">
                        {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-white">
                        {part?.username || 'P000'} <span className="text-slate-400 font-normal">({part?.full_name || 'Competitor'})</span>
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-indigo-300">
                        +{tx.points} pts
                      </td>
                      <td className="py-2.5 px-4 text-slate-300">
                        {tx.reason}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/10 text-slate-300">
                          {tx.admin_id}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
