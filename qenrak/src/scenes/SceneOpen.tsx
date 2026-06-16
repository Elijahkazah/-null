import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {theme, glow} from '../theme/palette';
import {type as typeScale, tracking, ease, sec} from '../theme/tokens';

/**
 * SceneOpen — cold open. A single line of light draws across, the title rises
 * from it. Subtle motion, sets the tone (not a static board).
 */
export const SceneOpen: React.FC = () => {
  const frame = useCurrentFrame();

  const lineW = interpolate(frame, [sec(0.4), sec(1.6)], [0, 520], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.drift)});
  const titleO = interpolate(frame, [sec(1.2), sec(2.2)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const titleY = interpolate(frame, [sec(1.2), sec(2.2)], [22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.drift)});
  const capO = interpolate(frame, [sec(2.0), sec(2.8)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Scene fadeIn={sec(0.7)} fadeOut={sec(0.9)}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <div style={{width: lineW, height: 2, background: theme.accent, borderRadius: 2, filter: glow(theme.accent, 0.6)}} />
        <div style={{opacity: titleO, transform: `translateY(${titleY}px)`, fontSize: typeScale.title, fontWeight: 600, letterSpacing: tracking.title, color: theme.text, textAlign: 'center'}}>
          The machine that learned to forget
        </div>
        <div style={{opacity: capO, fontSize: typeScale.caption, fontWeight: 500, letterSpacing: tracking.label, textTransform: 'uppercase', color: theme.accent}}>Episode 01</div>
      </div>
    </Scene>
  );
};
