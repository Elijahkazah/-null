import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneShift — a constellation of nodes SCATTERS and REFORMS as the idea
 * changes (REMEMBER -> FORGET). Motion graphics carry the meaning, the words
 * ride on top. The first word fades fully out before the second fades in.
 */
const NODES = 22;

// two deterministic formations (remember = tight cluster, forget = dispersed)
const makeFormation = (seed: number, spread: number) => {
  let s = seed;
  const rn = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({length: NODES}, () => ({
    x: (rn() - 0.5) * spread,
    y: (rn() - 0.5) * spread,
  }));
};

const FORM_A = makeFormation(4111, 260); // remember: tighter
const FORM_B = makeFormation(8233, 620); // forget: scattered

const BigWord: React.FC<{text: string; show: number; hide: number}> = ({text, show, hide}) => {
  const frame = useCurrentFrame();
  const inO = interpolate(frame, [show, show + 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const inY = interpolate(frame, [show, show + 22], [20, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.drift)});
  const outO = interpolate(frame, [hide - 18, hide], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', opacity: Math.min(inO, outO), transform: `translateY(${inY}px)`, fontSize: typeScale.hero, fontWeight: 600, letterSpacing: tracking.hero, color: theme.text, filter: glow(theme.accent, 0.5)}}>
      {text}
    </div>
  );
};

export const SceneShift: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  // morph from formation A -> B across the middle of the scene
  const morph = interpolate(frame, [sec(4.2), sec(6.2)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.smooth),
  });
  const appear = interpolate(frame, [sec(0.5), sec(1.5)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Scene fadeIn={sec(0.6)} fadeOut={sec(0.8)} showParticles={false}>
      <svg width={900} height={700} viewBox="-450 -350 900 700" style={{position: 'absolute'}}>
        {FORM_A.map((a, i) => {
          const b = FORM_B[i];
          const x = a.x + (b.x - a.x) * morph;
          const y = a.y + (b.y - a.y) * morph;
          const wob = 4 + 1.5 * Math.sin(t * 1.6 + i);
          // links only while clustered (remember) — fade as it disperses
          const linkO = (1 - morph) * 0.35 * appear;
          const next = FORM_A[(i + 1) % NODES];
          const nb = FORM_B[(i + 1) % NODES];
          const nx = next.x + (nb.x - next.x) * morph;
          const ny = next.y + (nb.y - next.y) * morph;
          return (
            <g key={i}>
              {linkO > 0.01 ? <line x1={x} y1={y} x2={nx} y2={ny} stroke={theme.accent} strokeWidth={1} opacity={linkO} /> : null}
              <circle cx={x} cy={y} r={wob * appear} fill={theme.accentHi} opacity={appear} style={{filter: glow(theme.accent, 0.4)}} />
            </g>
          );
        })}
      </svg>

      <div style={{position: 'relative', height: 180, display: 'flex', alignItems: 'center'}}>
        <BigWord text="REMEMBER" show={sec(0.8)} hide={sec(4.6)} />
        <BigWord text="FORGET" show={sec(5.6)} hide={sec(10)} />
      </div>
    </Scene>
  );
};
