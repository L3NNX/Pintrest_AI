---
name: Atelier
description: Self-hosted visual studio and archive for creative collectors with Cloudflare R2 edge storage.
colors:
  ground: "#faf8f4"
  ground-hover: "#f3f0eb"
  ink: "#1a1816"
  ink-secondary: "#5c554e"
  ink-muted: "#9c9289"
  rule: "#e2ddd7"
  accent: "#e60023"
  accent-deep: "#b8001c"
  surface-card: "#ffffff"
  surface-raised: "#f7f4ef"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  pill: "9999px"
  card: "16px"
  sm: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "36px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
  button-primary-saved:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    padding: "7px 16px"
  nav-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "7px 16px"
  pin-card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.card}"
  modal:
    backgroundColor: "{colors.surface-card}"
    rounded: "20px"
---

# Design System: Atelier

## Overview

**Creative North Star: "The Editorial Magazine Grid"**

Atelier presents itself as a curated visual culture publication — Monocle, Kinfolk, and art catalogue sensibilities brought to a real-time web application. The ground is a warm editorial cream (`#faf8f4`), hairlines dividers (`#e2ddd7`) provide structural poise without heavy borders, and titles are typeset in `Playfair Display`. The action red (`#e60023`) is preserved strictly as the primary commitment signal: the Save button and Sign In CTA.

Surfaces breathe with generous 20–24px card gutters and natural aspect ratios. Modals are designed like gallery spreads with deep contrast and editorial typography.

**Key Characteristics:**
- Warm cream background (`#faf8f4`) with warm ink type (`#1a1816`)
- Playfair Display serif for headlines and pin captions; clean system sans for UI copy
- 1px hairline dividers (`#e2ddd7`) replacing heavy grey outlines
- Pill-shaped controls and 16px rounded card corners
- Action red (`#e60023`) reserved exclusively for user commitment

## Colors

### Primary
- **Action Red** (`#e60023`): The Save button, Log In CTA, and active liked state.
- **Action Red Deep** (`#b8001c`): Hover state for Action Red.

### Neutrals
- **Ground Cream** (`#faf8f4`): The main atmospheric page background.
- **Surface Card** (`#ffffff`): Modal and elevated panel surfaces.
- **Surface Raised** (`#f7f4ef`): Secondary interactive chips and inputs.
- **Ink Black** (`#1a1816`): Primary typography and dark action states.
- **Ink Secondary** (`#5c554e`): Supporting text and metadata.
- **Ink Muted** (`#9c9289`): Timestamps, captions, and placeholders.
- **Rule Hairline** (`#e2ddd7`): Thin elegant borders and structural dividers.

### Named Rules
**The One Red Rule.** `#e60023` appears on only the active commitment elements (Save, Log In, Liked heart). Its scarcity maintains high click-through intentionality.

**The Editorial Ground Rule.** The background is always warm cream (`#faf8f4`), never pure clinical `#ffffff` or grey `#f4f4f5`.

## Typography

**Headings & Captions:** `Playfair Display, Georgia, serif`
**Interface & Body:** `ui-sans-serif, system-ui, sans-serif`

### Hierarchy
- **Display** (700, 2rem / 32px, lh 1.2, ls −0.02em): Profile names and modal pin titles.
- **Headline** (700, 1.5rem / 24px, lh 1.3): Section headers and modal subtitles.
- **Title** (700, 0.875rem / 14px, lh 1.35): Pin captions in the grid.
- **Body** (400, 0.9375rem / 15px, lh 1.6): Descriptions, form labels, and instructions.
- **Label** (500, 0.75rem / 12px, lh 1.4): User handles and timestamps.

## Layout

- Responsive multi-column masonry (2 to 6 columns based on viewport) with 20px gap.
- Centered 1600px max container for comfortable desktop reading and high-density browsing.
- Sticky 64px frosted glass navbar with `backdrop-filter: blur(12px)`.

## Elevation & Depth

- **Rest:** Flat by default with 1px hairline rules.
- **Hover:** Smooth image brightness shift (0.93) with overlay scrim `rgba(26,24,22,0.22)`.
- **Modals:** Deep diffuse lift (`0 24px 48px -12px rgba(26, 24, 22, 0.25)`).

## Components

- **Navbar:** Sticky cream bar with Playfair logo, pill tabs, expanding search, and user menu.
- **PinCard:** Natural aspect ratio, subtle hover overlay with pill Save and Like buttons, serif caption underneath.
- **PinModal:** 2-column gallery presentation: dark gallery mat on left, editorial details on right.
- **CreatePinModal:** Direct-to-R2 upload with clean dashed dropzone and upload status tracking.
- **ProfileView:** Clean curator dashboard with circular portrait, serif full name, and created pins grid.
- **AuthModal:** Compact credentials card with password visibility toggle.

## Do's and Don'ts

### Do:
- **Do** use `Playfair Display` for captions and headers.
- **Do** keep borders to 1px `#e2ddd7` hairlines.
- **Do** reserve `#e60023` for primary CTAs.
- **Do** use `border-radius: var(--radius-pill)` on interactive controls.

### Don't:
- **Don't** add heavy drop shadows at rest.
- **Don't** use cold clinical blue-greys on backgrounds.
- **Don't** use gradient text or decorative banners.
