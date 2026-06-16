import React from 'react';
import {Scene} from '../components/Scene';
import {Title} from '../components/Title';
import {sec} from '../theme/tokens';

/**
 * SceneOpen — cold open title card. Calm, sets the tone.
 */
export const SceneOpen: React.FC = () => {
  return (
    <Scene fadeIn={sec(0.8)} fadeOut={sec(0.9)}>
      <Title
        primary="The machine that learned to forget"
        caption="Episode 01"
        at={sec(0.6)}
        align="center"
      />
    </Scene>
  );
};
