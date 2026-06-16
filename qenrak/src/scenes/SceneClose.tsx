import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing, spring} from 'remotion';
import {Scene} from '../components/Scene';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneClose — the web collapses to a single calm point, which becomes the
 * QENRAK wordmark. Visual payoff -> brand. Final fade to black.
 */
export const SceneClose: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  // a point of light pulses, then the wordmark rises from it
  const coreIn = spring({frame: frame - sec(0.4), fps, config: {damping: 200, mass: 1}});
  const pointR = (10 + 4 * Math.sin(t * 2)) * coreIn;
  const pointFade = interpolate(frame, [sec(2.2), sec(3.2)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const y = interpolate(frame, [sec(1.6), sec(2.6)], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.drift)});
  const o = interpolate(frame, [sec(1.6), sec(2.6)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const capO = interpolate(frame, [sec(2.6), sec(3.4)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Scene fadeIn={sec(0.8)} fadeOut={sec(1.0)} showParticles>
      <svg width={400} height={400} viewBox="-200 -200 400 400" style={{position: 'absolute'}}>
        <circle cx={0} cy={0} r={pointR} fill={theme.accentHi} opacity={pointFade} style={{filter: glow(theme.accentHi, 1)}} />
      </svg>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, zIndex: 1}}>
        <div style={{opacity: o, transform: `translateY(${y}px)`, fontSize: typeScale.hero, fontWeight: 600, letterSpacing: tracking.hero, color: theme.text, filter: glow(theme.accent, 0.5)}}>QENRAK</div>
        <div style={{opacity: capO, fontSize: typeScale.caption, fontWeight: 500, letterSpacing: tracking.label, textTransform: 'uppercase', color: theme.accent}}>Think in systems</div>
      </div>
    </Scene>
  );
};
