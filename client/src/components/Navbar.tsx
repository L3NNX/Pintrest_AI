import React, { useState } from 'react';
import { Search, Plus, LogOut, User as UserIcon, Sparkles, X, LayoutGrid } from 'lucide-react';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenCreate: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: 'landing' | 'feed' | 'profile';
  onTabChange: (tab: 'landing' | 'feed' | 'profile') => void;
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
          gap: 16,
        }}
      >
        {/* Brand Mark & Wordmark */}
        <button
          onClick={() => onTabChange('landing')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
          title="Atelier Home"
        >
          {/* Atelier Minimalist Geometric Mark */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--ink)',
              color: 'var(--ground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 15,
              fontFamily: 'var(--font-serif)',
              letterSpacing: '-0.02em',
            }}
          >
            A
          </div>

          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Atelier
          </span>
        </button>

        {/* Primary Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => onTabChange('landing')}
            style={{
              background: activeTab === 'landing' ? 'var(--ink)' : 'transparent',
              color: activeTab === 'landing' ? 'var(--ground)' : 'var(--ink-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '7px 15px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: `all var(--dur-fast) var(--ease)`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Sparkles size={14} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => onTabChange('feed')}
            style={{
              background: activeTab === 'feed' ? 'var(--ink)' : 'transparent',
              color: activeTab === 'feed' ? 'var(--ground)' : 'var(--ink-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '7px 15px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: `all var(--dur-fast) var(--ease)`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <LayoutGrid size={14} />
            <span>Collection</span>
          </button>

          {user && (
            <button
              onClick={() => onTabChange('profile')}
              style={{
                background: activeTab === 'profile' ? 'var(--ink)' : 'transparent',
                color: activeTab === 'profile' ? 'var(--ground)' : 'var(--ink-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '7px 15px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: `all var(--dur-fast) var(--ease)`,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <UserIcon size={14} />
              <span>Studio</span>
            </button>
          )}
        </nav>

        {/* Search Bar */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            maxWidth: searchFocused ? 440 : 320,
            transition: `max-width var(--dur-mid) var(--ease)`,
            marginLeft: 'auto',
          }}
        >
          <Search
            size={14}
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
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (activeTab === 'landing' && e.target.value.trim()) {
                onTabChange('feed');
              }
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search visual archive…"
            style={{
              width: '100%',
              background: searchFocused ? 'var(--surface-card)' : 'var(--surface-raised)',
              border: searchFocused ? '1.5px solid var(--ink)' : '1.5px solid transparent',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 32px 8px 36px',
              fontSize: 13,
              color: 'var(--ink)',
              outline: 'none',
              transition: `all var(--dur-fast) var(--ease)`,
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

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
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
                letterSpacing: '0.01em',
                transition: 'background var(--dur-fast) var(--ease)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--ink-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
            >
              <Plus size={15} />
              <span>New Entry</span>
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
                    My Studio
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
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: `background var(--dur-fast) var(--ease)`,
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-deep)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
