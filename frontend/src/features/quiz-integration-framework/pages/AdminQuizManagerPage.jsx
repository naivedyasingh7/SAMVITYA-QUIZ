import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questionBankService } from '../services/questionBankService.js';
import { Card } from '../../../shared/components/Card.jsx';
import { Button } from '../../../shared/components/Button.jsx';
import { Play, Plus, Check, Edit3, Trash2, X, FileText, RotateCcw, AlertCircle } from 'lucide-react';

export default function AdminQuizManagerPage() {
  const [activities] = useState(questionBankService.getActivities());
  const [selectedActivity, setSelectedActivity] = useState(activities[0]?.id || 'act-quiz-tech-trivia');
  const [questions, setQuestions] = useState([]);

  // Form State for creating/editing a question
  const [prompt, setPrompt] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [points, setPoints] = useState(25);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const loadQuestions = () => {
    const list = questionBankService.getQuestions(selectedActivity);
    setQuestions(list);
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedActivity]);

  const resetForm = () => {
    setPrompt('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectIndex(0);
    setPoints(25);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || !optionA.trim() || !optionB.trim()) {
      setNotification({ type: 'error', message: 'Question prompt and at least Options A & B are required.' });
      return;
    }

    const options = [optionA.trim(), optionB.trim()];
    if (optionC.trim()) options.push(optionC.trim());
    if (optionD.trim()) options.push(optionD.trim());

    if (correctIndex >= options.length) {
      setNotification({ type: 'error', message: 'Selected correct answer option does not exist.' });
      return;
    }

    try {
      if (editingId) {
        questionBankService.updateQuestion(editingId, {
          prompt: prompt.trim(),
          options,
          correctIndex,
          points: Number(points)
        });
        setNotification({ type: 'success', message: 'Question updated successfully.' });
      } else {
        questionBankService.addQuestion({
          activityId: selectedActivity,
          prompt: prompt.trim(),
          options,
          correctIndex,
          points: Number(points)
        });
        setNotification({ type: 'success', message: 'New question created and added to the quiz.' });
      }

      resetForm();
      loadQuestions();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Operation failed' });
    }
  };

  const handleEdit = (q) => {
    setEditingId(q.id);
    setPrompt(q.prompt);
    setOptionA(q.options[0] || '');
    setOptionB(q.options[1] || '');
    setOptionC(q.options[2] || '');
    setOptionD(q.options[3] || '');
    setCorrectIndex(q.correctIndex || 0);
    setPoints(q.points || 25);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      questionBankService.deleteQuestion(id);
      loadQuestions();
      setNotification({ type: 'success', message: 'Question deleted.' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all questions to default sample questions?')) {
      questionBankService.resetToDefault();
      loadQuestions();
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-md bg-white/[0.06] text-slate-300 border border-white/10">
              Admin Access Active
            </span>
            <span className="text-xs text-slate-400 font-medium">Native Quiz Engine</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1.5 tracking-tight">Quiz Question & Answer Manager</h1>
          <p className="text-xs text-slate-400">
            Create, edit, and curate native questions in real time. Participants are blocked from accessing this page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/quiz-session"
            className="px-3.5 py-2 text-xs font-medium bg-white/[0.05] hover:bg-white/[0.09] text-white rounded-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Test Quiz as Participant</span>
          </Link>
        </div>
      </div>

      {/* Activity Filter & Stats Bar */}
      <div className="glass-surface p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">
            Quiz Activity
          </label>
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="glass-input text-xs px-3 py-1.5 text-white font-medium bg-slate-900/90 outline-none"
          >
            {activities.map((act) => (
              <option key={act.id} value={act.id} className="bg-slate-900 text-white">
                {act.title} ({act.id})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <div>
            <span className="text-slate-400">Questions: </span>
            <span className="font-mono font-medium text-white tabular-nums">{questions.length}</span>
          </div>
          <div>
            <span className="text-slate-400">Total Points: </span>
            <span className="font-mono font-medium text-indigo-300 tabular-nums">{totalPoints} pts</span>
          </div>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3 stroke-[1.75]" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-3.5 rounded-md text-xs font-medium border flex items-center justify-between transition-colors ${
            notification.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 stroke-[1.75]" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2]" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="ml-4 text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      )}

      {/* Main Grid: Form on Left (5 cols), Question List on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Form */}
        <div className="lg:col-span-5 space-y-6">
          <Card title={editingId ? 'Edit Quiz Question' : 'Add New Question & Answers'}>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                  Question Prompt *
                </label>
                <textarea
                  required
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Which data structure operates on a FIFO basis?"
                  className="glass-input w-full px-3 py-2 text-xs"
                />
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block font-medium text-slate-300 uppercase tracking-wider text-[11px]">
                    Answer Options
                  </label>
                  <span className="text-[10px] text-slate-400">Select correct option radio</span>
                </div>

                {/* Option A */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct-answer"
                    checked={correctIndex === 0}
                    onChange={() => setCorrectIndex(0)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    required
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="Option A (Required)"
                    className={`glass-input flex-1 px-3 py-1.5 text-xs ${
                      correctIndex === 0 ? 'border-emerald-500/50 bg-emerald-500/[0.06]' : ''
                    }`}
                  />
                  {correctIndex === 0 && (
                    <span className="text-[10px] text-emerald-400 font-mono font-medium shrink-0">CORRECT</span>
                  )}
                </div>

                {/* Option B */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct-answer"
                    checked={correctIndex === 1}
                    onChange={() => setCorrectIndex(1)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    required
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="Option B (Required)"
                    className={`glass-input flex-1 px-3 py-1.5 text-xs ${
                      correctIndex === 1 ? 'border-emerald-500/50 bg-emerald-500/[0.06]' : ''
                    }`}
                  />
                  {correctIndex === 1 && (
                    <span className="text-[10px] text-emerald-400 font-mono font-medium shrink-0">CORRECT</span>
                  )}
                </div>

                {/* Option C */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct-answer"
                    checked={correctIndex === 2}
                    onChange={() => setCorrectIndex(2)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    placeholder="Option C (Optional)"
                    className={`glass-input flex-1 px-3 py-1.5 text-xs ${
                      correctIndex === 2 ? 'border-emerald-500/50 bg-emerald-500/[0.06]' : ''
                    }`}
                  />
                  {correctIndex === 2 && (
                    <span className="text-[10px] text-emerald-400 font-mono font-medium shrink-0">CORRECT</span>
                  )}
                </div>

                {/* Option D */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct-answer"
                    checked={correctIndex === 3}
                    onChange={() => setCorrectIndex(3)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    placeholder="Option D (Optional)"
                    className={`glass-input flex-1 px-3 py-1.5 text-xs ${
                      correctIndex === 3 ? 'border-emerald-500/50 bg-emerald-500/[0.06]' : ''
                    }`}
                  />
                  {correctIndex === 3 && (
                    <span className="text-[10px] text-emerald-400 font-mono font-medium shrink-0">CORRECT</span>
                  )}
                </div>
              </div>

              {/* Points */}
              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Points Value
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="glass-input w-full px-3 py-1.5 font-mono tabular-nums text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold"
                >
                  {editingId ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2]" />
                      <span>Save Changes</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 stroke-[2]" />
                      <span>Add Question</span>
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={resetForm}
                    className="py-2 text-xs"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>

        {/* Questions List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Question Bank ({questions.length})
            </h3>
            <span className="text-[11px] text-slate-400">Live participant content</span>
          </div>

          {questions.length === 0 ? (
            <div className="p-12 text-center glass-card border-dashed">
              <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2 stroke-[1.5]" />
              <p className="text-xs font-medium text-slate-300">No questions in this quiz yet</p>
              <p className="text-xs text-slate-500 mt-1">Author questions using the form on the left.</p>
            </div>
          ) : (
            questions.map((q, idx) => (
              <div
                key={q.id}
                className="glass-card glass-card-hover p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-slate-300 text-[11px] font-mono font-medium">
                      #{idx + 1}
                    </span>
                    <h4 className="text-xs font-semibold text-white leading-relaxed">{q.prompt}</h4>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/10 text-[10px] font-mono tabular-nums">
                      {q.points || 25} pts
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEdit(q)}
                      className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded transition-colors inline-flex items-center gap-1"
                      title="Edit question"
                    >
                      <Edit3 className="w-3 h-3 stroke-[1.75]" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(q.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 px-1.5 py-0.5 rounded transition-colors inline-flex items-center gap-1"
                      title="Delete question"
                    >
                      <Trash2 className="w-3 h-3 stroke-[1.75]" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-md border flex items-center justify-between transition-colors ${
                          isCorrect
                            ? 'bg-emerald-500/[0.08] border-emerald-500/30 text-emerald-200 font-medium'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-slate-500 text-[11px]">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="truncate">{opt}</span>
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] text-emerald-400 font-mono font-medium uppercase tracking-wider shrink-0 ml-2 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 stroke-[2]" />
                            <span>Correct</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
