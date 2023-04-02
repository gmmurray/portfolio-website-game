import {
  BASE_PLAYER_SPEED,
  DEFAULT_PORTAL_TEXT,
  LEVEL_FOUR_SCENE_KEY,
  LEVEL_THREE_SCENE_KEY,
  LEVEL_TWO_SCENE_KEY,
} from '../constants/gameConstants';
import {
  DoorDefinition,
  ItemDefinition,
  LevelCast,
  NpcCharacter,
  PerformInteraction,
  PortalDefinition,
  PortalType,
} from '../types/interactions';
import {
  gregSpriteDefinition,
  greyCatSpriteDefinition,
  whiteCatSpriteDefinition,
} from '../assetDefinitions/sprites';

import { Direction } from 'grid-engine';
import { LevelOne } from '../scenes/LevelOne';
import { OverlayContentKey } from '../types/overlayContent';
import { SpriteDefinition } from '../types/assetDefinitions';

const player = {
  startingX: 24,
  startingY: 52,
  startingSpeed: BASE_PLAYER_SPEED,
};

const catInteraction: PerformInteraction = params => {
  const text = 'Meow meow!';

  params.createNewDialog(text);
};

const npcs: NpcCharacter[] = [
  {
    definition: gregSpriteDefinition,
    startingX: 24,
    startingY: 43,
    startingSpeed: 4,
    friendlyName: 'Greg',
    handler: params => {
      const text = `Hello and welcome to my game! I am Greg and I am here to help you explore this world. You've already learned how to interact with people and things (space or enter) and you can use the arrow keys to move. Feel free to explore the area but stop by my house before heading out of town!`;

      params.createNewDialog(text);
    },
    radius: 4,
  },
  {
    definition: greyCatSpriteDefinition,
    startingX: 7,
    startingY: 93,
    startingSpeed: 2,
    friendlyName: 'Khufu',
    handler: params => catInteraction(params),
    radius: 2,
  },
  {
    definition: whiteCatSpriteDefinition,
    startingX: 23,
    startingY: 95,
    startingSpeed: 2,
    friendlyName: 'Dre',
    handler: params => catInteraction(params),
    radius: 2,
  },
];

const items: ItemDefinition[] = [
  {
    x: 7,
    y: 91,
    handler: params => {
      (params as LevelOne)
        .updateUnlockedFeatures('talentTree', true)
        .createOverlay(OverlayContentKey.SKILLS);
    },
    friendlyName: `Greg's battlestation`,
  },
  {
    x: 10,
    y: 91,
    handler: params =>
      (params as LevelOne).createOverlay(OverlayContentKey.UNF),
    friendlyName: 'Framed medal',
  },
  {
    x: 12,
    y: 90,
    handler: params => (params as LevelOne).createOverlay(OverlayContentKey.UF),
    friendlyName: 'Trophy',
  },
  {
    x: 20,
    y: 92,
    handler: params =>
      (params as LevelOne).createOverlay(OverlayContentKey.BIO),
    friendlyName: 'Musings',
  },
  {
    x: 23,
    y: 92,
    handler: params => params.createNewDialog('Sweet nectar of the gods!'),
    friendlyName: 'Black gold',
  },
  {
    x: 38,
    y: 76,
    handler: params =>
      params.createNewDialog(
        'You power on the Game Cube. What will you play today, Super Smash Bros: Melee or Mario Kart: Double Dash?',
      ),
    friendlyName: 'Game Cube',
  },
  {
    x: 40,
    y: 75,
    handler: params => params.createNewDialog('A wild Magikarp appears!'),
    friendlyName: 'Fish tank',
  },
  {
    x: 44,
    y: 78,
    handler: params =>
      params.createNewDialog(`I can't even remember what I bought...`),
    friendlyName: 'Packages',
  },
  {
    x: 23,
    y: 34,
    handler: ({ createNewDialog }) =>
      createNewDialog(`LEFT: Greg's house. STRAIGHT: Portal Pond`),
    friendlyName: 'Sign post',
  },
];
const portals: PortalDefinition[] = [
  {
    from: {
      x: 16,
      y: 9,
    },
    type: PortalType.SCENE,
    to: LEVEL_TWO_SCENE_KEY,
    dialog: DEFAULT_PORTAL_TEXT,
    friendlyName: 'Mysterious Forest',
  },
  {
    from: {
      x: 28,
      y: 9,
    },
    type: PortalType.SCENE,
    to: LEVEL_THREE_SCENE_KEY,
    dialog: DEFAULT_PORTAL_TEXT,
    friendlyName: 'Creepy Catacombs',
  },
  {
    from: {
      x: 40,
      y: 9,
    },
    type: PortalType.SCENE,
    to: LEVEL_FOUR_SCENE_KEY,
    dialog: DEFAULT_PORTAL_TEXT,
    friendlyName: 'rightmost portal',
  },
];
const doors: DoorDefinition[] = [
  {
    from: [
      { x: 19, y: 29 },
      { x: 20, y: 29 },
    ],
    to: { x: 15, y: 98 },
    friendlyName: 'Go inside',
  },
  {
    from: [{ x: 15, y: 99 }],
    to: { x: 20, y: 31 },
    friendlyName: 'Go outside',
  },
  {
    from: [{ x: 18, y: 91 }],
    to: { x: 46, y: 78 },
    friendlyName: 'Go upstairs',
    face: Direction.DOWN,
  },
  {
    from: [
      { x: 46, y: 77 },
      { x: 46, y: 76 },
    ],
    to: { x: 17, y: 91 },
    friendlyName: 'Go downstairs',
    face: Direction.LEFT,
  },
];

export const getLevelOneCast = (definition: SpriteDefinition): LevelCast => ({
  npcs,
  items,
  portals,
  doors,
  player: {
    ...player,
    definition,
  },
});
