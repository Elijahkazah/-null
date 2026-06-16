import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing, spring} from 'remotion';
import {theme, glow} from '../theme/palette';
import {ease, sec, type as typeScale, tracking} from '../theme/tokens';
import {Scene} from '../components/Scene';

/**
 * SceneCore — the breathing AI core with orbiting nodes + neural links.
 * Real motion graphics. Core springs in, ring draws, nodes pulse, links glow.
 * Fades fully out at the end — NO sweep, no slash. Clean handoff.
 */
export const SceneCore: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const coreIn = spring({frame: frame - sec(0.3), fps, config: {damping: 200, mass: 1.2}});
  const coreR = 70 * coreIn;
  const breathe = 1 + 0.06 * Math.sin(t * 1.4);
  const haloOpacity = 0.25 + 0.15 * (0.5 + 0.5 * Math.sin(t * 1.4));

  const ringIn = interpolate(frame, [sec(0.8), sec(1.8)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const orbitAngle = t * 14;
  const nodeCount = 6;
  const orbitR = 210;

  const linkOpacity = interpolate(frame, [sec(1.4), sec(2.2)], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // label fades in late
  const labO = interpolate(frame, [sec(3.0), sec(3.8)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labY = interpolate(frame, [sec(3.0), sec(3.8)], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });

  return (
    <Scene fadeIn={sec(0.6)} fadeOut={sec(0.9)}>
      <svg width={900} height={900} viewBox="-450 -450 900 900">
        <circle cx={0} cy={0} r={coreR * 2.4 * breathe} fill={theme.accent} opacity={haloOpacity * coreIn} style={{filter: glow(theme.accent, 0.8)}} />
        <circle cx={0} cy={0} r={orbitR} fill="none" stroke={theme.accent} strokeWidth={1.5} opacity={0.25 * ringIn} strokeDasharray="4 10" />

        {Array.from({length: nodeCount}).map((_, i) => {
          const a = ((i / nodeCount) * 360 + orbitAngle) * (Math.PI / 180);
          const x = Math.cos(a) * orbitR * ringIn;
          const y = Math.sin(a) * orbitR * ringIn;
          return <line key={`l${i}`} x1={0} y1={0} x2={x} y2={y} stroke={theme.accent} strokeWidth={1.5} opacity={linkOpacity} strokeLinecap="round" />;
        })}

        {Array.from({length: nodeCount}).map((_, i) => {
          const a = ((i / nodeCount) * 360 + orbitAngle) * (Math.PI / 180);
          const x = Math.cos(a) * orbitR * ringIn;
          const y = Math.sin(a) * orbitR * ringIn;
          const nodePulse = 5 + 1.5 * Math.sin(t * 2 + i);
          return <circle key={`n${i}`} cx={x} cy={y} r={nodePulse * ringIn} fill={theme.accentHi} opacity={ringIn} style={{filter: glow(theme.accent, 0.5)}} />;
        })}

        <circle cx={0} cy={0} r={coreR * 1.5 * breathe} fill="none" stroke={theme.accent} strokeWidth={2} opacity={0.5 * coreIn} />
        <circle cx={0} cy={0} r={coreR * breathe} fill={theme.accentHi} opacity={0.9 * coreIn} style={{filter: glow(theme.accentHi, 1)}} />
        <circle cx={0} cy={0} r={coreR * 0.45 * breathe} fill={theme.text} opacity={coreIn} />
      </svg>

      <div style={{position: 'absolute', bottom: 200, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{opacity: labO, transform: `translateY(${labY}px)`, textAlign: 'center'}}>
          <div style={{fontSize: typeScale.title, fontWeight: 600, letterSpacing: tracking.title, color: theme.text}}>It begins as a spark</div>
          <div style={{marginTop: 14, fontSize: typeScale.caption, fontWeight: 500, letterSpacing: tracking.label, textTransform: 'uppercase', color: theme.accent}}>The core wakes</div>
        </div>
      </div>
    </Scene>
  );
};
