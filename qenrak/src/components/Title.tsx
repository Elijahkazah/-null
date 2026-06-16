import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease} from '../theme/tokens';

/**
 * Title — Qenrak's signature label.
 * A primary line + a wide-tracked caption, with a thin accent bar that slides out.
 * Fluid entrance: bar draws, then text drifts up and settles.
 *
 * `at` = frame on which the title begins animating in.
 */
export const Title: React.FC<{
  primary: string;
  caption?: string;
  at?: number;
  align?: 'center' | 'left';
}> = ({primary, caption, at = 0, align = 'center'}) => {
  const frame = useCurrentFrame();
  const f = frame - at;

  // Accent bar grows from 0 -> full width
  const barW = interpolate(f, [0, 18], [0, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });

  // Primary text drift up + fade
  const pY = interpolate(f, [6, 28], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const pOpacity = interpolate(f, [6, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Caption follows slightly later
  const cY = interpolate(f, [12, 34], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const cOpacity = interpolate(f, [12, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const alignItems = align === 'center' ? 'center' : 'flex-start';
  const textAlign = align === 'center' ? 'center' : 'left';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems,
        gap: 18,
      }}
    >
      <div
        style={{
          width: barW,
          height: 3,
          background: theme.accent,
          borderRadius: 2,
          filter: glow(theme.accent, 0.6),
        }}
      />
      <div
        style={{
          transform: `translateY(${pY}px)`,
          opacity: pOpacity,
          fontSize: typeScale.title,
          fontWeight: 600,
          letterSpacing: tracking.title,
          color: theme.text,
          textAlign,
          lineHeight: 1.05,
        }}
      >
        {primary}
      </div>
      {caption ? (
        <div
          style={{
            transform: `translateY(${cY}px)`,
            opacity: cOpacity,
            fontSize: typeScale.caption,
            fontWeight: 500,
            letterSpacing: tracking.label,
            color: theme.accent,
            textTransform: 'uppercase',
            textAlign,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};
