import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {CountUp} from '../components/CountUp';
import {theme} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneNumber — "Your brain holds 100 billion neurons."
 * Nothing else moves while it counts. You're AT the number.
 */
export const SceneNumber: React.FC = () => {
  const frame = useCurrentFrame();

  const labelO = interpolate(frame, [sec(0.5), sec(1.2)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelY = interpolate(frame, [sec(0.5), sec(1.2)], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });

  const subO = interpolate(frame, [sec(5), sec(5.8)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subY = interpolate(frame, [sec(5), sec(5.8)], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });

  return (
    <Scene fadeIn={sec(0.7)} fadeOut={sec(0.8)}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28}}>
        <div
          style={{
            opacity: labelO,
            transform: `translateY(${labelY}px)`,
            fontSize: typeScale.caption,
            fontWeight: 500,
            letterSpacing: tracking.label,
            textTransform: 'uppercase',
            color: theme.accent,
          }}
        >
          Inside your head
        </div>

        <CountUp end={100} at={sec(1)} duration={sec(3)} suffix=" B" />

        <div
          style={{
            opacity: subO,
            transform: `translateY(${subY}px)`,
            fontSize: typeScale.body,
            fontWeight: 400,
            color: theme.textDim,
            letterSpacing: '0.01em',
          }}
        >
          neurons, give or take a few billion.
        </div>
      </div>
    </Scene>
  );
};
