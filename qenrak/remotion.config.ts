import {Config} from '@remotion/cli/config';

// Qenrak renders at 2K (2560x1440) 16:9. Set in Root.tsx compositions.
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // auto
// High quality output for crisp neon-on-black gradients.
Config.setCrf(16);
Config.setPixelFormat('yuv420p');
