import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneTension — the problem lands. ONE line, a SLOW intentional push-in.
 * So subtle it reads as "leaning in", never a zoom gimmick. The ONE place we
 * move the camera, and it earns it.
 */
export const SceneTension: React.FC = () => {
  const frame = useCurrentFrame();

  const o = interpolate(frame, [sec(0.6), sec(1.6)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [sec(1), sec(9)], [1.0, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.smooth),
  });

  return (
    <Scene fadeIn={sec(0.7)} fadeOut={sec(0.9)} showParticles={false}>
      <div
        style={{
          opacity: o,
          transform: `scale(${scale})`,
          maxWidth: 1600,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: typeScale.title,
            fontWeight: 600,
            letterSpacing: tracking.title,
            color: theme.text,
            lineHeight: 1.15,
          }}
        >
          But a machine that{' '}
          <span style={{color: theme.accent, filter: glow(theme.accent, 0.4)}}>never forgets</span>{' '}
          can never truly learn.
        </div>
      </div>
    </Scene>
  );
};
