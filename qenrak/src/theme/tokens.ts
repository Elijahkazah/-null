/**
 * QENRAK — Design tokens
 * Typography scale, spacing, easing, and timing.
 * Keep motion FLUID: long eases, things that drift and settle.
 */

// ---- Canvas ----
export const FPS = 30;
export const WIDTH = 2560; // 2K
export const HEIGHT = 1440; // 16:9

// ---- Type ----
// Display = condensed grotesk for big moments. Body = clean grotesk.
export const FONT_DISPLAY_WEIGHT = 600;
export const FONT_BODY_WEIGHT = 400;

export const type = {
  hero: 132, // huge single-word moments
  title: 84,
  heading: 56,
  body: 34,
  caption: 22,
  micro: 16,
} as const;

export const tracking = {
  hero: '-0.02em',
  title: '-0.01em',
  label: '0.34em', // wide caps for that signature label feel
} as const;

// ---- Spacing ----
export const space = (n: number) => n * 8;

// ---- Easing (Bezier control points) ----
// Fluid, premium curves. Use with Remotion's interpolate easing or spring.
export const ease = {
  // smooth in/out — the workhorse
  smooth: [0.45, 0, 0.15, 1] as const,
  // gentle entrance — drift in and settle
  drift: [0.22, 1, 0.36, 1] as const,
  // soft exit
  out: [0.33, 0, 0.67, 1] as const,
} as const;

// ---- Timing (in seconds) ----
export const time = {
  fadeIn: 0.8,
  hold: 1.2,
  fadeOut: 0.8,
  transition: 1.0, // cross-scene
} as const;

export const sec = (s: number) => Math.round(s * FPS);
