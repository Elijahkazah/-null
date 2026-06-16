import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {sec} from './theme/tokens';
import {SceneOpen} from './scenes/SceneOpen';
import {SceneCore} from './scenes/SceneCore';
import {SceneNumber} from './scenes/SceneNumber';
import {SceneShift} from './scenes/SceneShift';
import {SceneGrid} from './scenes/SceneGrid';
import {SceneTension} from './scenes/SceneTension';
import {SceneClose} from './scenes/SceneClose';

/**
 * Episode 01 — "The Machine That Learned to Forget" (~73s).
 * Real motion graphics in every scene. Each Scene fades fully in/out and they
 * play strictly back-to-back via <Series> — so no two scenes ever animate on
 * top of each other (no flicker / double-image / overlay glitch). Reorder here.
 */
export const Episode: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={sec(10)}>
          <SceneOpen />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(12)}>
          <SceneCore />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(11)}>
          <SceneNumber />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(11)}>
          <SceneShift />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(12)}>
          <SceneGrid />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(10)}>
          <SceneTension />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(11)}>
          <SceneClose />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
