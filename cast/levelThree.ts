import {
  BASE_PLAYER_SPEED,
  DEFAULT_PORTAL_TEXT,
  LEVEL_ONE_SCENE_KEY,
} from '../constants/gameConstants';
import {
  DoorDefinition,
  LevelCast,
  NpcCharacter,
  PortalDefinition,
  PortalType,
} from '../types/interactions';
import {
  LevelThreeDifficulty,
  LevelThreeDifficultySettingsMap,
  LevelThreeEnemiesDefinition,
  LevelThreeItem,
  OrbMap,
  PotionType,
} from '../types/levelThree';
import {
  goblinSpriteDefinition,
  skeletonOneSpriteDefinition,
  skeletonTwoSpriteDefinition,
  soldierSpriteDefinition,
} from '../assetDefinitions/sprites';

import { Coordinates } from '../types/position';
import { Direction } from 'grid-engine';
import { LevelThree } from '../scenes/LevelThree';
import { OverlayContentKey } from '../types/overlayContent';
import { SpriteDefinition } from '../types/assetDefinitions';

export const orbMap: OrbMap = {
  1: {
    location: {
      primary: {
        x: 5,
        y: 10,
      },
      all: [
        {
          x: 4,
          y: 10,
        },
        {
          x: 5,
          y: 10,
        },
        {
          x: 6,
          y: 10,
        },
        {
          x: 4,
          y: 11,
        },
        {
          x: 5,
          y: 11,
        },
        {
          x: 6,
          y: 11,
        },
      ],
    },
  },
  2: {
    location: {
      primary: {
        x: 86,
        y: 16,
      },
      all: [
        {
          x: 85,
          y: 16,
        },
        {
          x: 86,
          y: 16,
        },
        {
          x: 87,
          y: 16,
        },
        {
          x: 85,
          y: 17,
        },
        {
          x: 86,
          y: 17,
        },
        {
          x: 87,
          y: 17,
        },
      ],
    },
  },
  3: {
    location: {
      primary: {
        x: 65,
        y: 32,
      },
      all: [
        {
          x: 64,
          y: 32,
        },
        {
          x: 65,
          y: 32,
        },
        {
          x: 66,
          y: 32,
        },
        {
          x: 64,
          y: 33,
        },
        {
          x: 65,
          y: 33,
        },
        {
          x: 66,
          y: 33,
        },
      ],
    },
  },
};

const player = {
  startingX: 4,
  startingY: 47,
  // startingX: 47,
  // startingY: 68,
  startingSpeed: BASE_PLAYER_SPEED,
};

const npcs: NpcCharacter[] = [
  {
    definition: soldierSpriteDefinition,
    startingX: 2,
    startingY: 46,
    startingSpeed: 2,
    friendlyName: 'Dungeon difficulty guide',
    handler: params => (params as LevelThree).handleGuideInteraction(),
    facingDirection: Direction.RIGHT,
  },
];

