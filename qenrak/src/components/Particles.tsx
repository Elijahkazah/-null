import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {theme} from '../theme/palette';

/**
 * Atmosphere particles — slow, soft, deterministic dust.
 * No jittery flicker. Drifts gently to add depth without distraction.
 */

type Particle = {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  driftX: number;
  driftY: number;
  speed: number;
  phase: number;
};

// Seeded PRNG so particles are identical every render (no flicker between frames).
const makeParticles = (count: number, w: number, h: number): Particle[] => {
  let s = 9173;
  const rn = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({length: count}, () => ({
    x: rn() * w,
    y: rn() * h,
    r: rn() * 1.7 + 0.4,
    baseOpacity: 0.06 + rn() * 0.18,
    driftX: (rn() - 0.5) * 40,
    driftY: (rn() - 0.5) * 40,
    speed: 0.15 + rn() * 0.25,
    phase: rn() * Math.PI * 2,
  }));
};

export const Particles: React.FC<{count?: number; width?: number; height?: number}> = ({
  count = 48,
  width = 2560,
  height = 1440,
}) => {
  const frame = useCurrentFrame();
  const particles = React.useMemo(
    () => makeParticles(count, width, height),
    [count, width, height],
  );
  const t = frame / 30;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        {particles.map((p, i) => {
          const wobble = Math.sin(t * p.speed + p.phase);
          const cx = p.x + p.driftX * wobble;
          const cy = p.y + p.driftY * Math.cos(t * p.speed + p.phase);
          const op = p.baseOpacity * (0.6 + 0.4 * (0.5 + 0.5 * wobble));
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={p.r}
              fill={theme.accent}
              opacity={op}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
