import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {Scene} from '../components/Scene';
import {Title} from '../components/Title';
import {theme} from '../theme/palette';
import {type as typeScale, ease, sec} from '../theme/tokens';

/**
 * SceneBreakdown — three reasons, revealed one at a time, then held.
 * Each row slides in from a touch left + fades. Calm, list-like, intentional.
 */
const Row: React.FC<{index: number; n: string; text: string; at: number}> = ({n, text, at}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(frame, [at, at + 24], [-26, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });

  return (
    <div
      style={{
        opacity: o,
        transform: `translateX(${x}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
      }}
    >
      <div
        style={{
          fontSize: typeScale.heading,
          fontWeight: 600,
          color: theme.accent,
          letterSpacing: '-0.01em',
          minWidth: 70,
        }}
      >
        {n}
      </div>
      <div style={{fontSize: typeScale.body, fontWeight: 400, color: theme.text}}>{text}</div>
    </div>
  );
};

export const SceneBreakdown: React.FC = () => {
  return (
    <Scene fadeIn={sec(0.7)} fadeOut={sec(0.8)}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 40}}>
        <Title primary="Why forgetting helps" caption="Three reasons" at={sec(0.5)} align="left" />
        <div style={{display: 'flex', flexDirection: 'column', gap: 30, marginTop: 10}}>
          <Row index={0} n="01" text="It clears space for what matters now." at={sec(2.0)} />
          <Row index={1} n="02" text="It blurs detail so patterns can surface." at={sec(2.8)} />
          <Row index={2} n="03" text="It lets old beliefs be overwritten." at={sec(3.6)} />
        </div>
      </div>
    </Scene>
  );
};
