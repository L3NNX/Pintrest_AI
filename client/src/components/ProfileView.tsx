import React from 'react';
import type { User, Post } from '../types';
import { PinCard } from './PinCard';
import { Share2, Plus, Sparkles } from 'lucide-react';

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
    <div className="max-w-[1920px] mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto pb-10 border-b border-zinc-100">
        <div className="relative group mb-4">
          <img
            src={user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
            alt={user.fullname}
            className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-white"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-zinc-900">{user.fullname}</h1>
        <p className="text-sm text-zinc-500 mt-1 font-medium">@{user.username}</p>

        <p className="text-sm text-zinc-600 mt-3 max-w-md">
          Visual explorer & creator on Pinterest AI. Saving inspirations and discovering creative designs.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full font-semibold text-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950 hover:bg-black text-white rounded-full font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Pin</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-8 pt-6 pb-4">
        <button className="font-bold text-sm text-zinc-900 pb-2 border-b-2 border-zinc-900">
          Created ({userPins.length})
        </button>
        <button className="font-bold text-sm text-zinc-400 hover:text-zinc-600 pb-2 transition-colors">
          Saved
        </button>
      </div>

      {/* User Pins Grid */}
      {userPins.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 bg-red-50 text-[#e60023] rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-zinc-800">You haven't created any Pins yet</h3>
          <p className="text-sm text-zinc-500 mt-1 mb-5">Share your ideas with the world.</p>
          <button
            onClick={onOpenCreate}
            className="bg-[#e60023] hover:bg-[#b8001c] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all"
          >
            Create your first Pin
          </button>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 pt-4">
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
