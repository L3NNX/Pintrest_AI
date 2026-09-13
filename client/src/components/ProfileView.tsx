import React from 'react';
import type { User, Post } from '../types';
import { PinCard } from './PinCard';
import { Share2, Plus, Bookmark } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onPinClick: (pin: Post) => void;
  onLike: (pinId: string) => void;
  onOpenCreate: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onPinClick,
  onLike,
  onOpenCreate,
}) => {
  const userPins = user.posts || [];

  return (
    <div
      style={{
        maxWidth: 1600,
        margin: '0 auto',
        padding: '36px 24px 64px',
      }}
    >
      {/* Profile Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 580,
          margin: '0 auto',
          paddingBottom: 36,
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <img
            src={user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
            alt={user.fullname}
            style={{
              width: 104,
              height: 104,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--rule)',
              boxShadow: '0 8px 24px rgba(26,24,22,0.08)',
            }}
          />
        </div>

        <h1
          className="serif"
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: 'var(--ink)',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {user.fullname}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 4, marginBottom: 0 }}>
          @{user.username}
        </p>

        <p
          style={{
            fontSize: 14,
            color: 'var(--ink-secondary)',
            marginTop: 14,
            lineHeight: 1.5,
          }}
        >
          Visual collector & curator on Pintrest AI. Gathering compositions, architectural forms, and graphic arts.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 18px',
              background: 'var(--surface-raised)',
              border: '1px solid var(--rule)',
              color: 'var(--ink)',
              borderRadius: 'var(--radius-pill)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: `all var(--dur-fast) var(--ease)`,
            }}
          >
            <Share2 size={14} />
            <span>Share Profile</span>
          </button>

          <button
            onClick={onOpenCreate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 20px',
              background: 'var(--ink)',
              color: 'var(--ground)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              transition: `background var(--dur-fast) var(--ease)`,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--ink-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
          >
            <Plus size={15} />
            <span>New Pin</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          paddingTop: 24,
          paddingBottom: 20,
        }}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--ink)',
            cursor: 'pointer',
            paddingBottom: 6,
            borderBottom: '2px solid var(--ink)',
          }}
        >
          Created ({userPins.length})
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--ink-muted)',
            cursor: 'pointer',
            paddingBottom: 6,
            borderBottom: '2px solid transparent',
          }}
        >
          Saved
        </button>
      </div>

      {/* User Pins Grid */}
      {userPins.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            maxWidth: 420,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--surface-raised)',
              border: '1px solid var(--rule)',
              color: 'var(--ink-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Bookmark size={20} />
          </div>
          <h3
            className="serif"
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            No entries published yet
          </h3>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 6, marginBottom: 20 }}>
            Share your visual research and inspirations with the feed.
          </p>
          <button
            onClick={onOpenCreate}
            style={{
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '9px 22px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            Publish your first pin
          </button>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-5 pt-4">
          {userPins.map((pin) => (
            <PinCard
              key={pin._id}
              pin={pin}
              onClick={onPinClick}
              onLike={onLike}
              currentUserId={user._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
