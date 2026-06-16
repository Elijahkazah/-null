import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {theme, glow} from '../theme/palette';
import {ease} from '../theme/tokens';

/**
 * Bloom — a soft expanding ring. Optional accent on big reveals or handoffs.
 * Much gentler than the old hard iris-bloom: thin, fades fast.
 */
export const Bloom: React.FC<{at?: number; durationInFrames?: number; maxR?: number}> = ({
  at = 0,
  durationInFrames = 28,
  maxR = 900,
}) => {
  const frame = useCurrentFrame();
  const f = frame - at;

  const r = interpolate(f, [0, durationInFrames], [0, maxR], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.out),
  });
  const opacity = interpolate(f, [0, 2, durationInFrames], [0, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const strokeW = interpolate(f, [0, durationInFrames], [10, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none', alignItems: 'center', justifyContent: 'center'}}>
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
        <circle
          cx="50%"
          cy="50%"
          r={r}
          fill="none"
          stroke={theme.accent}
          strokeWidth={strokeW}
          opacity={opacity}
          style={{filter: glow(theme.accent, 0.5)}}
        />
      </svg>
    </AbsoluteFill>
  );
};
