# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hobbyists and creatives who want to discover, save, and share visual inspiration — images, art, photography, and design ideas. They browse passively and also upload their own finds. They are on desktop and mobile, expect fast image loading, and judge the product by its feel as much as its features.

## Product Purpose

Atelier is an independent, self-hosted visual studio and archive for creative collectors. It lets curators discover and archive photographic studies, architecture, and graphic arts, stream uploads directly to Cloudflare R2 edge storage, organize personal boards, and manage a studio profile. Success means an interface with high-craft restraint that recedes and lets the visual work lead.

## Positioning

Editorial craft and private collection focus over algorithmic noise. Direct-to-R2 edge streaming for zero-egress worldwide distribution, combined with visual intelligence and an open self-hosted architecture.

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

- Product name: **Atelier**
- Visual world: **The Editorial Magazine Grid** (warm cream `#faf8f4`, hairline dividers `#e2ddd7`, Playfair Display serif typography)
- Monogram: Geometric studio mark "A" in warm ink
- Action accent: `#e60023` reserved strictly for commitment moments (Save, Sign In)

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

