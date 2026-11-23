import React, { useState } from 'react';
import { Button } from '../../../shared/components/Button.jsx';
import { ExternalLink, Copy, Check } from 'lucide-react';

export function QuizLinkForm({ onGenerate, activeAttempt, isLoading }) {
  const [participantId, setParticipantId] = useState('e4b52c08-0bf4-4f0f-8c38-89c89895ff81');
  const [activityId, setActivityId] = useState('act-quiz-tech-trivia');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!participantId.trim() || !activityId.trim()) return;
    onGenerate({ participantId: participantId.trim(), activityId: activityId.trim() });
  };

  const handleCopy = () => {
    if (activeAttempt?.launch_url) {
      navigator.clipboard?.writeText(activeAttempt.launch_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fillDemoValues = () => {
    setParticipantId(`part-${Math.random().toString(36).substring(2, 9)}`);
    setActivityId(`act-trivia-${Math.floor(Math.random() * 100)}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider">
              Participant UUID / Code
            </label>
            <button
              type="button"
              onClick={fillDemoValues}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Generate Random ID
            </button>
          </div>
          <input
            type="text"
            required
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            placeholder="e.g. e4b52c08-0bf4-4f0f-8c38-89c89895ff81"
            className="glass-input w-full px-3 py-1.5 text-xs font-mono"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider mb-1">
            Activity Identifier (Activity UUID)
          </label>
          <input
            type="text"
            required
            value={activityId}
            onChange={(e) => setActivityId(e.target.value)}
            placeholder="e.g. act-quiz-tech-trivia"
            className="glass-input w-full px-3 py-1.5 text-xs font-mono"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-xs font-medium"
        >
          {isLoading ? 'Generating Tracked Session...' : 'Generate Tracked Quiz Launch Link'}
        </Button>
      </form>

      {activeAttempt && activeAttempt.launch_url && (
        <div className="p-3.5 glass-card space-y-2.5 mt-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-300">
              Generated Launch Session
            </span>
            <span className="text-[10px] bg-white/[0.06] border border-white/10 text-indigo-300 font-mono px-2 py-0.5 rounded-md">
              {activeAttempt.attempt_id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={activeAttempt.launch_url}
              className="glass-input w-full px-2.5 py-1 text-xs font-mono select-all truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-xs font-medium rounded-md text-slate-200 shrink-0 transition-colors inline-flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400 stroke-[2]" /> : <Copy className="w-3 h-3 stroke-[1.75]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <a
              href={activeAttempt.launch_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-md shrink-0 transition-colors inline-flex items-center gap-1"
            >
              <span>Open Quiz</span>
              <ExternalLink className="w-3 h-3 stroke-[1.75]" />
            </a>
          </div>

          <p className="text-[11px] text-slate-400 leading-normal">
            Security tokens (<code className="font-mono text-indigo-300">pid</code>, <code className="font-mono text-indigo-300">aid</code>) map the participant when scores are reported.
          </p>
        </div>
      )}
    </div>
  );
}
