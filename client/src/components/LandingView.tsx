import React from 'react';
import { ArrowRight, Sparkles, Shield, Compass, Zap } from 'lucide-react';
import type { Post } from '../types';

interface LandingViewProps {
  onExplore: () => void;
  onOpenAuth: () => void;
  samplePins: Post[];
  onPinClick: (pin: Post) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onExplore,
  onOpenAuth,
  samplePins,
  onPinClick,
}) => {
  const previewPins = samplePins.slice(0, 6);

  return (
    <div style={{ background: 'var(--ground)', color: 'var(--ink)' }}>
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '72px 24px 64px',
          textAlign: 'center',
        }}
      >
        {/* Subtle pill tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            background: 'var(--surface-raised)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--ink-secondary)',
            marginBottom: 28,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <Sparkles size={13} color="var(--accent)" />
          <span>Atelier Visual Studio · Edition 2026</span>
        </div>

        {/* Hero Headline */}
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--ink)',
            maxWidth: 960,
            margin: '0 auto 24px',
          }}
        >
          The private atelier for visual curators & creative collectors.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: 'var(--ink-secondary)',
            maxWidth: 640,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          An independent repository for photography, architecture, and graphic art. 
          Powered by Cloudflare R2 zero-egress edge storage and visual intelligence.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={onExplore}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--ink)',
              color: 'var(--ground)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              boxShadow: '0 4px 16px rgba(26,24,22,0.15)',
              transition: 'background var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--ink-secondary)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--ink)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore Live Collection</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onOpenAuth}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--surface-card)',
              color: 'var(--ink)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-pill)',
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-raised)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface-card)')}
          >
            <span>Join Atelier</span>
          </button>
        </div>
      </section>

      {/* ── Curated Visual Showcase ──────────────────────────────────── */}
      {previewPins.length > 0 && (
        <section
          style={{
            maxWidth: 1500,
            margin: '0 auto',
            padding: '0 24px 72px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              borderBottom: '1px solid var(--rule)',
              paddingBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--ink-secondary)',
              }}
            >
              Recent Archival Entries
            </span>
            <button
              onClick={onExplore}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ink)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              View all ({samplePins.length}) <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {previewPins.map((pin) => (
              <div
                key={pin._id}
                onClick={() => onPinClick(pin)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--rule)',
                  transition: 'transform 0.25s var(--ease), box-shadow 0.25s var(--ease)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(26,24,22,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: 260, overflow: 'hidden', background: 'var(--rule)' }}>
                  <img
                    src={pin.image}
                    alt={pin.imageText}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p
                    className="serif"
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--ink)',
                      margin: 0,
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {pin.imageText || 'Archival Study'}
                  </p>
                  <span style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 4, display: 'block' }}>
                    @{pin.user?.username || 'curator'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Studio Manifesto / Features ─────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
          background: 'var(--surface-card)',
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            padding: '80px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
          }}
        >
          <div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--surface-raised)',
                border: '1px solid var(--rule)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                color: 'var(--ink)',
              }}
            >
              <Zap size={20} />
            </div>
            <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: 'var(--ink)' }}>
              Zero-Egress Edge Storage
            </h3>
            <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
              Direct client-to-R2 presigned pipeline. Image assets bypass application server limits, delivering instant worldwide distribution without egress fees.
            </p>
          </div>

          <div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--surface-raised)',
                border: '1px solid var(--rule)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                color: 'var(--ink)',
              }}
            >
              <Compass size={20} />
            </div>
            <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: 'var(--ink)' }}>
              Editorial Fluidity
            </h3>
            <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
              Asymmetrical masonry layout honoring native image aspect ratios. No forced square crops, no low-resolution compression, no algorithmic manipulation.
            </p>
          </div>

          <div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--surface-raised)',
                border: '1px solid var(--rule)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                color: 'var(--ink)',
              }}
            >
              <Shield size={20} />
            </div>
            <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: 'var(--ink)' }}>
              Independent & Self-Hosted
            </h3>
            <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
              You own your archive and database. An open-architecture REST API built for private studios, design agencies, and discerning individual collectors.
            </p>
          </div>
        </div>
      </section>

      {/* ── Closing Callout ─────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '88px 24px',
          textAlign: 'center',
        }}
      >
        <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, margin: '0 0 16px', color: 'var(--ink)' }}>
          Begin your visual archive.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-secondary)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.6 }}>
          Join Atelier today to upload, curate, and explore visual ideas in an environment designed strictly for high-craft focus.
        </p>
        <button
          onClick={onExplore}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            padding: '14px 36px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.01em',
            boxShadow: '0 4px 16px rgba(230,0,35,0.25)',
          }}
        >
          Enter Gallery
        </button>
      </section>

      {/* ── Editorial Footer ────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--rule)',
          padding: '32px 24px',
          background: 'var(--ground)',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="serif" style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
              Atelier
            </span>
            <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>· Creative Studio Archive</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 12, color: 'var(--ink-secondary)' }}>
            <span>Cloudflare R2 Edge</span>
            <span>React 19</span>
            <span>MongoDB</span>
            <span>Express REST</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
