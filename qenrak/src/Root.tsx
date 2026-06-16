import React from 'react';
import {Composition} from 'remotion';
import {FPS, WIDTH, HEIGHT, sec} from './theme/tokens';
import {SceneNeuralCore} from './scenes/SceneNeuralCore';
import {SceneRewrite} from './scenes/SceneRewrite';
import {PalettePreview} from './scenes/PalettePreview';
import {Episode} from './Episode';

/**
 * Qenrak compositions.
 * - Episode        : the full assembled video (sequence of scenes)
 * - SceneLab       : single-scene sandbox for tuning one scene at a time
 * - PalettePreview : all 4 palettes side-by-side to pick your channel look
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Episode"
        component={Episode}
        durationInFrames={sec(16)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="SceneLab"
        component={SceneNeuralCore}
        durationInFrames={sec(8)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="SceneRewrite"
        component={SceneRewrite}
        durationInFrames={sec(8)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="PalettePreview"
        component={PalettePreview}
        durationInFrames={sec(6)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