const items: LevelThreeItem[] = [
  {
    // p1 health mini 1
    x: 20,
    y: 47,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.MINI_HEALTH, {
        x: 20,
        y: 47,
      }),
    friendlyName: 'Mini health potion',
  },
  {
    // p1 health mini 2
    x: 24,
    y: 19,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.MINI_HEALTH, {
        x: 24,
        y: 19,
      }),
    friendlyName: 'Mini health potion',
  },
  {
    // p1 speed potion
    x: 7,
    y: 8,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.SPEED, {
        x: 7,
        y: 8,
      }),
    friendlyName: 'Speed potion',
  },
  {
    // p2 normal health
    x: 94,
    y: 9,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.HEALTH, {
        x: 94,
        y: 9,
      }),
    friendlyName: 'Big health potion',
  },
  {
    // p2 mini health (hidden)
    x: 81,
    y: 12,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.MINI_HEALTH, {
        x: 81,
        y: 12,
      }),
    friendlyName: 'Hidden mini health potion',
  },
  {
    // p2 mini health
    x: 80,
    y: 31,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.MINI_HEALTH, {
        x: 80,
        y: 31,
      }),
    friendlyName: 'Mini health potion',
  },
  {
    // p2 speed potion
    x: 80,
    y: 23,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.SPEED, {
        x: 80,
        y: 23,
      }),
    friendlyName: 'Speed potion',
  },
  {
    // p3 mini health 1
    x: 50,
    y: 77,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.MINI_HEALTH, {
        x: 50,
        y: 77,
      }),
    friendlyName: 'Mini health potion',
  },
  {
    // p3 mini health 2
    x: 43,
    y: 82,
    handler: params =>
      (params as LevelThree).handlePotionConsume(PotionType.MINI_HEALTH, {
        x: 43,
        y: 82,
      }),
    friendlyName: 'Mini health potion',
  },
  {
    // orb 1
    x: orbMap[1].location.primary.x,
    y: orbMap[1].location.primary.y,
    handler: params => (params as LevelThree).handleOrbCollection(1),
    friendlyName: 'First orb',
  },
  {
    // orb 2
    x: orbMap[2].location.primary.x,
    y: orbMap[2].location.primary.y,
    handler: params => (params as LevelThree).handleOrbCollection(2),
    friendlyName: 'Second orb',
  },
  {
    // orb 3
    x: orbMap[3].location.primary.x,
    y: orbMap[3].location.primary.y,
    handler: params => (params as LevelThree).handleOrbCollection(3),
    friendlyName: 'Third orb',
  },
  {
    // featured projects
    x: 82,
    y: 83,
    handler: params => {
      (params as LevelThree)
        .updateUnlockedFeatures('inventory', true)
        .createOverlay(OverlayContentKey.PROJECTS);
    },
    friendlyName: 'Treasure',
  },
  {
    // pile of gold in treasure room
    x: 85,
    y: 86,
    handler: params =>
      params.createNewDialog(
        'Looks like enough gold to buy a rune scimmy on the GE',
      ),
    friendlyName: `25k gold`,
  },
  {
    // skip key
    x: 3,
    y: 40,
    handler: params => (params as LevelThree).handleLevelSkip(),
    friendlyName: 'Old key',
  },
];

const portals: PortalDefinition[] = [
  {
    from: {
      x: 48,
      y: 89,
    },
    type: PortalType.COORDINATE,
    to: {
      x: 82,
      y: 86,
    },
    dialog: DEFAULT_PORTAL_TEXT,
    friendlyName: 'treasure',
    layer: 'ground',
    face: Direction.UP,
  },
  {
    from: {
      x: 82,
      y: 81,
    },
    type: PortalType.SCENE,
    to: LEVEL_ONE_SCENE_KEY,
    dialog: DEFAULT_PORTAL_TEXT,
    friendlyName: 'Back to beginning',
  },
];

const doors: DoorDefinition[] = [
  {
    // p1 to go downstairs
    from: [
      {
        x: 38,
        y: 29,
      },
      {
        x: 38,
        y: 30,
      },
    ],
    to: { x: 53, y: 9 },
    friendlyName: 'Descend',
    face: Direction.DOWN,
    layer: 'ground',
    inactive: true,
    inactiveDialog: 'You must gather this floors orbs before descending',
    inactiveMoveDir: Direction.RIGHT,
  },
  {
    // p2 to go downstairs
    from: [
      {
        x: 59,
        y: 43,
      },
      {
        x: 60,
        y: 43,
      },
      {
        x: 61,
        y: 43,
      },
    ],
    to: { x: 47, y: 63 },
    friendlyName: 'Descend',
    face: Direction.DOWN,
    layer: 'ground',
    inactive: true,
    inactiveDialog: 'You must gather this floors orbs before descending',
    inactiveMoveDir: Direction.DOWN,
  },
  {
    // p2 to go upstairs
    from: [
      {
        x: 53,
        y: 6,
      },
      {
        x: 54,
        y: 6,
      },
    ],
    to: {
      x: 39,
      y: 31,
    },
    friendlyName: 'Ascend',
    face: Direction.DOWN,
    layer: 'ground',
  },
  {
    // p3 to go upstairs
    from: [
      {
        x: 46,
        y: 60,
      },
      {
        x: 47,
        y: 60,
      },
      {
        x: 48,
        y: 60,
      },
    ],
    to: {
      x: 60,
      y: 46,
    },
    friendlyName: 'Ascend',
    face: Direction.DOWN,
    layer: 'ground',
  },
];

