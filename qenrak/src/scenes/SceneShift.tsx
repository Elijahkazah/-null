import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneShift — one idea becomes another. "REMEMBER" → "FORGET".
 * A clean, intentional handoff. No slash, no swipe. Never overlapping mid-air.
 */
const BigWord: React.FC<{text: string; show: number; hide: number}> = ({text, show, hide}) => {
  const frame = useCurrentFrame();

  const inO = interpolate(frame, [show, show + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const inY = interpolate(frame, [show, show + 22], [22, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const outO = interpolate(frame, [hide - 18, hide], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(inO, outO);

  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        transform: `translateY(${inY}px)`,
        fontSize: typeScale.hero,
        fontWeight: 600,
        letterSpacing: tracking.hero,
        color: theme.text,
        filter: glow(theme.accent, 0.5),
      }}
    >
      {text}
    </div>
  );
};

export const SceneShift: React.FC = () => {
  return (
    <Scene fadeIn={sec(0.7)} fadeOut={sec(0.8)} showParticles>
      <div style={{position: 'relative', height: 200, display: 'flex', alignItems: 'center'}}>
        <BigWord text="REMEMBER" show={sec(0.8)} hide={sec(5)} />
        <BigWord text="FORGET" show={sec(5.2)} hide={sec(10)} />
      </div>
    </Scene>
  );
};
