import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneClose — the outro. Wordmark settles, caption holds. Calm ending.
 */
export const SceneClose: React.FC = () => {
  const frame = useCurrentFrame();

  const y = interpolate(frame, [sec(0.6), sec(1.6)], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const o = interpolate(frame, [sec(0.6), sec(1.6)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const capO = interpolate(frame, [sec(1.4), sec(2.2)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Scene fadeIn={sec(0.8)} fadeOut={sec(1.0)} showParticles>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
        <div
          style={{
            opacity: o,
            transform: `translateY(${y}px)`,
            fontSize: typeScale.hero,
            fontWeight: 600,
            letterSpacing: tracking.hero,
            color: theme.text,
            filter: glow(theme.accent, 0.5),
          }}
        >
          QENRAK
        </div>
        <div
          style={{
            opacity: capO,
            fontSize: typeScale.caption,
            fontWeight: 500,
            letterSpacing: tracking.label,
            textTransform: 'uppercase',
            color: theme.accent,
          }}
        >
          Think in systems
        </div>
      </div>
    </Scene>
  );
};