export const getLevelThreeCast = (definition: SpriteDefinition): LevelCast => ({
  player: {
    ...player,
    definition,
  },
  npcs,
  items,
  portals,
  doors,
});

export const levelThreeDifficultySettingsMap: LevelThreeDifficultySettingsMap =
  {
    [LevelThreeDifficulty.EASY]: {
      friendlyName: 'Easy',
      message: `I can't blame you, nightmare is pretty hard`,
      healthPotions: {
        mini: 20,
        normal: 50,
      },
      player: {
        speedMod: 1.5,
        speedDuration: 5000,
      },
      enemy: {
        damageMod: 1,
        critsEnabled: false,
        speedMod: 1,
        followEnabled: false,
      },
      fire: {
        speedModifier: 1,
        damageModifier: 1,
      },
    },
    [LevelThreeDifficulty.NORMAL]: {
      friendlyName: 'Normal',
      message: `You want a bit more of a challenge? I respect that.`,
      healthPotions: {
        mini: 20,
        normal: 50,
      },
      player: {
        speedMod: 1.5,
        speedDuration: 6000,
      },
      enemy: {
        damageMod: 2,
        critsEnabled: false,
        speedMod: 1,
        followEnabled: false,
      },
      fire: {
        speedModifier: 0.8,
        damageModifier: 1.5,
      },
    },
    [LevelThreeDifficulty.HEROIC]: {
      friendlyName: 'Heroic',
      message: `Finally, someone who wants a real challenge.`,
      healthPotions: {
        mini: 15,
        normal: 50,
      },
      player: {
        speedMod: 1.5,
        speedDuration: 7000,
      },
      enemy: {
        damageMod: 2,
        critsEnabled: true,
        speedMod: 1,
        followEnabled: false,
      },
      fire: {
        speedModifier: 0.6,
        damageModifier: 2,
      },
    },
    [LevelThreeDifficulty.LEGENDARY]: {
      friendlyName: 'Legendary',
      message: `This is going to be legend - wait for it - dary.`,
      healthPotions: {
        mini: 10,
        normal: 50,
      },
      player: {
        speedMod: 1.5,
        speedDuration: 8000,
      },
      enemy: {
        damageMod: 2,
        critsEnabled: true,
        speedMod: 2,
        followEnabled: false,
      },
      fire: {
        speedModifier: 0.5,
        damageModifier: 3,
      },
    },
    [LevelThreeDifficulty.NIGHTMARE]: {
      friendlyName: 'Nightmare',
      message: `Now your nightmare comes to life.`,
      healthPotions: {
        mini: 10,
        normal: 50,
      },
      player: {
        speedMod: 1.5,
        speedDuration: 10000,
      },
      enemy: {
        damageMod: 2,
        critsEnabled: true,
        speedMod: 2,
        followEnabled: true,
      },
      fire: {
        speedModifier: 0.4,
        damageModifier: 4,
      },
    },
  };

