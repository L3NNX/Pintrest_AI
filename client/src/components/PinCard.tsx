import React, { useState } from 'react';
import { Heart, Share2, MoreHorizontal } from 'lucide-react';
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
      onClick={() => onClick(pin)}
      className="group relative cursor-pointer break-inside-avoid mb-4 transition-transform duration-200"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-200 animate-pulse" style={{ minHeight: '260px' }} />
        )}
        <img
          src={pin.image}
          alt={pin.imageText || 'Pin image'}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full object-cover rounded-2xl transition-all duration-300 group-hover:brightness-95 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between pointer-events-none">
          {/* Top Row: Save Button */}
          <div className="flex justify-end pointer-events-auto">
            <button
              onClick={handleSave}
              className={`px-4 py-2.5 rounded-full font-bold text-sm shadow-md transition-all ${
                isSaved
                  ? 'bg-zinc-950 text-white hover:bg-black'
                  : 'bg-[#e60023] text-white hover:bg-[#b8001c]'
              }`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>

          {/* Bottom Row: Actions */}
          <div className="flex items-center justify-between pointer-events-auto">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 hover:bg-white text-zinc-900'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {pin.likes?.length > 0 && <span>{pin.likes.length}</span>}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(pin.image);
                }}
                className="p-2 bg-white/90 hover:bg-white text-zinc-900 rounded-full shadow-md backdrop-blur-md transition-all"
                title="Copy image link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/90 hover:bg-white text-zinc-900 rounded-full shadow-md backdrop-blur-md transition-all"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Caption & Author Below Image */}
      <div className="mt-2 px-1">
        {pin.imageText && (
          <p className="text-sm font-semibold text-zinc-900 line-clamp-2 leading-tight">
            {pin.imageText}
          </p>
        )}
        {pin.user && (
          <div className="flex items-center gap-2 mt-1.5">
            <img
              src={pin.user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
              alt={pin.user.fullname || pin.user.username}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-zinc-600 truncate font-medium">
              {pin.user.fullname || `@${pin.user.username}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
