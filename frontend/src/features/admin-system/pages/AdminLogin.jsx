import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth.js';
import { Button } from '../../../shared/components/Button.jsx';
import { Card } from '../../../shared/components/Card.jsx';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@event.org');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e?.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email.trim()) {
      setError('Admin email or username is required');
      setIsLoading(false);
      return;
    }

    try {
      loginAdmin({ email: email.trim(), password });
      navigate('/admin/quiz-manager');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    loginAdmin({ email: 'admin@event.org', password: 'password' });
    navigate('/admin/quiz-manager');
  };

  return (
    <div className="max-w-md mx-auto my-14 px-4">
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <Lock className="w-8 h-8 text-slate-300 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Staff & Administrator Login</h2>
          <p className="text-xs text-slate-400">
            Secure portal to author questions, curate quizzes, and manage points.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-md text-xs text-rose-300 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 stroke-[1.75]" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium uppercase tracking-wider mb-1.5 text-[11px]">
              Admin Email or Username
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@event.org"
              className="glass-input w-full px-3 py-2 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium uppercase tracking-wider mb-1.5 text-[11px]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input w-full px-3 py-2 text-xs"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 text-xs font-semibold"
          >
            {isLoading ? 'Verifying Credentials...' : 'Sign In as Administrator'}
          </Button>
        </form>

        <div className="pt-4 border-t border-white/[0.08] space-y-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleDemoAdmin}
            className="w-full py-2 text-xs"
          >
            One-Click Demo Admin Login
          </Button>

          <div className="text-center text-xs text-slate-400 pt-1">
            Are you a participant?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium underline transition-colors">
              Participant Portal
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
