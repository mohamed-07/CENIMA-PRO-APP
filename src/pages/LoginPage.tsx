import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Film, Star, Play, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'login' | 'register';

// ─── Floating Label Input ─────────────────────────────────────────────────────
function FloatingLabel({
  id,
  label,
  type = 'text',
  value,
  onChange,
  icon: Icon,
  showToggle = false,
  autoComplete,
  disabled = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ElementType;
  showToggle?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  const inputType = showToggle ? (show ? 'text' : 'password') : type;

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
        <Icon className="w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors duration-200" />
      </div>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        autoComplete={autoComplete ?? (showToggle ? 'current-password' : id)}
        disabled={disabled}
        className="
          peer w-full pl-11 pr-11 pt-6 pb-2 rounded-xl text-sm text-white
          bg-white/5 border border-white/10
          focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20
          focus:bg-white/8 focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 placeholder-transparent
        "
      />
      <label
        htmlFor={id}
        className="
          absolute left-11 top-4 text-slate-400 text-sm
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-red-400
          peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[11px]
          transition-all duration-200 pointer-events-none select-none
        "
      >
        {label}
      </label>
      {showToggle && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          disabled={disabled}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

// ─── Social Button ─────────────────────────────────────────────────────────────
function SocialButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        flex items-center justify-center gap-3 w-full py-3 rounded-xl
        bg-white/5 border border-white/10 text-white text-sm font-medium
        hover:bg-white/10 hover:border-white/20
        active:scale-[0.98] transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider({ text }: { text: string }) {
  return (
    <div className="relative flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-xs text-slate-500 shrink-0">{text}</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

// ─── Alert Banner ─────────────────────────────────────────────────────────────
function AlertBanner({ type, msg }: { type: 'error' | 'success'; msg: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm ${
            type === 'error'
              ? 'bg-red-500/10 border border-red-500/30 text-red-300'
              : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
          }`}
        >
          {type === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          )}
          <span>{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Google SVG ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// ─── GitHub SVG ───────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── Submit Button ────────────────────────────────────────────────────────────
function SubmitButton({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        relative w-full py-3.5 rounded-xl font-semibold text-white text-sm
        bg-gradient-to-r from-red-600 to-red-500
        hover:from-red-500 hover:to-red-400
        shadow-lg shadow-red-500/25 hover:shadow-red-500/40
        active:scale-[0.98] transition-all duration-300
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
        overflow-hidden group
      "
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? loadingLabel : label}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) return setError('Please enter your email address.');
    if (!password) return setError('Please enter your password.');

    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (err) {
        // Make Supabase errors more user-friendly
        if (err.message.includes('Invalid login credentials')) {
          setError('Incorrect email or password. Please try again.');
        } else if (err.message.includes('Email not confirmed')) {
          setError('Please verify your email before signing in. Check your inbox.');
        } else {
          setError(err.message);
        }
        return;
      }
      navigate('/');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin },
      });
      if (err) setError(err.message);
    } catch {
      setError('OAuth sign-in failed. Please try again.');
    } finally {
      setOauthLoading(null);
    }
  };

  const isDisabled = loading || !!oauthLoading;

  return (
    <motion.form
      key="login"
      onSubmit={handleLogin}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col gap-4"
      noValidate
    >
      <AlertBanner type="error" msg={error} />

      <FloatingLabel
        id="login-email"
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        icon={Mail}
        autoComplete="email"
        disabled={isDisabled}
      />
      <FloatingLabel
        id="login-password"
        label="Password"
        value={password}
        onChange={setPassword}
        icon={Lock}
        showToggle
        autoComplete="current-password"
        disabled={isDisabled}
      />

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isDisabled}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded border border-white/20 peer-checked:bg-red-500 peer-checked:border-red-500 transition-all duration-200 flex items-center justify-center">
              {remember && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Remember me</span>
        </label>
        <button
          type="button"
          onClick={async () => {
            if (!email.trim()) { setError('Enter your email above first, then click Forgot password.'); return; }
            setLoading(true);
            const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
              redirectTo: `${window.location.origin}/reset-password`,
            });
            setLoading(false);
            if (err) { setError(err.message); } else { setError(''); alert('Password reset link sent! Check your inbox.'); }
          }}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <SubmitButton loading={loading} label="Sign In" loadingLabel="Signing in…" />

      <Divider text="or continue with" />

      <div className="grid grid-cols-2 gap-3">
        <SocialButton onClick={() => handleOAuth('google')} disabled={isDisabled}>
          {oauthLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleIcon />}
          Google
        </SocialButton>
        <SocialButton onClick={() => handleOAuth('github')} disabled={isDisabled}>
          {oauthLoading === 'github' ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitHubIcon />}
          GitHub
        </SocialButton>
      </div>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-red-400 hover:text-red-300 font-medium transition-colors">
          Create one
        </button>
      </p>
    </motion.form>
  );
}

// ─── Register Form ────────────────────────────────────────────────────────────
function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const passwordStrength = password.length === 0 ? 0 : password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 6 ? 2 : 1;
  const strengthLabel = ['', 'Too weak', 'Weak', 'Good', 'Strong'][passwordStrength];
  const strengthColor = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-400'][passwordStrength];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name.trim()) return setError('Please enter your full name.');
    if (!email.trim()) return setError('Please enter your email address.');
    if (!password) return setError('Please create a password.');
    if (password.length < 8) return setError('Password must be at least 8 characters long.');
    if (password !== confirm) return setError('Passwords do not match. Please try again.');

    setLoading(true);
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: window.location.origin,
        },
      });

      if (err) {
        if (err.message.includes('already registered') || err.message.includes('User already registered')) {
          setError('This email is already registered. Try signing in instead.');
        } else {
          setError(err.message);
        }
        return;
      }

      // If email confirmation is disabled in Supabase, a session is returned immediately
      if (data.session) {
        setSuccessMsg('Account created! Redirecting you now…');
        setTimeout(() => window.location.replace('/'), 1500);
      } else {
        // Email confirmation required
        setSuccessMsg(`We've sent a confirmation link to ${email.trim()}. Please check your inbox to activate your account.`);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setOauthLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (err) setError(err.message);
    } catch {
      setError('Google sign-up failed. Please try again.');
    } finally {
      setOauthLoading(false);
    }
  };

  const isDisabled = loading || oauthLoading || !!successMsg;

  return (
    <motion.form
      key="register"
      onSubmit={handleRegister}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col gap-4"
      noValidate
    >
      <AlertBanner type="success" msg={successMsg} />
      <AlertBanner type="error" msg={error} />

      <FloatingLabel id="reg-name" label="Full Name" value={name} onChange={setName} icon={User} autoComplete="name" disabled={isDisabled} />
      <FloatingLabel id="reg-email" label="Email address" type="email" value={email} onChange={setEmail} icon={Mail} autoComplete="email" disabled={isDisabled} />
      <FloatingLabel id="reg-password" label="Password" value={password} onChange={setPassword} icon={Lock} showToggle autoComplete="new-password" disabled={isDisabled} />
      <FloatingLabel id="reg-confirm" label="Confirm Password" value={confirm} onChange={setConfirm} icon={Lock} showToggle autoComplete="new-password" disabled={isDisabled} />

      {/* Password strength */}
      {password.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= passwordStrength ? strengthColor : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">{strengthLabel} password</p>
        </div>
      )}

      <SubmitButton loading={loading} label="Create Account" loadingLabel="Creating account…" />

      <Divider text="or sign up with" />

      <SocialButton onClick={handleGoogle} disabled={isDisabled}>
        {oauthLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleIcon />}
        Continue with Google
      </SocialButton>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-red-400 hover:text-red-300 font-medium transition-colors">
          Sign in
        </button>
      </p>
    </motion.form>
  );
}

// ─── Stats Badge ──────────────────────────────────────────────────────────────
function StatBadge({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
      <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-red-400" />
      </div>
      <div>
        <p className="text-white font-bold text-base leading-none">{value}</p>
        <p className="text-slate-400 text-xs mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Main Auth Page ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('login');

  // RegisterPage sets a sessionStorage flag to open on the register tab
  useEffect(() => {
    const flag = sessionStorage.getItem('auth-tab');
    if (flag === 'register') {
      setTab('register');
      sessionStorage.removeItem('auth-tab');
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-[#0F172A] overflow-hidden">

      {/* ── Left Hero Panel ─────────────────────────────── */}
      <div className="hidden lg:flex relative w-[45%] flex-col overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/movies-bg.jpg')" }}
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-[#0F172A]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#0F172A] to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/40">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Mouvies<span className="text-red-500">PRO</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-full px-3 py-1 mb-6">
                <Star className="w-3 h-3 text-red-400 fill-red-400" />
                <span className="text-red-300 text-xs font-medium">Premium Streaming Experience</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                Unlimited{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Movies
                </span>{' '}
                &amp; TV Shows
              </h1>
              <p className="text-slate-300 text-base leading-relaxed max-w-sm">
                Stream thousands of titles in 4K Ultra HD. New content added every week. Watch anywhere, anytime.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="grid grid-cols-2 gap-3 mt-10"
            >
              <StatBadge icon={Film} value="10K+" label="Movies & Shows" />
              <StatBadge icon={Star} value="4K HD" label="Ultra Quality" />
              <StatBadge icon={Play} value="No Ads" label="Ad-Free Viewing" />
              <StatBadge icon={User} value="5M+" label="Happy Users" />
            </motion.div>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-slate-600 text-xs"
          >
            © 2025 MouviesPRO · All rights reserved
          </motion.p>
        </div>
      </div>

      {/* ── Right Auth Panel ─────────────────────────────── */}
      <div className="flex-1 lg:w-[55%] flex items-center justify-center p-6 sm:p-10 relative">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/40">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Mouvies<span className="text-red-500">PRO</span>
            </span>
          </div>

          {/* Glass card */}
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: 'rgba(17, 24, 39, 0.88)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
            }}
          >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Tab switcher */}
            <div className="relative flex bg-white/5 rounded-2xl p-1 mb-7 border border-white/[0.08]">
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-1 w-[calc(50%-4px)] rounded-xl bg-gradient-to-r from-red-600 to-red-500 shadow-md shadow-red-500/30"
                animate={{ x: tab === 'register' ? 'calc(100% + 4px)' : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              />
              {(['login', 'register'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${
                    tab === t ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            {/* Dynamic heading */}
            <div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <h2 className="text-2xl font-bold text-white">
                    {tab === 'login' ? 'Welcome back' : 'Join MouviesPRO'}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {tab === 'login'
                      ? 'Sign in to continue your streaming journey'
                      : 'Create your account and start watching today'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Forms */}
            <AnimatePresence mode="wait">
              {tab === 'login' ? (
                <LoginForm key="login" onSwitch={() => setTab('register')} />
              ) : (
                <RegisterForm key="register" onSwitch={() => setTab('login')} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
