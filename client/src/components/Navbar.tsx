import React, { useState } from 'react';
import { Search, Plus, LogOut, User as UserIcon, Grid3X3, X } from 'lucide-react';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenCreate: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: 'home' | 'profile';
  onTabChange: (tab: 'home' | 'profile') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenCreate,
  onOpenAuth,
  onLogout,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(250, 248, 244, 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          maxWidth: 1600,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Wordmark */}
        <button
          onClick={() => onTabChange('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--accent)">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29.14-.62.92-3.86.92-3.86s-.23-.47-.23-1.17c0-1.1.64-1.92 1.44-1.92.68 0 1 .5 1 1.12 0 .68-.43 1.7-.66 2.64-.19.79.4 1.44 1.18 1.44 1.42 0 2.5-1.5 2.5-3.66 0-1.91-1.38-3.25-3.34-3.25-2.45 0-3.88 1.83-3.88 3.73 0 .74.28 1.53.64 1.96a.35.35 0 0 1 .08.34c-.09.37-.29 1.17-.33 1.33-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.77 2.74-7.24 7.9-7.24 4.15 0 7.37 2.96 7.37 6.91 0 4.12-2.6 7.44-6.2 7.44-1.21 0-2.35-.63-2.74-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Pintrest
            <span style={{ color: 'var(--accent)', marginLeft: 2 }}>AI</span>
          </span>
        </button>

        {/* Nav tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button
            onClick={() => onTabChange('home')}
            style={{
              background: activeTab === 'home' ? 'var(--ink)' : 'transparent',
              color: activeTab === 'home' ? 'var(--ground)' : 'var(--ink-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '7px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: `background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Grid3X3 size={15} />
            Feed
          </button>
          {user && (
            <button
              onClick={() => onTabChange('profile')}
              style={{
                background: activeTab === 'profile' ? 'var(--ink)' : 'transparent',
                color: activeTab === 'profile' ? 'var(--ground)' : 'var(--ink-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '7px 16px',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: `background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)`,
              }}
            >
              Profile
            </button>
          )}
        </nav>

        {/* Search — expands on focus */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            maxWidth: searchFocused ? 480 : 360,
            transition: `max-width var(--dur-mid) var(--ease)`,
          }}
        >
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--ink-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search pins, creators…"
            style={{
              width: '100%',
              background: searchFocused ? 'var(--surface-card)' : 'var(--surface-raised)',
              border: searchFocused ? '1.5px solid var(--ink)' : '1.5px solid transparent',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 36px 8px 38px',
              fontSize: 14,
              color: 'var(--ink)',
              outline: 'none',
              transition: `background var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease)`,
              fontFamily: 'var(--font-sans)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ink-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: 2,
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {user && (
            <button
              onClick={onOpenCreate}
              style={{
                background: 'var(--ink)',
                color: 'var(--ground)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: `background var(--dur-fast) var(--ease)`,
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--ink-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
            >
              <Plus size={15} />
              Create
            </button>
          )}

          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  background: 'none',
                  border: '1.5px solid var(--rule)',
                  borderRadius: 'var(--radius-pill)',
                  padding: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: `border-color var(--dur-fast) var(--ease)`,
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
              >
                <img
                  src={user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
                  alt={user.fullname}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </button>

              {showMenu && (
                <div
                  className="fade-up"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 220,
                    background: 'var(--surface-card)',
                    border: '1px solid var(--rule)',
                    borderRadius: 14,
                    boxShadow: '0 8px 32px rgba(26,24,22,0.12)',
                    overflow: 'hidden',
                    zIndex: 50,
                  }}
                >
                  <div
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--rule)',
                    }}
                  >
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', margin: 0 }}>{user.fullname}</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-muted)', margin: '2px 0 0' }}>@{user.username}</p>
                  </div>
                  <button
                    onClick={() => { onTabChange('profile'); setShowMenu(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      fontSize: 14,
                      color: 'var(--ink)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-raised)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <UserIcon size={15} />
                    Your Profile
                  </button>
                  <button
                    onClick={() => { onLogout(); setShowMenu(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      fontSize: 14,
                      color: 'var(--accent)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fff5f5')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <LogOut size={15} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 20px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: `background var(--dur-fast) var(--ease)`,
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-deep)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
