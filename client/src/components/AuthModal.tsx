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
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        overflowY: 'auto',
        background: 'rgba(26, 24, 22, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
      className="fade-up"
    >
      <div style={{ position: 'fixed', inset: 0 }} onClick={onClose} />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'var(--surface-card)',
          border: '1px solid var(--rule)',
          borderRadius: 20,
          boxShadow: '0 24px 48px -12px rgba(26, 24, 22, 0.25)',
          maxWidth: 420,
          width: '100%',
          padding: '36px 32px 32px',
          textAlign: 'center',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            padding: 8,
            background: 'none',
            border: 'none',
            color: 'var(--ink-muted)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-pill)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* Atelier Monogram */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--ink)',
            color: 'var(--ground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          A
        </div>

        <h2
          className="serif"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          {isRegister ? 'Join Atelier' : 'Welcome to Atelier'}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 4, marginBottom: 0 }}>
          {isRegister ? 'Create an account to curate your visual archive' : 'Sign in to access your personal collection'}
        </p>

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: '10px 14px',
              background: '#fff5f5',
              border: '1px solid #fed7d7',
              borderRadius: 10,
              color: 'var(--accent)',
              fontSize: 12,
              fontWeight: 500,
              textAlign: 'left',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
          {isRegister && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-secondary)', marginBottom: 6 }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
                  <input
                    type="text"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Jane Doe"
                    style={{
                      width: '100%',
                      padding: '9px 14px 9px 36px',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--rule)',
                      borderRadius: 10,
                      fontSize: 14,
                      color: 'var(--ink)',
                      outline: 'none',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-secondary)', marginBottom: 6 }}>
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    style={{
                      width: '100%',
                      padding: '9px 14px 9px 36px',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--rule)',
                      borderRadius: 10,
                      fontSize: 14,
                      color: 'var(--ink)',
                      outline: 'none',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-secondary)', marginBottom: 6 }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 36px',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--rule)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--ink)',
                  outline: 'none',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-secondary)', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '9px 38px 9px 36px',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--rule)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: 'var(--ink)',
                  outline: 'none',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-muted)',
                  cursor: 'pointer',
                  padding: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 10,
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '11px 20px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: `background var(--dur-fast) var(--ease)`,
              boxShadow: '0 2px 8px rgba(230,0,35,0.25)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-deep)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
          >
            {loading ? 'Validating…' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--rule)', fontSize: 13, color: 'var(--ink-secondary)' }}>
          {isRegister ? (
            <p style={{ margin: 0 }}>
              Already have an account?{' '}
              <button
                onClick={() => setIsRegister(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                Log in
              </button>
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              New to Pintrest AI?{' '}
              <button
                onClick={() => setIsRegister(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
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
