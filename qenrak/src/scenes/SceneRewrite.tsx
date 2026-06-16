import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {theme, glow} from '../theme/palette';
import {ease, sec} from '../theme/tokens';
import {Scene} from '../components/Scene';
import {Title} from '../components/Title';
import {LightSweep} from '../components/LightSweep';
import {Bloom} from '../components/Bloom';

/**
 * SCENE — Rewrite
 * A grid of "code" rows. Midway, a band of rows elegantly reorganizes
 * (shifts + recolors) — "the model rewrites itself". Calm, fluid, premium.
 */
export const SceneRewrite: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const rows = 14;
  const rowH = 34;
  const gridW = 760;
  const startY = -((rows - 1) * rowH) / 2;

  // Rows trace in from center outward
  const mid = Math.floor(rows / 2);

  // The "rewrite" sweep happens around 3.2s
  const rewriteStart = sec(3.2);

  return (
    <Scene>
      <svg width={1000} height={900} viewBox="-500 -450 1000 900">
        {Array.from({length: rows}).map((_, i) => {
          const y = startY + i * rowH;
          const distFromMid = Math.abs(i - mid);
          const appearAt = sec(0.4) + distFromMid * 2;
          const appear = interpolate(frame, [appearAt, appearAt + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(...ease.drift),
          });

          // deterministic pseudo-random line width per row
          const w = 0.45 + ((i * 53) % 50) / 100; // 0.45..0.95
          const lineW = gridW * w;

          // Is this row inside the rewrite band?
          const inBand = i >= mid - 3 && i <= mid + 3;
          const rwAt = rewriteStart + (i - (mid - 3)) * 3;
          const rewrite = inBand
            ? interpolate(frame, [rwAt, rwAt + 18], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(...ease.smooth),
              })
            : 0;

          // During rewrite: width changes + color lifts to highlight then settles
          const newW = 0.35 + ((i * 91) % 60) / 100;
          const animW = interpolate(rewrite, [0, 1], [lineW, gridW * newW]);
          const xShift = interpolate(rewrite, [0, 0.5, 1], [0, 14, 0]);
          const stroke = rewrite > 0.05 && rewrite < 0.95 ? theme.accentHi : theme.accent;
          const op = (0.35 + 0.4 * w) * appear;

          return (
            <g key={i} opacity={op}>
              <rect
                x={-gridW / 2 + xShift}
                y={y - 4}
                width={animW}
                height={3}
                rx={1.5}
                fill={stroke}
                style={{filter: rewrite > 0.05 ? glow(theme.accentHi, 0.5) : 'none'}}
              />
              {/* row index dot */}
              <circle cx={-gridW / 2 - 18 + xShift} cy={y - 2.5} r={2.4} fill={theme.accentDim} />
            </g>
          );
        })}

        {/* Vertical scan line that passes during the rewrite */}
        {(() => {
          const sx = interpolate(frame, [rewriteStart - sec(0.2), rewriteStart + sec(1.4)], [-gridW / 2 - 40, gridW / 2 + 40], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(...ease.smooth),
          });
          const sOp = interpolate(frame, [rewriteStart - sec(0.2), rewriteStart, rewriteStart + sec(1.2), rewriteStart + sec(1.5)], [0, 0.8, 0.8, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return <line x1={sx} y1={startY - 30} x2={sx} y2={startY + rows * rowH} stroke={theme.accentHi} strokeWidth={2} opacity={sOp} style={{filter: glow(theme.accentHi, 0.6)}} />;
        })()}
      </svg>

      <div style={{position: 'absolute', bottom: 200, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Title primary="REWRITTEN" caption="THE CODE CHANGES ITSELF" at={sec(5.0)} />
      </div>

      <Bloom at={durationInFrames - sec(1.2)} durationInFrames={sec(1.0)} />
      <LightSweep at={durationInFrames - sec(1.0)} durationInFrames={sec(0.9)} />
    </Scene>
  );
};
