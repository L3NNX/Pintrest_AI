# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hobbyists and creatives who want to discover, save, and share visual inspiration — images, art, photography, and design ideas. They browse passively and also upload their own finds. They are on desktop and mobile, expect fast image loading, and judge the product by its feel as much as its features.

## Product Purpose

Pintrest AI is a self-hosted visual inspiration board with AI-powered enhancement. It lets users browse a masonry feed of pins, upload images directly to Cloudflare R2 storage, like and save pins, and manage a personal profile. AI features (auto-tagging, smart captions) add discoverability and reduce friction at upload time. Success means a feed that loads fast, looks beautiful, and makes uploading effortless.

## Positioning

AI-powered auto-tagging and smart captions at upload time, Cloudflare R2 for zero-egress global image delivery, and a fully self-hosted open architecture — things the real Pinterest cannot offer to developers who want control.

## Operating Context

- Users browse a masonry grid feed of image pins on the home screen
- Logged-in users can upload images (direct-to-R2 presigned URL flow) with a caption
- Users can like pins and view a detail overlay without leaving the feed
- Profile view shows the user's own created pins
- Auth via username/password session (passport-local-mongoose)
- Backend: Express REST API on Node.js, MongoDB, Cloudflare R2
- Frontend: React 19, TypeScript, Vite, Tailwind CSS v4

## Capabilities and Constraints

- Image upload: browser → presigned URL → PUT directly to R2 → POST /api/posts
- Feed: public, paginated by newest, populated with user metadata
- Likes: optimistic update on the client, persisted to MongoDB
- Auth: session-cookie based; no OAuth or social login yet
- Boards feature: not yet built (planned Phase 4)
- AI tagging / captions: not yet built (planned Phase 5)
- No infinite scroll yet — full feed load on mount
- R2 public URL requires Cloudflare R2.dev subdomain to be enabled

## Brand Commitments

- Product name: **Pintrest AI**
- No inherited visual constraints — greenfield visual identity
- The existing red (#e60023) in the codebase is a starting point, not a lock

## Evidence on Hand

- Full working codebase at `e:\Productivity\React\Pintrest`
- 6 seed posts in MongoDB (Unsplash images, demo_user account)
- Components: Navbar, MasonryGrid, PinCard, PinModal, CreatePinModal, ProfileView, AuthModal
- Build: `npm run build:client` passes (2058 modules, 256 KB JS)
- No real user data, no analytics, no production deployment yet

## Product Principles

1. **Speed is a feature.** Images load from the edge; every interaction feels instant.
2. **AI reduces friction, not control.** Auto-tagging and captions are suggestions, never overrides.
3. **The feed is the product.** Visual quality of the grid is the primary impression and must be defended at every change.
4. **Open by design.** Self-hosted, no lock-in, documented API — the architecture is part of the value proposition.
5. **Earn the name.** "AI" in the name must be visible and useful, not marketing.

## Accessibility & Inclusion

No formal accessibility standard confirmed yet. Standard web baseline (keyboard nav, alt text on images, sufficient contrast) is assumed as a floor.

