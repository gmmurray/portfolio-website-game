import {
  ANIMATED_TILES_PLUGIN_KEY,
  DIALOG_PLUGIN_KEY,
  GRID_ENGINE_PLUGIN_KEY,
  MC_DIALOG_PLUGIN_KEY,
  PHASER_TOOLTIP_PLUGIN_KEY,
  TILE_SIZE,
} from './constants/gameConstants';
import Phaser, { Game } from 'phaser';

import AnimatedTilesPlugin from 'phaser-animated-tiles-phaser3.5';
import { CharacterSelectScene } from './scenes/CharacterSelectScene';
import { CreditsScene } from './scenes/CreditsScene';
import DialogPlugin from './dialog/plugin';
import { GridEngine } from 'grid-engine';
import { LevelFour } from './scenes/LevelFour';
import { LevelOne } from './scenes/LevelOne';
import { LevelThree } from './scenes/LevelThree';
import { LevelTwo } from './scenes/LevelTwo';
import { LoadingScene } from './scenes/LoadingScene';
import McDialogPlugin from './mcDialog/plugin';
import PhaserTooltip from './PhaserTooltip/phaserTooltip';
import { UIScene } from './scenes/UIScene';
import { getMaxSquareScreenDimension } from './helpers/gameDimensions';

const startingDimensions = getMaxSquareScreenDimension(
  window.innerWidth,
  window.innerHeight,
  TILE_SIZE,
);

export const gameConfig = {
  title: 'gmmurray-game',
  type: Phaser.CANVAS,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: process.env.NODE_ENV === 'development',
      gravity: { y: 750 },
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  width: startingDimensions,
  height: startingDimensions,
  backgroundColor: '#000',
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [
    LoadingScene,
    LevelOne,
    LevelTwo,
    LevelThree,
    LevelFour,
    UIScene,
    CreditsScene,
    CharacterSelectScene,
  ],
  plugins: {
    scene: [
      {
        key: GRID_ENGINE_PLUGIN_KEY,
        plugin: GridEngine,
        mapping: GRID_ENGINE_PLUGIN_KEY,
      },
      {
        key: DIALOG_PLUGIN_KEY,
        plugin: DialogPlugin,
        mapping: DIALOG_PLUGIN_KEY,
      },
      {
        key: ANIMATED_TILES_PLUGIN_KEY,
        plugin: AnimatedTilesPlugin,
        mapping: ANIMATED_TILES_PLUGIN_KEY,
      },
      {
        key: MC_DIALOG_PLUGIN_KEY,
        plugin: McDialogPlugin,
        mapping: MC_DIALOG_PLUGIN_KEY,
      },
      {
        key: PHASER_TOOLTIP_PLUGIN_KEY,
        plugin: PhaserTooltip,
        mapping: PHASER_TOOLTIP_PLUGIN_KEY,
      },
    ],
  },
};

let gameInstance: Game;

export const getGameInstance = () => {
  if (gameInstance) {
    return gameInstance;
  }

  gameInstance = new Game(gameConfig);
  return gameInstance;
};

export const getGameElement = (): HTMLDivElement | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return (
    (document.querySelector('#game')?.children[0] as HTMLDivElement) ??
    undefined
  );
};
