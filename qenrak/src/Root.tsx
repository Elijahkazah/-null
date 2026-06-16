import React from 'react';
import {Composition} from 'remotion';
import {FPS, WIDTH, HEIGHT, sec} from './theme/tokens';
import {Episode} from './Episode';
import {SceneOpen} from './scenes/SceneOpen';
import {SceneNumber} from './scenes/SceneNumber';
import {SceneShift} from './scenes/SceneShift';
import {SceneBreakdown} from './scenes/SceneBreakdown';
import {SceneTension} from './scenes/SceneTension';
import {SceneClose} from './scenes/SceneClose';
import {PalettePreview} from './scenes/PalettePreview';

/**
 * Qenrak compositions.
 * - Episode        : the full assembled ~63s video
 * - Scene-*        : each scene solo, for tuning one at a time
 * - PalettePreview : all 4 palettes side-by-side to pick your channel look
 *
 * NOTE: Composition ids may only contain a-z, A-Z, 0-9 and hyphens (-).
 * No underscores or spaces.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Episode"
        component={Episode}
        durationInFrames={sec(63)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition id="Scene-Open" component={SceneOpen} durationInFrames={sec(10)} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene-Number" component={SceneNumber} durationInFrames={sec(11)} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene-Shift" component={SceneShift} durationInFrames={sec(10)} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene-Breakdown" component={SceneBreakdown} durationInFrames={sec(12)} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene-Tension" component={SceneTension} durationInFrames={sec(10)} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene-Close" component={SceneClose} durationInFrames={sec(10)} fps={FPS} width={WIDTH} height={HEIGHT} />

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
