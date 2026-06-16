import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {sec} from './theme/tokens';
import {SceneOpen} from './scenes/SceneOpen';
import {SceneNumber} from './scenes/SceneNumber';
import {SceneShift} from './scenes/SceneShift';
import {SceneBreakdown} from './scenes/SceneBreakdown';
import {SceneTension} from './scenes/SceneTension';
import {SceneClose} from './scenes/SceneClose';

/**
 * Episode 01 — "The Machine That Learned to Forget" (~63s).
 *
 * Each scene fades itself fully in and out (handled by the Scene shell), and
 * scenes play strictly back-to-back via <Series>. No two scenes ever animate
 * on top of each other — that's what keeps every transition clean, with no
 * flicker, double-image, or overlay glitch. Reorder / retime here.
 */
export const Episode: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={sec(10)}>
          <SceneOpen />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(11)}>
          <SceneNumber />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(10)}>
          <SceneShift />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(12)}>
          <SceneBreakdown />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(10)}>
          <SceneTension />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(10)}>
          <SceneClose />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
