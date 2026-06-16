import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {theme, glow} from '../theme/palette';
import {ease} from '../theme/tokens';

/**
 * CountUp — a number that counts up IN PLACE and LANDS on its value.
 * No spinning, no swipe. Ease-out so it decelerates and settles, like it's
 * arriving at the truth. Centered, big, readable — you ARE at the data.
 *
 *   start / end : the values
 *   at          : frame to begin counting
 *   duration    : frames the count takes
 *   prefix/suffix: e.g. "$", " billion"
 */
export const CountUp: React.FC<{
  start?: number;
  end: number;
  at?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}> = ({start = 0, end, at = 0, duration = 60, prefix = '', suffix = '', decimals = 0}) => {
  const frame = useCurrentFrame();
  const f = frame - at;

  // Ease-out: fast then gently settles onto the final value.
  const progress = interpolate(f, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });

  const value = start + (end - start) * progress;

  // The number itself fades + lifts in once, then holds rock-steady.
  const enterY = interpolate(f, [0, 22], [26, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...ease.drift),
  });
  const enterO = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // A whisper of extra glow at the exact moment it lands. Intentional, subtle.
  const landGlow = interpolate(f, [duration - 8, duration], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const display =
    prefix +
    value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  return (
    <div
      style={{
        transform: `translateY(${enterY}px)`,
        opacity: enterO,
        fontSize: 200,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: theme.text,
        filter: glow(theme.accent, landGlow),
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1,
      }}
    >
      {display}
    </div>
  );
};
