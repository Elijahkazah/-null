import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {sec} from './theme/tokens';
import {SceneNeuralCore} from './scenes/SceneNeuralCore';
import {SceneRewrite} from './scenes/SceneRewrite';

/**
 * Episode = the full video. Scenes play back-to-back.
 * Add / reorder scenes here. Each Series.Sequence is one scene.
 * The Scene shell handles its own fade in/out so they flow fluidly.
 */
export const Episode: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={sec(8)}>
          <SceneNeuralCore />
        </Series.Sequence>
        <Series.Sequence durationInFrames={sec(8)}>
          <SceneRewrite />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
