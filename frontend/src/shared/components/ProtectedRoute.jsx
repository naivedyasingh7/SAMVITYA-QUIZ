import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Button } from './Button.jsx';
import { Card } from './Card.jsx';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

/**
 * Route protection guard that blocks participants from accessing Admin features.
 */
export function ProtectedRoute({ children, requiredRole = 'admin' }) {
  const { role, loginAdmin, currentUser } = useAuth();

  if (role !== requiredRole) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <Card className="border-rose-500/20 p-8 text-center space-y-5">
          <div className="flex justify-center">
            <ShieldAlert className="w-10 h-10 text-rose-400 stroke-[1.5]" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">Admin Authorization Required</h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {currentUser ? (
                <>
                  You are currently signed in as <span className="font-semibold text-slate-200">{currentUser.name}</span> (<span className="uppercase text-slate-300 font-mono">{role}</span>).
                </>
              ) : (
                'You are currently not signed in.'
              )}
              <br />
              Participants are restricted from accessing question authoring and administration features.
            </p>
          </div>

          <div className="p-3.5 bg-white/[0.02] border border-white/[0.08] rounded-lg text-left text-xs text-slate-300 space-y-1">
            <div className="font-medium text-slate-200">Security Policy</div>
            <div className="text-slate-400">Required: <code className="font-mono text-indigo-300">{requiredRole.toUpperCase()}</code></div>
            <div className="text-slate-400">Current Status: <code className="font-mono text-slate-200">{role.toUpperCase()}</code></div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link to="/admin/login">
              <Button
                type="button"
                className="w-full py-2.5 text-xs font-semibold"
              >
                Go to Staff & Admin Login
              </Button>
            </Link>

            <Button
              type="button"
              variant="secondary"
              onClick={() => loginAdmin()}
              className="w-full py-2 text-xs"
            >
              Quick Authorize as Demo Admin
            </Button>

            <Link to="/quiz-session" className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center justify-center gap-1 pt-1 transition-colors">
              <ArrowLeft className="w-3 h-3 stroke-[1.75]" />
              <span>Return to Participant Quiz</span>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return children;
}
