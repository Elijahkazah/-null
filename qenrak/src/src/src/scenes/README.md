Qenrak
Faceless AI/tech video essays. A Clean Futurist motion system built on Remotion.

One dark canvas, one hero accent, warm-white text. Restraint = premium. Everything is frame-accurate React, rendered to video.

Quick start (macOS)
You need Node.js 18+. Check with node -v. If you don't have it, install via nodejs.org (LTS) or brew install node.

# 1. clone the repo
git clone https://github.com/Elijahkazah/-null.git

# 2. go into the project folder
cd -null
git checkout qenrak-remotion
cd qenrak

# 3. install dependencies
npm install

# 4. open the live preview studio
npm run dev
npm run dev opens Remotion Studio in your browser. Pick a composition on the left, scrub the timeline, edit code, and it updates live.

Pick your channel look 🎨
Run npm run dev
Open the PalettePreview composition to see all 4 palettes side-by-side:
Signal \u2014 icy cyan, calm AI (default)
Phosphor \u2014 refined terminal green
Ember \u2014 warm amber, human/philosophical
Indigo \u2014 electric indigo, cerebral
Open src/theme/palette.ts and set ACTIVE_PALETTE to your choice.
The whole project re-themes instantly.
Compositions
ID	What it is
Episode	The full assembled video (all scenes back-to-back)
SceneLab	Single-scene sandbox (Neural Core) for tuning
SceneRewrite	The "code rewrites itself" scene
PalettePreview	All 4 palettes side-by-side
Render to a video file
npm run render            # renders Episode -> out/episode.mp4
npm run render:palettes   # renders the palette preview
npm run render:scene      # renders a single scene
Output lands in out/. Renders at 2K (2560\u00d71440), 30fps, high quality (CRF 16).

Project structure
qenrak/
\u251c\u2500 remotion.config.ts        # render settings (quality, format)
\u2514\u2500 src/
   \u251c\u2500 index.ts               # entry point
   \u251c\u2500 Root.tsx               # registers all compositions
   \u251c\u2500 Episode.tsx            # the full video = sequence of scenes
   \u251c\u2500 theme/
   \u2502  \u251c\u2500 palette.ts          # \ud83c\udfa8 4 palettes + ACTIVE_PALETTE switch
   \u2502  \u2514\u2500 tokens.ts           # type scale, spacing, easing, timing
   \u251c\u2500 components/
   \u2502  \u251c\u2500 Scene.tsx           # the shell every scene sits in
   \u2502  \u251c\u2500 Title.tsx           # signature title + caption label
   \u2502  \u251c\u2500 Particles.tsx       # soft atmosphere dust
   \u2502  \u251c\u2500 LightSweep.tsx      # gentle transition beat
   \u2502  \u2514\u2500 Bloom.tsx           # soft expanding ring accent
   \u2514\u2500 scenes/
      \u251c\u2500 SceneNeuralCore.tsx # breathing AI core + orbiting nodes
      \u251c\u2500 SceneRewrite.tsx    # code reorganizes itself
      \u2514\u2500 PalettePreview.tsx  # all palettes side-by-side
Making a new episode
Build scenes in src/scenes/ using the <Scene>, <Title>, and transition components.
Add them to src/Episode.tsx inside the <Series>.
Adjust durations, preview in Studio, then render.
Keep motion fluid: long eases, things that drift and settle. Less is more.
