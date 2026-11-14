import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isFirebaseConfigured } from '../firebase/firebase';

export default function AdminLogin({ onExit, onLoginSuccess }) {
  const { login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await login(email.trim(), password);
      onLoginSuccess?.();
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paint-surface flex flex-col justify-center items-center px-4 py-12 relative">
      {/* Back to Site Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-paint-border text-xs font-bold text-paint-charcoal hover:bg-paint-surfaceAlt shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to DA Traders</span>
        </button>
      </div>

      <div className="max-w-md w-full bg-white rounded-4xl p-8 sm:p-10 border border-paint-border shadow-card space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#821400]/10 text-paint-terracotta flex items-center justify-center mx-auto border border-paint-terracotta/20">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-2xl text-paint-charcoal">
              Staff Portal
            </h2>
            <p className="text-xs text-paint-muted mt-1">
              Sign in to manage DA Traders inquiries, reviews, and business settings.
            </p>
          </div>
        </div>

        {!isFirebaseConfigured && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Developer / Demo Mode Active
            </span>
            <p className="text-[11px] leading-relaxed">
              Firebase credentials not detected in <code>.env</code>. You can log in with demo credentials:
              <br />
              <strong>Email:</strong> <code>admin@datraders.com</code>
              <br />
              <strong>Password:</strong> <code>admin1234</code>
            </p>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-paint-charcoal block">
              Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-paint-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@datraders.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-paint-surfaceAlt text-xs sm:text-sm text-paint-charcoal border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-paint-charcoal block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-paint-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-paint-surfaceAlt text-xs sm:text-sm text-paint-charcoal border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || authLoading}
            className="w-full py-3.5 rounded-2xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <span className="text-[11px] text-paint-muted">
            DA Traders Administration · Restricted Access
          </span>
        </div>
      </div>
    </div>
  );
}

