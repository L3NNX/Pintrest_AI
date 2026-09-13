import { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { MasonryGrid } from './components/MasonryGrid';
import { PinModal } from './components/PinModal';
import { CreatePinModal } from './components/CreatePinModal';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';
import { api } from './services/api';
import type { Post, User } from './types';
import { UserCheck } from 'lucide-react';

export function App() {
  const [pins, setPins] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedPin, setSelectedPin] = useState<Post | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Load user session
  const checkUserSession = async () => {
    try {
      const status = await api.getAuthStatus();
      if (status.isAuthenticated) {
        const { user: userData } = await api.getMe();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // Load feed pins
  const loadFeed = async () => {
    try {
      setLoading(true);
      const feedPins = await api.getFeed();
      setPins(feedPins);
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
    loadFeed();
  }, []);

  // Handle Likes
  const handleLike = async (pinId: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    try {
      await api.toggleLike(pinId);
      setPins((prevPins) =>
        prevPins.map((p) => {
          if (p._id === pinId) {
            const hasLiked = p.likes?.includes(user._id);
            const updatedLikes = hasLiked
              ? p.likes.filter((id) => id !== user._id)
              : [...(p.likes || []), user._id];
            return { ...p, likes: updatedLikes };
          }
          return p;
        })
      );

      // If modal open, update modal pin
      if (selectedPin && selectedPin._id === pinId) {
        const hasLiked = selectedPin.likes?.includes(user._id);
        const updatedLikes = hasLiked
          ? selectedPin.likes.filter((id) => id !== user._id)
          : [...(selectedPin.likes || []), user._id];
        setSelectedPin({ ...selectedPin, likes: updatedLikes });
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { credentials: 'include' });
      setUser(null);
      setActiveTab('home');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle new pin creation
  const handlePinCreated = (newPin: Post) => {
    setPins((prev) => [newPin, ...prev]);
    if (user) {
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              posts: [newPin, ...(prevUser.posts || [])],
            }
          : null
      );
    }
  };

  // Filter pins by search query
  const filteredPins = useMemo(() => {
    if (!searchQuery.trim()) return pins;
    const q = searchQuery.toLowerCase();
    return pins.filter(
      (p) =>
        p.imageText?.toLowerCase().includes(q) ||
        p.user?.fullname?.toLowerCase().includes(q) ||
        p.user?.username?.toLowerCase().includes(q)
    );
  }, [pins, searchQuery]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--ground)',
        color: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <Navbar
        user={user}
        onOpenCreate={() => (user ? setIsCreateOpen(true) : setIsAuthOpen(true))}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' ? (
          <MasonryGrid
            pins={filteredPins}
            onPinClick={(pin) => setSelectedPin(pin)}
            onLike={handleLike}
            currentUserId={user?._id}
            loading={loading}
          />
        ) : user ? (
          <ProfileView
            user={user}
            onPinClick={(pin) => setSelectedPin(pin)}
            onLike={handleLike}
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px',
              textAlign: 'center',
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
                marginBottom: 16,
              }}
            >
              <UserCheck size={22} />
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: 'var(--ink)',
                margin: '0 0 8px',
              }}
            >
              Curator Profile
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'var(--ink-secondary)',
                maxWidth: 320,
                marginBottom: 20,
              }}
            >
              Sign in to view your published collections and saved inspirations.
            </p>
            <button
              onClick={() => setIsAuthOpen(true)}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                boxShadow: '0 2px 8px rgba(230,0,35,0.25)',
              }}
            >
              Sign in to proceed
            </button>
          </div>
        )}
      </main>

      {/* Pin Detail Overlay Modal */}
      <PinModal
        pin={selectedPin}
        onClose={() => setSelectedPin(null)}
        onLike={handleLike}
        currentUserId={user?._id}
      />

      {/* Direct Cloudflare R2 Upload Modal */}
      <CreatePinModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPinCreated={handlePinCreated}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          checkUserSession();
          loadFeed();
        }}
      />
    </div>
  );
}

export default App;