export const levelThreeFireColumnLocations: Coordinates[] = [
  {
    x: 46,
    y: 78,
  },
  {
    x: 46,
    y: 79,
  },
  {
    x: 46,
    y: 80,
  },
  { x: 49, y: 75 },
  { x: 50, y: 75 },
  { x: 51, y: 75 },
  { x: 44, y: 82 },
  { x: 44, y: 83 },
  { x: 48, y: 85 },
  { x: 48, y: 86 },
  { x: 52, y: 85 },
  { x: 52, y: 86 },
  { x: 52, y: 88 },
  { x: 52, y: 89 },
  { x: 51, y: 88 },
  { x: 51, y: 89 },
];

export const levelThreeFireExplosionLocations: Coordinates[] = [
  {
    x: 43,
    y: 78,
  },
  {
    x: 43,
    y: 79,
  },
  {
    x: 43,
    y: 80,
  },
  {
    x: 50,
    y: 85,
  },
  {
    x: 50,
    y: 86,
  },
];

export const levelThreeFireBarrierLocations: Coordinates[] = [
  {
    x: 40,
    y: 77,
  },
  {
    x: 41,
    y: 77,
  },
  {
    x: 48,
    y: 77,
  },
  {
    x: 48,
    y: 76,
  },
  {
    x: 48,
    y: 75,
  },
  {
    x: 49,
    y: 74,
  },
  {
    x: 49,
    y: 73,
  },
  {
    x: 50,
    y: 73,
  },
  {
    x: 50,
    y: 72,
  },
  {
    x: 51,
    y: 72,
  },
  {
    x: 52,
    y: 72,
  },
  {
    x: 52,
    y: 73,
  },
  {
    x: 52,
    y: 75,
  },
  {
    x: 52,
    y: 76,
  },
  {
    x: 52,
    y: 77,
  },
  {
    x: 51,
    y: 84,
  },
  {
    x: 50,
    y: 84,
  },
  {
    x: 49,
    y: 84,
  },
  {
    x: 48,
    y: 84,
  },
  {
    x: 48,
    y: 83,
  },
  {
    x: 47,
    y: 82,
  },
  {
    x: 46,
    y: 81,
  },
  {
    x: 45,
    y: 81,
  },
  {
    x: 44,
    y: 81,
  },
  {
    x: 43,
    y: 81,
  },
  {
    x: 42,
    y: 81,
  },
  {
    x: 42,
    y: 82,
  },
  {
    x: 42,
    y: 83,
  },
  {
    x: 52,
    y: 87,
  },
  {
    x: 51,
    y: 87,
  },
  {
    x: 50,
    y: 87,
  },
  {
    x: 49,
    y: 87,
  },
  {
    x: 48,
    y: 87,
  },
  {
    x: 47,
    y: 87,
  },
  {
    x: 47,
    y: 88,
  },
  {
    x: 47,
    y: 89,
  },
];

export const levelThreeEnemiesDefinition: LevelThreeEnemiesDefinition = {
  options: [
    goblinSpriteDefinition,
    skeletonOneSpriteDefinition,
    skeletonTwoSpriteDefinition,
  ],
  locations: [
    {
      x: 17,
      y: 41,
    },
    {
      x: 20,
      y: 41,
    },
    {
      x: 24,
      y: 41,
    },
    {
      x: 15,
      y: 28,
    },
    {
      x: 15,
      y: 22,
    },
    {
      x: 25,
      y: 28,
    },
    {
      x: 25,
      y: 22,
    },
    {
      x: 5,
      y: 20,
    },
    {
      x: 38,
      y: 37,
    },
    {
      x: 65,
      y: 10,
    },
    {
      x: 72,
      y: 10,
    },
    {
      x: 85,
      y: 11,
    },
    {
      x: 81,
      y: 16,
    },
    {
      x: 86,
      y: 21,
    },
    {
      x: 92,
      y: 17,
    },
    {
      x: 93,
      y: 33,
    },
    {
      x: 73,
      y: 32,
    },
    {
      x: 79,
      y: 40,
    },
    {
      x: 70,
      y: 46,
    },
  ],
  startingSpeed: 2,
  radius: 4,
};
