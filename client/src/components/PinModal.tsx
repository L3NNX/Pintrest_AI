import React, { useEffect, useState } from 'react';
import { X, Heart, Download, Share2, ArrowLeft, Bookmark } from 'lucide-react';
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

    if (pin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [pin, onClose]);

  if (!pin) return null;

  const isLiked = currentUserId ? pin.likes?.includes(currentUserId) : false;

  const handleDownload = () => {
    window.open(pin.image, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        overflowY: 'auto',
        background: 'rgba(26, 24, 22, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
      className="fade-up"
    >
      {/* Background dismissal listener */}
      <div
        style={{ position: 'fixed', inset: 0 }}
        onClick={onClose}
      />

      {/* Floating close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 60,
          padding: 10,
          background: 'var(--surface-card)',
          color: 'var(--ink)',
          border: '1px solid var(--rule)',
          borderRadius: 'var(--radius-pill)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}
        title="Back"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Modal Surface */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'var(--surface-card)',
          border: '1px solid var(--rule)',
          borderRadius: 20,
          boxShadow: '0 24px 48px -12px rgba(26, 24, 22, 0.25)',
          maxWidth: 980,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          maxHeight: '88vh',
        }}
        className="flex-col md:flex-row"
      >
        {/* Left: Gallery framing */}
        <div
          style={{
            background: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            overflow: 'hidden',
          }}
          className="md:w-3/5"
        >
          <img
            src={pin.image}
            alt={pin.imageText}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '74vh',
              objectFit: 'contain',
              borderRadius: 12,
            }}
          />
        </div>

        {/* Right: Editorial Information & Actions */}
        <div
          style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            background: 'var(--surface-card)',
          }}
          className="md:w-2/5"
        >
          <div>
            {/* Top Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 20,
                borderBottom: '1px solid var(--rule)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={handleDownload}
                  style={{
                    padding: 8,
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--rule)',
                    borderRadius: 'var(--radius-pill)',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Open original"
                >
                  <Download size={15} />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(pin.image)}
                  style={{
                    padding: 8,
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--rule)',
                    borderRadius: 'var(--radius-pill)',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Copy link"
                >
                  <Share2 size={15} />
                </button>
              </div>

              {/* Red Save Button */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                style={{
                  background: isSaved ? 'var(--ink)' : 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '9px 20px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.01em',
                }}
              >
                <Bookmark size={14} fill={isSaved ? '#fff' : 'none'} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Pin Title / Caption */}
            <div style={{ marginTop: 24 }}>
              <h1
                className="serif"
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                {pin.imageText || 'Visual Study'}
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--ink-muted)',
                  marginTop: 8,
                  marginBottom: 0,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Curated on {new Date(pin.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </p>
            </div>

            {/* Author Block */}
            {pin.user && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 28,
                  padding: '14px 16px',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--rule)',
                  borderRadius: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src={pin.user.dp || 'https://i.pinimg.com/280x280_RS/fe/7d/ee/fe7deef834e1fafe56f8023ced803ca9.jpg'}
                    alt={pin.user.fullname}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid var(--rule)',
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: 'var(--ink)',
                        margin: 0,
                      }}
                    >
                      {pin.user.fullname}
                    </h4>
                    <p
                      style={{
                        fontSize: 12,
                        color: 'var(--ink-secondary)',
                        margin: '1px 0 0',
                      }}
                    >
                      @{pin.user.username}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                    color: 'var(--ink-muted)',
                  }}
                >
                  Contributor
                </span>
              </div>
            )}
          </div>

          {/* Bottom Bar: Like Button & Close */}
          <div
            style={{
              paddingTop: 20,
              marginTop: 24,
              borderTop: '1px solid var(--rule)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              onClick={() => onLike(pin._id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid var(--rule)',
                background: isLiked ? '#fff5f5' : 'var(--surface-raised)',
                color: isLiked ? 'var(--accent)' : 'var(--ink)',
                cursor: 'pointer',
                transition: `all var(--dur-fast) var(--ease)`,
              }}
            >
              <Heart size={16} fill={isLiked ? 'var(--accent)' : 'none'} color={isLiked ? 'var(--accent)' : 'currentColor'} />
              <span>{pin.likes?.length || 0} Likes</span>
            </button>

            <button
              onClick={onClose}
              style={{
                padding: 8,
                background: 'none',
                border: 'none',
                color: 'var(--ink-muted)',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
