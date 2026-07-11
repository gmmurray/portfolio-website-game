# Portfolio Game

An interactive, top-down RPG that doubles as my portfolio. Talk to NPCs, explore
levels, and open in-game panels (inventory, quests, a skill/talent tree) that are
populated with the real content from my portfolio - projects, experience, and skills.

The same CMS data drives both this game and my website at
[gregmurray.org](https://gregmurray.org). One content source, two very different
front ends: a conventional site and a playable world.

Built with **Phaser 3** (game engine), **grid-engine** (tile movement),
**Next.js / React** (shell + DOM overlays), **Redux Toolkit** (shared state), and
**TypeScript** throughout.

## A note

I originally built the game in **spring 2023**, entirely by hand: no AI tooling of
any kind. It was my first substantial game project: six months of learning Phaser,
scene lifecycles, and tile-based movement from scratch. This was a great project for me
as my experience has been limited to web development. Taking programming fundamentals
into a new area like this was fun and I was surprised both by how much I could do as
well as how much there was to learn.

The only work done since then is data-layer maintenance - migrating the content source
to a headless CMS (the `data/` and `redux/gameCms*` code, 2025). The game itself is
untouched from the original hand-written version.

## Places of interest

- **[`cast/levelOne.ts`](cast/levelOne.ts)** - the idea I'm most proud of. Each level is
  declarative _data_: NPCs, items, doors, and portals are plain objects with handler
  callbacks. Adding an NPC means editing an array, not touching engine code. The scene is
  an interpreter of this data, not a place to hand-wire content.
- **[`scenes/LevelScene.ts`](scenes/LevelScene.ts)** - the base scene all levels extend.
  Shared movement, interaction, dialog, doors/portals, and save logic live here so each
  concrete level ([`scenes/LevelOne.ts`](scenes/LevelOne.ts)) stays small and readable.
- **[`components/`](components/) + [`config.ts`](config.ts)** - the React ↔ Phaser
  boundary. Phaser owns the canvas and game loop; React owns the DOM overlays; Redux is
  the shared bus between them; the game is a guarded singleton so React re-renders never
  spawn a second instance. This integration is the trickiest part of putting Phaser
  inside a Next.js app, and it's where I spent a lot of design effort.

## Running it locally

```bash
yarn install
yarn dev
```

Then open the game and explore. Best experienced on a larger screen.

## Honest caveats

It's a first big game project, and it shows in places - some scene-transition timing is
hand-tuned with coordinated delays, and the base scene carries a lot. I've deliberately
left it as-is rather than retrofit it: it works, it's a faithful record of what I knew
and how I worked at the time, and I'd rather it stay an honest artifact than a polished
rewrite.
