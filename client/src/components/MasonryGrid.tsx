import React from 'react';
import { PinCard } from './PinCard';
import type { Post } from '../types';
import { Sparkles } from 'lucide-react';

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
      <div className="max-w-[1920px] mx-auto px-4 py-6 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="mb-4 break-inside-avoid bg-zinc-100 rounded-2xl animate-pulse"
            style={{ height: `${200 + (i % 4) * 80}px` }}
          />
        ))}
      </div>
    );
  }

  if (pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <div className="w-16 h-16 bg-red-50 text-[#e60023] rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-2">No Pins Found Yet</h3>
        <p className="text-sm text-zinc-500 max-w-sm mb-6">
          Be the first to share creative inspiration! Click the button below to upload a pin directly to Cloudflare R2.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1920px] mx-auto px-4 py-6 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4">
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
