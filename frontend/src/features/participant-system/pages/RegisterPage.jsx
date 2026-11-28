import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth.js';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Users, AlertCircle, Lock } from 'lucide-react';

export default function RegisterPage() {
  const [tab, setTab] = useState('team'); // 'team' | 'login' | 'register'

  // Team login form state (common user/pass for all participants of a team)
  const [teamUsername, setTeamUsername] = useState('');
  const [teamPassword, setTeamPassword] = useState('');

  // Individual login form state
  const [codeOrEmail, setCodeOrEmail] = useState('P001');

  // Registration form state
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [organization, setOrganization] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { loginTeam, loginParticipant, registerParticipant } = useAuth();
  const navigate = useNavigate();

  const handleTeamLoginSubmit = async (e) => {
    e?.preventDefault();
    setError(null);
    if (!teamUsername.trim() || !teamPassword) {
      setError('Please enter your common Team Username and Team Password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginTeam({
        teamUsername: teamUsername.trim(),
        password: teamPassword
      });
      navigate('/participant/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid team credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    setError(null);
    if (!codeOrEmail.trim()) {
      setError('Please provide your Participant Username or Email.');
      return;
    }

    setIsLoading(true);
    try {
      loginParticipant({ codeOrEmail: codeOrEmail.trim() });
      navigate('/participant/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = (e) => {
    e?.preventDefault();
    setError(null);
    if (!fullName.trim() || !regEmail.trim()) {
      setError('Full Name and Email are required.');
      return;
    }

    setIsLoading(true);
    try {
      const created = registerParticipant({
        fullName: fullName.trim(),
        email: regEmail.trim(),
        organization: organization.trim()
      });
      navigate(`/quiz-simulation?act=act-quiz-trivia&pid=${created.id}`);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoTeam = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await loginTeam({ teamUsername: 'TEAM-ALPHA', password: 'Alpha@2026' });
      navigate('/participant/dashboard');
    } catch (err) {
      setError(err.message || 'Demo team login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-14 px-4">
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <Users className="w-8 h-8 text-purple-300 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Team &amp; Participant Portal</h2>
          <p className="text-xs text-slate-400">
            Sign in with your team&apos;s shared credentials to view all teammates&apos; live quiz &amp; offline game scores.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/[0.03] p-1 rounded-lg border border-white/[0.08] text-xs font-medium">
          <button
            type="button"
            onClick={() => { setTab('team'); setError(null); }}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              tab === 'team'
                ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Team Login
          </button>
          <button
            type="button"
            onClick={() => { setTab('login'); setError(null); }}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              tab === 'login'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Code Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(null); }}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              tab === 'register'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-md text-xs text-rose-300 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 stroke-[1.75]" />
            <span>{error}</span>
          </div>
        )}

        {tab === 'team' ? (
          <form onSubmit={handleTeamLoginSubmit} className="space-y-4 text-xs" autoComplete="off">
            <div>
              <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                Team Username
              </label>
              <input
                type="text"
                required
                value={teamUsername}
                onChange={(e) => setTeamUsername(e.target.value)}
                placeholder="e.g. TEAM-ALPHA"
                className="glass-input w-full px-3 py-2 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                Common Team Password
              </label>
              <input
                type="password"
                required
                value={teamPassword}
                onChange={(e) => setTeamPassword(e.target.value)}
                placeholder="••••••••••••"
                className="glass-input w-full px-3 py-2 text-xs font-mono"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Verifying Team...' : 'Sign In to Team Dashboard'}</span>
            </Button>
          </form>
        ) : tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                Participant Username or Email
              </label>
              <input
                type="text"
                required
                value={codeOrEmail}
                onChange={(e) => setCodeOrEmail(e.target.value)}
                placeholder="e.g. P001 or alex.mercer@example.com"
                className="glass-input w-full px-3 py-2 text-xs font-mono"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-semibold"
            >
              {isLoading ? 'Verifying...' : 'Sign In to Dashboard'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Mercer"
                className="glass-input w-full px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="alex.mercer@example.com"
                className="glass-input w-full px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                Team Name (Optional)
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Alpha Cyber Squad"
                className="glass-input w-full px-3 py-2 text-xs"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-semibold"
            >
              {isLoading ? 'Generating Username...' : 'Register & Get Participant Pass (P00x)'}
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-white/[0.08] space-y-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleQuickDemoTeam}
            className="w-full py-2 text-xs"
          >
            Demo Team Login (TEAM-ALPHA — Alpha Cyber Squad)
          </Button>

          <div className="text-center text-xs text-slate-400 pt-1">
            Are you an event staff member or admin?{' '}
            <Link to="/admin/login" className="text-indigo-400 hover:text-indigo-300 font-medium underline transition-colors">
              Admin Login Portal
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
