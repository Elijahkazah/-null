import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {theme, glow} from '../theme/palette';
import {ease, sec, type as typeScale, tracking} from '../theme/tokens';
import {Scene} from '../components/Scene';

/**
 * SceneGrid — the self-rewriting code grid. Rows ease into NEW positions/widths
 * and recolor. The old scan-line swipe is GONE — rows just reorganize smoothly.
 */
export const SceneGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const rows = 14;
  const rowH = 34;
  const gridW = 760;
  const startY = -((rows - 1) * rowH) / 2;
  const mid = Math.floor(rows / 2);
  const rewriteStart = sec(3.4);

  const labO = interpolate(frame, [sec(6.2), sec(7.0)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const labY = interpolate(frame, [sec(6.2), sec(7.0)], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.drift)});

  return (
    <Scene fadeIn={sec(0.6)} fadeOut={sec(0.9)} showParticles={false}>
      <svg width={1000} height={760} viewBox="-500 -380 1000 760">
        {Array.from({length: rows}).map((_, i) => {
          const y = startY + i * rowH;
          const distFromMid = Math.abs(i - mid);
          const appearAt = sec(0.4) + distFromMid * 2;
          const appear = interpolate(frame, [appearAt, appearAt + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.drift)});

          const w = 0.45 + ((i * 53) % 50) / 100;
          const lineW = gridW * w;

          const inBand = i >= mid - 3 && i <= mid + 3;
          const rwAt = rewriteStart + (i - (mid - 3)) * 4;
          const rewrite = inBand
            ? interpolate(frame, [rwAt, rwAt + 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...ease.smooth)})
            : 0;

          const newW = 0.35 + ((i * 91) % 60) / 100;
          const animW = interpolate(rewrite, [0, 1], [lineW, gridW * newW]);
          // gentle settle shift (no harsh swipe)
          const xShift = interpolate(rewrite, [0, 0.5, 1], [0, 10, 0]);
          const stroke = rewrite > 0.05 && rewrite < 0.95 ? theme.accentHi : theme.accent;
          const op = (0.35 + 0.4 * w) * appear;

          return (
            <g key={i} opacity={op}>
              <rect x={-gridW / 2 + xShift} y={y - 4} width={animW} height={3} rx={1.5} fill={stroke} style={{filter: rewrite > 0.05 ? glow(theme.accentHi, 0.5) : 'none'}} />
              <circle cx={-gridW / 2 - 18 + xShift} cy={y - 2.5} r={2.4} fill={theme.accentDim} />
            </g>
          );
        })}
      </svg>

      <div style={{position: 'absolute', bottom: 170, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{opacity: labO, transform: `translateY(${labY}px)`, textAlign: 'center'}}>
          <div style={{fontSize: typeScale.title, fontWeight: 600, letterSpacing: tracking.title, color: theme.text}}>So it rewrites itself</div>
          <div style={{marginTop: 14, fontSize: typeScale.caption, fontWeight: 500, letterSpacing: tracking.label, textTransform: 'uppercase', color: theme.accent}}>The code changes</div>
        </div>
      </div>
    </Scene>
  );
};
