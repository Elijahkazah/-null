import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {PALETTES, PaletteName, glow} from '../theme/palette';
import {ease} from '../theme/tokens';

/**
 * PalettePreview — all 4 palettes side-by-side.
 * Render this (npm run render:palettes) or open it in the Studio to pick
 * your channel look. Then set ACTIVE_PALETTE in theme/palette.ts.
 */
const order: PaletteName[] = ['signal', 'phosphor', 'ember', 'indigo'];

const Swatch: React.FC<{name: PaletteName; index: number}> = ({name, index}) => {
  const frame = useCurrentFrame();
  const p = PALETTES[name];

  const appear = interpolate(frame, [index * 8, index * 8 + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const y = interpolate(appear, [0, 1], [30, 0]);

  // breathing core demo
  const t = frame / 30;
  const breathe = 1 + 0.08 * Math.sin(t * 1.6 + index);

  return (
    <div
      style={{
        flex: 1,
        margin: 24,
        borderRadius: 20,
        background: p.bg,
        border: `1px solid ${p.accentDim}`,
        opacity: appear,
        transform: `translateY(${y}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* backlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${p.accentDim} 0%, transparent 65%)`,
        }}
      />
      {/* demo core */}
      <div
        style={{
          width: 120 * breathe,
          height: 120 * breathe,
          borderRadius: '50%',
          background: p.accentHi,
          filter: glow(p.accent, 1),
        }}
      />
      <div
        style={{
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: p.text,
          zIndex: 1,
        }}
      >
        {p.label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: p.accent,
          zIndex: 1,
        }}
      >
        {p.name}
      </div>
    </div>
  );
};

export const PalettePreview: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000', flexDirection: 'row', alignItems: 'stretch'}}>
      {order.map((name, i) => (
        <Swatch key={name} name={name} index={i} />
      ))}
    </AbsoluteFill>
  );
};
