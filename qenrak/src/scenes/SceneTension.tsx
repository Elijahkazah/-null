import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneTension — a neural web that OVER-connects: links keep multiplying and
 * tightening ("can't forget"). The visual strains while the line lands.
 * ONE slow push-in. The tangle = the problem.
 */
const N = 9;
const makePts = (seed: number) => {
  let s = seed;
  const rn = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({length: N}, () => ({x: (rn() - 0.5) * 720, y: (rn() - 0.5) * 420}));
};
const PTS = makePts(5519);

export const SceneTension: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const o = interpolate(frame, [sec(0.6), sec(1.6)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = interpolate(frame, [sec(1), sec(9)], [1.0, 1.06], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.smooth)});

  // how many links are active grows over time = over-connection
  const density = interpolate(frame, [sec(1.5), sec(8)], [0.15, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.smooth)});

  const textO = interpolate(frame, [sec(3.5), sec(4.5)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Scene fadeIn={sec(0.7)} fadeOut={sec(0.9)} showParticles={false}>
      <div style={{transform: `scale(${scale})`, position: 'absolute'}}>
        <svg width={900} height={620} viewBox="-450 -310 900 620" style={{opacity: o}}>
          {PTS.map((p, i) =>
            PTS.map((q, j) => {
              if (j <= i) return null;
              const idx = i * N + j;
              const on = (idx % 11) / 11 < density; // progressively more links light up
              if (!on) return null;
              const flicker = 0.18 + 0.12 * (0.5 + 0.5 * Math.sin(t * 3 + idx));
              return <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={theme.accent} strokeWidth={1} opacity={flicker} />;
            }),
          )}
          {PTS.map((p, i) => {
            const pulse = 4 + 1.5 * Math.sin(t * 2 + i);
            return <circle key={i} cx={p.x} cy={p.y} r={pulse} fill={theme.accentHi} opacity={0.9} style={{filter: glow(theme.accent, 0.4)}} />;
          })}
        </svg>
      </div>

      <div style={{transform: `scale(${scale})`, maxWidth: 1500, textAlign: 'center', opacity: textO, zIndex: 1}}>
        <div style={{fontSize: typeScale.title, fontWeight: 600, letterSpacing: tracking.title, color: theme.text, lineHeight: 1.15}}>
          But a mind that{' '}
          <span style={{color: theme.accent, filter: glow(theme.accent, 0.4)}}>never forgets</span>{' '}
          can never truly learn.
        </div>
      </div>
    </Scene>
  );
};
