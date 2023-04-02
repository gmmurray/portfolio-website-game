import {
  LevelFourEnemyDefinition,
  LevelFourFoodDefinition,
  LevelFourInvisibleInteractionDefinition,
  LevelFourObjectiveDefinition,
} from '../types/levelFour';

import { AnimationDefinitionMap } from '../types/animations';
import { LayerDefinition } from '../types/assetDefinitions';
import { TILE_SIZE } from '../constants/gameConstants';
import { v4 as uuidv4 } from 'uuid';

export const levelFourLayers: LayerDefinition = {
  ['ground']: {
    configure: (layer, level) => {
      layer.setCollisionByExclusion([-1]);
      level.physics.world.bounds.width = layer.width;
      level.physics.world.bounds.height = layer.height;

      // setup player collider
      level.physics.add.collider(layer, level.player);

      // setup enemy collider
      Object.keys(level.enemies).forEach(key => {
        if (level.enemies[key] && level.enemies[key].container) {
          level.physics.add.collider(layer, level.enemies[key].container);
        }
      });

      // setup food collider
      Object.keys(level.food).forEach(key => {
        if (level.food[key] && level.food[key].container) {
          level.physics.add.collider(layer, level.food[key].container);
        }
      });

      // setup objective (js frameworks) collider
      Object.keys(level.objectives).forEach(key => {
        if (level.objectives[key] && level.objectives[key].container) {
          level.physics.add.collider(layer, level.objectives[key].container);
        }
      });

      // setup invis interaction collider
      (level.invisibleInteractions ?? []).forEach(ii => {
        if (ii.rectangle) {
          level.physics.add.collider(layer, ii.rectangle);
        }
      });

      // setup exit portal collider
      if (level.exitPortal) {
        level.physics.add.collider(layer, level.exitPortal);
      }
    },
  },
  ['lava']: {
    configure: (layer, level) => {
      layer.setCollisionByExclusion([-1]);
      level.physics.add.collider(
        layer,
        level.player,
        level.handleLavaCollision,
        undefined,
        this,
      );
    },
  },
  ['bg_parallax_upper']: {
    depth: 5,
  },
  ['bg_parallax_lower']: {
    depth: 5,
  },
  ['bg_static']: {
    depth: 5,
  },
  ['water']: {
    depth: 16,
  },
};

type EnemyDescription = {
  textureKey: string;
  name: string;
  damage: number;
};
const slime: EnemyDescription = {
  name: 'feature creep',
  textureKey: 'slime',
  damage: 15,
};
const beetle: EnemyDescription = {
  name: 'bug',
  textureKey: 'beetle',
  damage: 20,
};
const acidBlob: EnemyDescription = {
  name: 'code smell',
  textureKey: 'acid-blob',
  damage: 10,
};

export const getLevelFourAnimationMap = (
  key: string,
): AnimationDefinitionMap => ({
  [key]: {
    walk: {
      key: 'player-walk',
      frames: [6, 7, 8],
      frameRate: 6,
      repeat: -1,
    },
    idle: {
      key: 'player-idle',
      frames: [7],
    },
  },
  [beetle.textureKey]: {
    walk: {
      key: 'beetle-walk',
      frames: [4, 5, 6, 7],
      frameRate: 6,
      repeat: -1,
    },
    idle: {
      key: 'beetle-idle',
      frames: [1],
    },
  },
  [acidBlob.textureKey]: {
    walk: {
      key: 'acid-blob-walk',
      frames: [0, 1, 2, 3, 4, 5, 6],
      frameRate: 6,
      repeat: -1,
    },
    idle: {
      key: 'acid-blob-idle',
      frames: [1],
    },
  },
  [slime.textureKey]: {
    walk: {
      key: 'slime-walk',
      frames: [0, 1, 2, 3],
      frameRate: 6,
      repeat: -1,
    },
    idle: {
      key: 'slime-idle',
      frames: [1],
    },
  },
});

const createEnemyId = () => `enemy-${uuidv4()}`;

