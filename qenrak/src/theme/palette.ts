/**
 * QENRAK — Theme System
 * ----------------------
 * Clean Futurist palettes. ONE dark canvas + ONE hero accent + warm white text.
 * Restraint = premium. Swap the active palette in ONE place (see ACTIVE_PALETTE).
 *
 * To change the whole channel's look: edit ACTIVE_PALETTE below.
 * To compare them all side-by-side: render the `PalettePreview` composition.
 */

export type PaletteName = 'signal' | 'phosphor' | 'ember' | 'indigo';

export interface Palette {
  name: PaletteName;
  label: string;
  /** Near-black canvas. */
  bg: string;
  /** Slightly lifted panel/surface tone. */
  surface: string;
  /** The single hero accent. */
  accent: string;
  /** A brighter tint of the accent for highlights/cores. */
  accentHi: string;
  /** A dim tint of the accent for faint structure (grids, particles). */
  accentDim: string;
  /** Warm white — primary text. */
  text: string;
  /** Muted text for captions/labels. */
  textDim: string;
  /** Danger / break state (used sparingly). */
  danger: string;
}

export const PALETTES: Record<PaletteName, Palette> = {
  // 1 — SIGNAL: calm AI, icy cyan. Default. ("Her" / Arrival energy)
  signal: {
    name: 'signal',
    label: 'Signal',
    bg: '#0A0E12',
    surface: '#10161C',
    accent: '#6FE3D2',
    accentHi: '#B8F5EC',
    accentDim: 'rgba(111, 227, 210, 0.16)',
    text: '#EAF2F0',
    textDim: 'rgba(234, 242, 240, 0.55)',
    danger: '#FF6B6B',
  },

  // 2 — PHOSPHOR: your terminal roots, refined. Muted green, less neon.
  phosphor: {
    name: 'phosphor',
    label: 'Phosphor',
    bg: '#080B0A',
    surface: '#0E1411',
    accent: '#4DE08A',
    accentHi: '#A8F5C8',
    accentDim: 'rgba(77, 224, 138, 0.16)',
    text: '#ECFDF3',
    textDim: 'rgba(236, 253, 243, 0.55)',
    danger: '#FF5C5C',
  },

  // 3 — EMBER: human, philosophical. Warm amber, "thinking by firelight".
  ember: {
    name: 'ember',
    label: 'Ember',
    bg: '#0C0A09',
    surface: '#15110E',
    accent: '#F5B872',
    accentHi: '#FBD9AE',
    accentDim: 'rgba(245, 184, 114, 0.16)',
    text: '#F5EFE7',
    textDim: 'rgba(245, 239, 231, 0.55)',
    danger: '#FF7A6B',
  },

  // 4 — INDIGO: modern, cerebral, futuristic. Soft electric indigo.
  indigo: {
    name: 'indigo',
    label: 'Indigo',
    bg: '#0A0A14',
    surface: '#101022',
    accent: '#8B9BFF',
    accentHi: '#C3CBFF',
    accentDim: 'rgba(139, 155, 255, 0.16)',
    text: '#EDEEF7',
    textDim: 'rgba(237, 238, 247, 0.55)',
    danger: '#FF6B8B',
  },
};

/**
 * 👉 CHANGE YOUR CHANNEL LOOK HERE.
 * Set to 'signal' | 'phosphor' | 'ember' | 'indigo'.
 */
export const ACTIVE_PALETTE: PaletteName = 'signal';

export const theme = PALETTES[ACTIVE_PALETTE];

/** Helper: build a soft neon glow filter string for a given color. */
export const glow = (color: string, intensity = 1): string =>
  [
    `drop-shadow(0 0 ${6 * intensity}px ${color})`,
    `drop-shadow(0 0 ${20 * intensity}px ${color})`,
    `drop-shadow(0 0 ${60 * intensity}px ${color})`,
  ].join(' ');
