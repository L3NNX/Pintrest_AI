import React from 'react';
import { PinCard } from './PinCard';
import type { Post } from '../types';
import { Compass } from 'lucide-react';

interface MasonryGridProps {
  pins: Post[];
  onPinClick: (pin: Post) => void;
  onLike: (pinId: string) => void;
  currentUserId?: string;
  loading?: boolean;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  pins,
  onPinClick,
  onLike,
  currentUserId,
  loading,
}) => {
  if (loading) {
    return (
      <div
        style={{
          maxWidth: 1600,
          margin: '0 auto',
          padding: '24px 24px 48px',
        }}
        className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-5"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{
              marginBottom: 20,
              breakInside: 'avoid',
              height: `${220 + (i % 4) * 70}px`,
            }}
          />
        ))}
      </div>
    );
  }

  if (pins.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '55vh',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--surface-raised)',
            border: '1px solid var(--rule)',
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Compass size={26} strokeWidth={1.5} />
        </div>
        <h3
          className="serif"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--ink)',
            margin: '0 0 8px',
          }}
        >
          Your feed is quiet
        </h3>
        <p
          style={{
            fontSize: 14,
            color: 'var(--ink-secondary)',
            maxWidth: 380,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Curate and share ideas from across the visual web. Upload a photograph or work to start the collection.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1600,
        margin: '0 auto',
        padding: '24px 24px 64px',
      }}
      className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-5"
    >
      {pins.map((pin) => (
        <PinCard
          key={pin._id}
          pin={pin}
          onClick={onPinClick}
          onLike={onLike}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};
