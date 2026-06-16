import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {CountUp} from '../components/CountUp';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneNumber — the counter LIVES inside a pulsing neural ring.
 * Motion graphics around the data: ring breathes, energy dots orbit, number lands.
 */
export const SceneNumber: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const ringIn = interpolate(frame, [sec(0.4), sec(1.4)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const breathe = 1 + 0.04 * Math.sin(t * 1.5);
  const ringR = 300 * breathe;
  const dotCount = 12;
  const orbit = t * 10;

  const labelO = interpolate(frame, [sec(0.6), sec(1.3)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subO = interpolate(frame, [sec(5), sec(5.8)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Scene fadeIn={sec(0.6)} fadeOut={sec(0.8)} showParticles>
      {/* neural ring behind the number */}
      <svg width={760} height={760} viewBox="-380 -380 760 760" style={{position: 'absolute'}}>
        <circle cx={0} cy={0} r={ringR} fill="none" stroke={theme.accent} strokeWidth={1.5} opacity={0.3 * ringIn} strokeDasharray="2 14" />
        <circle cx={0} cy={0} r={ringR * 0.82} fill="none" stroke={theme.accent} strokeWidth={1} opacity={0.15 * ringIn} />
        {Array.from({length: dotCount}).map((_, i) => {
          const a = ((i / dotCount) * 360 + orbit) * (Math.PI / 180);
          const x = Math.cos(a) * ringR * ringIn;
          const y = Math.sin(a) * ringR * ringIn;
          const pulse = 3 + 1.2 * Math.sin(t * 2 + i);
          return <circle key={i} cx={x} cy={y} r={pulse * ringIn} fill={theme.accentHi} opacity={0.8 * ringIn} style={{filter: glow(theme.accent, 0.4)}} />;
        })}
      </svg>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, zIndex: 1}}>
        <div style={{opacity: labelO, fontSize: typeScale.caption, fontWeight: 500, letterSpacing: tracking.label, textTransform: 'uppercase', color: theme.accent}}>Inside your head</div>
        <CountUp end={100} at={sec(1)} duration={sec(3)} suffix=" B" />
        <div style={{opacity: subO, fontSize: typeScale.body, fontWeight: 400, color: theme.textDim}}>neurons, give or take a few billion.</div>
      </div>
    </Scene>
  );
};
