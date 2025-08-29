'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { GlassHeader } from '../page';

type ThemeKey = 'dawn' | 'day' | 'dusk' | 'night';

export const THEMES: Record<string, { name: string; gradient: string; text?: string; badge?: string }> = {
  dawn: {
    name: 'Dawn',
    gradient: 'bg-gradient-to-br from-rose-200 via-pink-200 to-orange-200',
    text: 'text-slate-800',
    badge: 'bg-white/30 text-slate-800',
  },
  day: {
    name: 'Day',
    gradient: 'bg-gradient-to-br from-sky-300 via-cyan-300 to-emerald-300',
    text: 'text-slate-900',
    badge: 'bg-white/40 text-slate-900',
  },
  dusk: {
    name: 'Dusk',
    gradient: 'bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-orange-300',
    text: 'text-white',
    badge: 'bg-white/20 text-white',
  },
  night: {
    name: 'Night',
    gradient: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  ocean: {
    name: 'Ocean',
    gradient: 'bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  sunset: {
    name: 'Sunset',
    gradient: 'bg-gradient-to-br from-yellow-300 via-orange-400 to-rose-500',
    text: 'text-slate-900',
    badge: 'bg-white/30 text-slate-900',
  },
  forest: {
    name: 'Forest',
    gradient: 'bg-gradient-to-br from-emerald-700 via-green-600 to-lime-500',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  midnight: {
    name: 'Midnight',
    gradient: 'bg-gradient-to-br from-black via-slate-800 to-indigo-900',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  royal: {
    name: 'Royal',
    gradient: 'bg-gradient-to-br from-purple-700 via-violet-600 to-cyan-500',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
};

function pickThemeByHour(hour: number): ThemeKey {
  if (hour >= 5 && hour < 11) return 'dawn';
  if (hour >= 11 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'dusk';
  return 'night';
}

export default function LoginPage() {
  const router = useRouter();

  // Theme state (mirrors your landing/dashboard approach)
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => {
    if (typeof window === 'undefined') return 'day';
    const stored = localStorage.getItem('themeKey') as ThemeKey | null;
    return stored ?? pickThemeByHour(new Date().getHours());
  });

  const [autoTheme, setAutoTheme] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('autoTheme');
    return stored === null ? true : stored !== 'false';
  });

  // Optional: react to time when autoTheme is enabled
  useEffect(() => {
    if (!autoTheme) return;
    const apply = () => setThemeKey(pickThemeByHour(new Date().getHours()));
    apply();
    const id = setInterval(apply, 60_000); // re-check hourly feel, cheap per minute
    return () => clearInterval(id);
  }, [autoTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('themeKey', themeKey);
  }, [themeKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('autoTheme', String(autoTheme));
  }, [autoTheme]);

  const openSecret = () => {
    // Optional: your easter egg modal trigger
    alert('✨ Secret unlocked! (hook this to your modal or confetti)');
  };

  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const bgClass = useMemo(() => `bg-gradient-to-br ${THEMES[themeKey].gradient}`, [themeKey]);
  const ringClass = useMemo(() => THEMES[themeKey].ring, [themeKey]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        router.push('/dashboard');
      } else {
        setErr(data?.message || 'Login failed. Check your credentials and try again.');
      }
    } catch (error) {
      console.error(error);
      setErr('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen ${bgClass} text-white flex flex-col`}>
      {/* Correct GlassHeader usage (matches your example) */}
      <GlassHeader
        themeKey={themeKey}
        setThemeKey={(k: ThemeKey) => {
          setThemeKey(k);
          setAutoTheme(false);
        }}
        autoTheme={autoTheme}
        setAutoTheme={(v: boolean) => setAutoTheme(v)}
        onSecretClick={openSecret}
      />

      {/* Centered Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleLogin}
          noValidate
          className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 space-y-6
                     transition-all duration-300 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.4)]"
        >
          {/* Subtle decorative glow */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-white/20 via-white/10 to-transparent opacity-50" />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6 opacity-90" />
              <h1 className="text-3xl font-extrabold tracking-tight drop-shadow">
                Welcome Back
              </h1>
            </div>
            <p className="text-center text-sm text-white/75">
              Sign in to access your dashboard and stay productive.
            </p>
          </div>

          {/* Error banner */}
          {err && (
            <div className="relative z-10 rounded-lg bg-rose-500/20 border border-rose-400/40 px-3 py-2 text-sm">
              {err}
            </div>
          )}

          {/* Email */}
          <div className="relative z-10">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-80 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/15 border border-white/25 placeholder-white/70 text-white
                            outline-none ${ringClass} focus:ring-2 transition-shadow`}
                placeholder="you@example.com"
                aria-label="Email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative z-10">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-80 pointer-events-none" />
              <input
                type={showPw ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-lg bg-white/15 border border-white/25 placeholder-white/70 text-white
                            outline-none ${ringClass} focus:ring-2 transition-shadow`}
                placeholder="••••••••"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md bg-white/10 hover:bg-white/20 transition"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`relative z-10 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                        transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-80
                        ${loading
                          ? 'bg-white/30'
                          : 'bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-[1.02] active:scale-[0.99]'}`}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in…
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* Links */}
          <div className="relative z-10 text-center text-sm text-white/80">
            <a
              href="/forgot-password"
              className="underline hover:text-white transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <p className="relative z-10 text-center text-sm text-white/80">
            Don’t have an account?{' '}
            <a
              href="/signup"
              className="text-white underline decoration-white/60 hover:decoration-white"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
