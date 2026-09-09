import React, { useState } from 'react';
import { Heart, Share2, Bookmark } from 'lucide-react';
import type { Post } from '../types';

interface PinCardProps {
  pin: Post;
  onClick: (pin: Post) => void;
  onLike: (pinId: string) => void;
  currentUserId?: string;
}

export const PinCard: React.FC<PinCardProps> = ({ pin, onClick, onLike, currentUserId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isLiked = currentUserId ? pin.likes?.includes(currentUserId) : false;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(pin._id);
  };

  return (
    <div
      className="pin-card"
      onClick={() => onClick(pin)}
      style={{
        cursor: 'pointer',
        breakInside: 'avoid',
        marginBottom: 20,
        position: 'relative',
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-card)',
          background: 'var(--rule)',
        }}
      >
        {/* Skeleton */}
        {!imageLoaded && (
          <div className="skeleton" style={{ position: 'absolute', inset: 0, minHeight: 240 }} />
        )}

        <img
          className="pin-img"
          src={pin.image}
          alt={pin.imageText || 'Pin'}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s var(--ease)',
          }}
        />

        {/* Hover overlay */}
        <div
          className="pin-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(26,24,22,0.22)',
            borderRadius: 'var(--radius-card)',
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          {/* Top: Save */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
            <button
              onClick={handleSave}
              style={{
                background: isSaved ? 'var(--ink)' : 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                letterSpacing: '0.01em',
              }}
            >
              <Bookmark size={13} fill={isSaved ? '#fff' : 'none'} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>

          {/* Bottom: Like + Share */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
            <button
              onClick={handleLike}
              style={{
                background: isLiked ? 'var(--accent)' : 'rgba(250,248,244,0.92)',
                color: isLiked ? '#fff' : 'var(--ink)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '7px 12px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                transition: `background var(--dur-fast) var(--ease)`,
              }}
            >
              <Heart size={13} fill={isLiked ? '#fff' : 'none'} />
              {(pin.likes?.length ?? 0) > 0 && pin.likes.length}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(pin.image);
              }}
              style={{
                background: 'rgba(250,248,244,0.92)',
                color: 'var(--ink)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '7px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              }}
              title="Copy link"
            >
              <Share2 size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Below-image meta */}
      <div style={{ padding: '10px 4px 4px' }}>
        {pin.imageText && (
          <p
            className="serif"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.35,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {pin.imageText}
          </p>
        )}

        {pin.user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 7 }}>
            <img
              src={pin.user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
              alt={pin.user.fullname}
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid var(--rule)',
              }}
            />
            <span style={{ fontSize: 12, color: 'var(--ink-secondary)', fontWeight: 500 }}>
              {pin.user.fullname || `@${pin.user.username}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
