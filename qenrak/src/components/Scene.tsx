import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {theme} from '../theme/palette';
import {ease} from '../theme/tokens';
import {Particles} from './Particles';

/**
 * Scene — the shell every Qenrak scene sits in.
 * Provides: dark canvas, soft radial backlight, atmosphere particles,
 * and automatic fade-in / fade-out so scenes flow fluidly.
 *
 * Children render the focal art (SVG/elements) centered.
 */
export const Scene: React.FC<{
  children: React.ReactNode;
  fadeIn?: number; // frames
  fadeOut?: number; // frames
  showParticles?: boolean;
}> = ({children, fadeIn = 20, fadeOut = 20, showParticles = true}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, width, height} = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.smooth)},
  );

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, opacity}}>
      {/* Soft radial backlight */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${theme.accentDim} 0%, transparent 62%)`,
        }}
      />
      {showParticles ? <Particles width={width} height={height} /> : null}
      {/* Focal content */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