export const levelFourEnemies: LevelFourEnemyDefinition[] = [
  {
    id: createEnemyId(),
    startPos: {
      x: 15,
      y: 52,
    },
    bounds: {
      left: 15,
      right: 20,
    },
    ...slime,
  },
  {
    id: createEnemyId(),
    startPos: {
      x: 14,
      y: 22,
    },
    bounds: {
      left: 14,
      right: 28,
    },
    ...beetle,
  },
  {
    id: createEnemyId(),
    startPos: {
      x: 33,
      y: 22,
    },
    bounds: {
      left: 33,
      right: 49,
    },
    ...acidBlob,
  },
  {
    id: createEnemyId(),
    startPos: {
      x: 52,
      y: 36,
    },
    bounds: {
      left: 52,
      right: 65,
    },
    ...slime,
  },
  {
    id: createEnemyId(),
    startPos: {
      x: 59,
      y: 22,
    },
    bounds: {
      left: 59,
      right: 70,
    },
    ...acidBlob,
  },
  {
    id: createEnemyId(),
    startPos: {
      x: 82,
      y: 16,
    },
    bounds: {
      left: 82,
      right: 94,
    },
    ...beetle,
  },
  {
    id: createEnemyId(),
    startPos: {
      x: 85,
      y: 52,
    },
    bounds: {
      left: 85,
      right: 96,
    },
    ...beetle,
  },
  {
    id: createEnemyId(),
    startPos: {
      x: 122,
      y: 49,
    },
    bounds: {
      left: 122,
      right: 132,
    },
    ...slime,
  },
];

export const levelFourFoods: LevelFourFoodDefinition[] = [
  {
    id: uuidv4(),
    position: { x: 12, y: 34 },
    textureKey: 'coffee-cup-image',
    name: 'coffee',
    value: 10,
  },
  {
    id: uuidv4(),
    position: { x: 13, y: 40 },
    textureKey: 'tuna-roll-image',
    name: 'sushi',
    value: 20,
  },
  {
    id: uuidv4(),
    position: { x: 10, y: 8 },
    textureKey: 'pizza-party-image',
    name: 'pizza party (invulnerability)',
    value: 0,
  },
  {
    id: uuidv4(),
    position: { x: 64, y: 36 },
    textureKey: 'tuna-roll-image',
    name: 'sushi',
    value: 20,
  },
  {
    id: uuidv4(),
    position: { x: 71, y: 49 },
    textureKey: 'coffee-cup-image',
    name: 'coffee',
    value: 10,
  },
  {
    id: uuidv4(),
    position: { x: 122, y: 49 },
    textureKey: 'coffee-cup-image',
    name: 'coffee',
    value: 10,
  },
];

export const levelFourObjectives: LevelFourObjectiveDefinition[] = [
  {
    id: uuidv4(),
    position: {
      x: 2,
      y: 51,
    },
    name: '',
    textureKey: 'javascript-pixel-image',
  },
  {
    id: uuidv4(),
    position: {
      x: 2,
      y: 25,
    },
    name: '',
    textureKey: 'javascript-pixel-image',
  },
  {
    id: uuidv4(),
    position: {
      x: 64,
      y: 29,
    },
    name: '',
    textureKey: 'javascript-pixel-image',
  },
  {
    id: uuidv4(),
    position: {
      x: 86,
      y: 40,
    },
    name: '',
    textureKey: 'javascript-pixel-image',
  },
  {
    id: uuidv4(),
    position: {
      x: 133,
      y: 51,
    },
    name: '',
    textureKey: 'javascript-pixel-image',
  },
  {
    id: uuidv4(),
    position: {
      x: 126,
      y: 40,
    },
    name: '',
    textureKey: 'javascript-pixel-image',
  },
];

export const levelFourInvisibleInteractions: LevelFourInvisibleInteractionDefinition[] =
  [
    {
      position: {
        x: 109,
        y: 35,
      },
      width: TILE_SIZE,
      height: TILE_SIZE,
      handlerKey: 'ladder',
      payload: {
        position: {
          x: 108,
          y: 8,
        },
      },
    },
  ];

export const levelFourExitPortal = {
  position: {
    x: 149,
    y: 38,
  },
  anim: {
    key: 'purple-portal-animation',
    frames: [0, 1, 2, 3, 4, 5, 6, 7],
    frameRate: 6,
    repeat: -1,
  },
};
