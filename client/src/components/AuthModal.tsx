import React, { useState } from 'react';
import { X, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isRegister ? '/register' : '/login';
      const body = isRegister
        ? { username, email, fullname, password }
        : { username, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Authentication failed');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pinterest Red Logo */}
        <div className="w-12 h-12 bg-red-50 text-[#e60023] rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29.14-.62.92-3.86.92-3.86s-.23-.47-.23-1.17c0-1.1.64-1.92 1.44-1.92.68 0 1 .5 1 1.12 0 .68-.43 1.7-.66 2.64-.19.79.4 1.44 1.18 1.44 1.42 0 2.5-1.5 2.5-3.66 0-1.91-1.38-3.25-3.34-3.25-2.45 0-3.88 1.83-3.88 3.73 0 .74.28 1.53.64 1.96a.35.35 0 0 1 .08.34c-.09.37-.29 1.17-.33 1.33-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.77 2.74-7.24 7.9-7.24 4.15 0 7.37 2.96 7.37 6.91 0 4.12-2.6 7.44-6.2 7.44-1.21 0-2.35-.63-2.74-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z"/>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900">
          {isRegister ? 'Welcome to Pinterest AI' : 'Log in to see more'}
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          {isRegister ? 'Find new ideas to try' : 'Enter your credentials below'}
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:border-zinc-900 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e60023] hover:bg-[#b8001c] disabled:bg-zinc-300 text-white font-bold py-3 rounded-2xl text-sm shadow-md transition-all mt-4"
          >
            {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-100 text-xs text-zinc-500">
          {isRegister ? (
            <p>
              Already on Pinterest?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="font-bold text-zinc-900 hover:underline"
              >
                Log in
              </button>
            </p>
          ) : (
            <p>
              Not on Pinterest yet?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="font-bold text-zinc-900 hover:underline"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

