import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {theme} from '../theme/palette';
import {ease} from '../theme/tokens';

/**
 * LightSweep — Qenrak's signature transition beat.
 * A soft diagonal band of light passes across the frame.
 * Gentle, not a harsh flash. Use at scene handoffs.
 *
 * `at` = frame the sweep starts. `durationInFrames` = how long it takes to cross.
 */
export const LightSweep: React.FC<{at?: number; durationInFrames?: number}> = ({
  at = 0,
  durationInFrames = 30,
}) => {
  const frame = useCurrentFrame();
  const f = frame - at;

  const progress = interpolate(f, [0, durationInFrames], [-30, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.smooth),
  });

  const opacity = interpolate(
    f,
    [0, 4, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          bottom: '-20%',
          left: `${progress}%`,
          width: '26%',
          transform: 'rotate(8deg)',
          mixBlendMode: 'screen',
          opacity,
          background: `linear-gradient(105deg, transparent 0%, ${theme.accentDim} 42%, ${theme.accentHi} 50%, ${theme.accentDim} 58%, transparent 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
