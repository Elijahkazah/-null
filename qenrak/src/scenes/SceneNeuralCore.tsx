import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing, spring} from 'remotion';
import {theme, glow} from '../theme/palette';
import {ease, sec} from '../theme/tokens';
import {Scene} from '../components/Scene';
import {Title} from '../components/Title';
import {LightSweep} from '../components/LightSweep';

/**
 * SCENE — Neural Core
 * A soft, breathing AI "core" with orbiting nodes.
 * Demonstrates the fluid style: things ease in, drift, and settle.
 * Replaces the old snappy pop-ins with smooth springs.
 */
export const SceneNeuralCore: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const t = frame / fps;

  // Core scales in with a gentle spring
  const coreIn = spring({frame: frame - sec(0.3), fps, config: {damping: 200, mass: 1.2}});
  const coreR = 70 * coreIn;

  // Slow continuous breathing on the core
  const breathe = 1 + 0.06 * Math.sin(t * 1.4);

  // Halo pulse
  const haloOpacity = 0.25 + 0.15 * (0.5 + 0.5 * Math.sin(t * 1.4));

  // 6 orbiting nodes — ring draws in, then rotates slowly
  const ringIn = interpolate(frame, [sec(0.8), sec(1.8)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const orbitAngle = t * 14; // deg/sec, slow
  const nodeCount = 6;
  const orbitR = 210;

  // Connecting lines fade in after nodes
  const linkOpacity = interpolate(frame, [sec(1.4), sec(2.2)], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Scene>
      <svg width={900} height={900} viewBox="-450 -450 900 900">
        {/* Halo */}
        <circle cx={0} cy={0} r={coreR * 2.4 * breathe} fill={theme.accent} opacity={haloOpacity * coreIn} style={{filter: glow(theme.accent, 0.8)}} />

        {/* Orbit ring guide */}
        <circle cx={0} cy={0} r={orbitR} fill="none" stroke={theme.accent} strokeWidth={1.5} opacity={0.25 * ringIn} strokeDasharray="4 10" />

        {/* Links from core to nodes */}
        {Array.from({length: nodeCount}).map((_, i) => {
          const a = ((i / nodeCount) * 360 + orbitAngle) * (Math.PI / 180);
          const x = Math.cos(a) * orbitR * ringIn;
          const y = Math.sin(a) * orbitR * ringIn;
          return (
            <line key={`l${i}`} x1={0} y1={0} x2={x} y2={y} stroke={theme.accent} strokeWidth={1.5} opacity={linkOpacity} strokeLinecap="round" />
          );
        })}

        {/* Nodes */}
        {Array.from({length: nodeCount}).map((_, i) => {
          const a = ((i / nodeCount) * 360 + orbitAngle) * (Math.PI / 180);
          const x = Math.cos(a) * orbitR * ringIn;
          const y = Math.sin(a) * orbitR * ringIn;
          const nodePulse = 5 + 1.5 * Math.sin(t * 2 + i);
          return (
            <circle key={`n${i}`} cx={x} cy={y} r={nodePulse * ringIn} fill={theme.accentHi} opacity={ringIn} style={{filter: glow(theme.accent, 0.5)}} />
          );
        })}

        {/* Core */}
        <circle cx={0} cy={0} r={coreR * 1.5 * breathe} fill="none" stroke={theme.accent} strokeWidth={2} opacity={0.5 * coreIn} />
        <circle cx={0} cy={0} r={coreR * breathe} fill={theme.accentHi} opacity={0.9 * coreIn} style={{filter: glow(theme.accentHi, 1)}} />
        <circle cx={0} cy={0} r={coreR * 0.45 * breathe} fill={theme.text} opacity={coreIn} />
      </svg>

      {/* Label */}
      <div style={{position: 'absolute', bottom: 220, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Title primary="INTELLIGENCE" caption="THE CORE WAKES" at={sec(2.6)} />
      </div>

      {/* Handoff sweep near the end */}
      <LightSweep at={durationInFrames - sec(1.0)} durationInFrames={sec(0.9)} />
    </Scene>
  );
};
