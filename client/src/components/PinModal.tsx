import React, { useEffect, useState } from 'react';
import { X, Heart, Download, Share2, MoreHorizontal, ArrowLeft } from 'lucide-react';
import type { Post } from '../types';

interface PinModalProps {
  pin: Post | null;
  onClose: () => void;
  onLike: (pinId: string) => void;
  currentUserId?: string;
}

export const PinModal: React.FC<PinModalProps> = ({ pin, onClose, onLike, currentUserId }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pin) return null;

  const isLiked = currentUserId ? pin.likes?.includes(currentUserId) : false;

  const handleDownload = () => {
    window.open(pin.image, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Background click listener */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Close button top-left on mobile / floating */}
      <button
        onClick={onClose}
        className="fixed top-5 left-5 z-50 p-3 bg-white/90 hover:bg-white text-zinc-900 rounded-full shadow-lg transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Modal Container */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row my-auto max-h-[90vh]">
        {/* Left: Image Container */}
        <div className="md:w-1/2 bg-zinc-950 flex items-center justify-center p-4 overflow-hidden">
          <img
            src={pin.image}
            alt={pin.imageText}
            className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
          />
        </div>

        {/* Right: Info & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2.5 hover:bg-zinc-100 rounded-full text-zinc-700 transition-colors"
                  title="Open/Download original"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(pin.image)}
                  className="p-2.5 hover:bg-zinc-100 rounded-full text-zinc-700 transition-colors"
                  title="Copy Link"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2.5 hover:bg-zinc-100 rounded-full text-zinc-700 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Red Save Button */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all ${
                  isSaved
                    ? 'bg-zinc-950 text-white hover:bg-black'
                    : 'bg-[#e60023] text-white hover:bg-[#b8001c]'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Pin Title / Caption */}
            <div className="mt-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-snug">
                {pin.imageText || 'Visual Inspiration'}
              </h1>
              <p className="text-xs text-zinc-400 mt-2">
                Uploaded on {new Date(pin.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </p>
            </div>

            {/* Author Section */}
            {pin.user && (
              <div className="flex items-center justify-between mt-8 p-4 bg-zinc-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <img
                    src={pin.user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
                    alt={pin.user.fullname}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm">{pin.user.fullname}</h4>
                    <p className="text-xs text-zinc-500">@{pin.user.username}</p>
                  </div>
                </div>

                <button className="bg-zinc-200 hover:bg-zinc-300 text-zinc-900 font-semibold text-xs px-4 py-2.5 rounded-full transition-colors">
                  Follow
                </button>
              </div>
            )}
          </div>

          {/* Bottom Bar: Like Button & Stats */}
          <div className="pt-6 border-t border-zinc-100 mt-6 flex items-center justify-between">
            <button
              onClick={() => onLike(pin._id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all ${
                isLiked
                  ? 'bg-red-50 text-red-600'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-600' : ''}`} />
              <span>{pin.likes?.length || 0} Likes</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 hover:bg-zinc-100 text-zinc-500 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
