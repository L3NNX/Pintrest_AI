import React, { useState } from 'react';
import { Search, Plus, Bell, MessageCircle, User as UserIcon, LogOut } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 px-4 py-3">
      <div className="max-w-[1920px] mx-auto flex items-center gap-3">
        {/* Logo */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 p-2 hover:bg-zinc-100 rounded-full transition-colors flex-shrink-0"
        >
          <svg className="w-8 h-8 text-[#e60023]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29.14-.62.92-3.86.92-3.86s-.23-.47-.23-1.17c0-1.1.64-1.92 1.44-1.92.68 0 1 .5 1 1.12 0 .68-.43 1.7-.66 2.64-.19.79.4 1.44 1.18 1.44 1.42 0 2.5-1.5 2.5-3.66 0-1.91-1.38-3.25-3.34-3.25-2.45 0-3.88 1.83-3.88 3.73 0 .74.28 1.53.64 1.96a.35.35 0 0 1 .08.34c-.09.37-.29 1.17-.33 1.33-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.77 2.74-7.24 7.9-7.24 4.15 0 7.37 2.96 7.37 6.91 0 4.12-2.6 7.44-6.2 7.44-1.21 0-2.35-.63-2.74-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z"/>
          </svg>
        </button>

        {/* Navigation Tabs */}
        <button
          onClick={() => onTabChange('home')}
          className={`px-4 py-2.5 rounded-full font-semibold text-sm transition-colors ${
            activeTab === 'home'
              ? 'bg-zinc-950 text-white'
              : 'text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          Home
        </button>

        {/* Create Button */}
        {user && (
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-semibold text-sm text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        )}

        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for ideas, pins, or creators..."
            className="w-full bg-zinc-100 hover:bg-zinc-200/70 focus:bg-white border border-transparent focus:border-zinc-300 focus:outline-none rounded-full py-2.5 pl-11 pr-4 text-sm transition-all"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button className="p-2.5 hover:bg-zinc-100 text-zinc-700 rounded-full transition-colors hidden sm:flex">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2.5 hover:bg-zinc-100 text-zinc-700 rounded-full transition-colors hidden sm:flex">
            <MessageCircle className="w-5 h-5" />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 p-1 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <img
                  src={user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
                  alt={user.fullname}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-200"
                />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="font-semibold text-sm text-zinc-900">{user.fullname}</p>
                    <p className="text-xs text-zinc-500">@{user.username}</p>
                  </div>
                  <button
                    onClick={() => {
                      onTabChange('profile');
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Your Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-[#e60023] hover:bg-[#b8001c] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm"
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
