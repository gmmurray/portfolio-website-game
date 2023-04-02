import {
  BASE_PLAYER_SPEED,
  DEFAULT_PORTAL_TEXT,
  LEVEL_ONE_SCENE_KEY,
} from '../constants/gameConstants';
import { FireNumber, LevelTwoItem, PillarTwoSolution } from '../types/levelTwo';
import {
  LevelCast,
  NpcCharacter,
  PortalDefinition,
  PortalType,
} from '../types/interactions';

import { LevelTwo } from '../scenes/LevelTwo';
import { OverlayContentKey } from '../types/overlayContent';
import { SpriteDefinition } from '../types/assetDefinitions';
import { gregSpriteDefinition } from '../assetDefinitions/sprites';

const player = {
  startingX: 23,
  startingY: 31,
  startingSpeed: BASE_PLAYER_SPEED,
};

const npcs: NpcCharacter[] = [
  {
    definition: gregSpriteDefinition,
    startingX: 20,
    startingY: 12,
    startingSpeed: 2,
    friendlyName: 'Greg',
    handler: params => (params as LevelTwo).handleGregInteraction(),
  },
];

const items: LevelTwoItem[] = [
  {
    // angel
    x: 24,
    y: 27,
    handler: params => (params as LevelTwo).handleAngelInteraction(),
    friendlyName: 'Guide',
  },
  {
    x: 40,
    y: 10,
    handler: params => (params as LevelTwo).showNextFire(FireNumber.ONE),
    friendlyName: 'First fire',
    pillar: 3,
  },
  {
    x: 43,
    y: 13,
    handler: params => (params as LevelTwo).showNextFire(FireNumber.TWO),
    friendlyName: 'Second fire',
    pillar: 3,
  },
  {
    x: 40,
    y: 16,
    handler: params => (params as LevelTwo).showNextFire(FireNumber.THREE),
    friendlyName: 'Third fire',
    pillar: 3,
  },
  {
    x: 37,
    y: 13,
    handler: params => (params as LevelTwo).showNextFire(FireNumber.FOUR),
    friendlyName: 'Fourth fire',
    pillar: 3,
  },
  {
    // pillar 3
    x: 37,
    y: 30,
    handler: params => (params as LevelTwo).handlePillarThreeInteraction(),
    friendlyName: 'Pillar of Matching',
  },
  {
    // pillar 1
    x: 2,
    y: 41,
    handler: params => (params as LevelTwo).handlePillarOneInteraction(),
    friendlyName: 'Monolith of Exploration',
  },
  {
    // pillar 2
    x: 7,
    y: 10,
    handler: params => (params as LevelTwo).handlePillarTwoInteraction(),
    friendlyName: 'Column of Choice',
  },
  {
    // barrel
    x: 2,
    y: 30,
    handler: params =>
      (params as LevelTwo).handlePillarOneItemInteraction('Barrel'),
    friendlyName: 'Barrel',
    pillar: 1,
    hint: `Don't confuse me for a keg`,
  },
  {
    // small urn
    x: 36,
    y: 43,
    handler: params =>
      (params as LevelTwo).handlePillarOneItemInteraction('Small urn'),
    friendlyName: 'Small urn',
    pillar: 1,
    hint: `I may remind you of a vase but just know that I am small`,
  },
  {
    // bowl
    x: 39,
    y: 43,
    handler: params =>
      (params as LevelTwo).handlePillarOneItemInteraction('Bowl'),
    friendlyName: 'Bowl',
    pillar: 1,
    hint: `Do you put milk or cereal first?`,
  },
  {
    // crate
    x: 21,
    y: 23,
    handler: params =>
      (params as LevelTwo).handlePillarOneItemInteraction('Crate'),
    friendlyName: 'Crate',
    pillar: 1,
    hint: `You can use me to transport all of your stuff`,
  },
  {
    // chest
    x: 5,
    y: 16,
    handler: params =>
      (params as LevelTwo).handlePillarOneItemInteraction('Chest'),
    friendlyName: 'Chest',
    pillar: 1,
    hint: `Pirates are currently looking for me`,
  },
  {
    // large urn
    x: 1,
    y: 13,
    handler: params =>
      (params as LevelTwo).handlePillarOneItemInteraction('Large urn'),
    friendlyName: 'Large urn',
    pillar: 1,
    hint: 'I may remind you of a vase but just know that I am large',
  },
  {
    // help sign
    x: 32,
    y: 25,
    handler: params =>
      params.createNewDialog(
        `Confused? Try speaking with your guide (the angel over there) to get started. Each pillar will give you a hint to help you solve its mystery.`,
      ),
    friendlyName: 'Help',
  },
  {
    // skip button
    x: 7,
    y: 25,
    handler: params => (params as LevelTwo).handleSkipButton(),
    friendlyName: 'Strange button (skip level)',
  },
  {
    // experiences chest
    x: 19,
    y: 64,
    handler: params => {
      (params as LevelTwo)
        .updateUnlockedFeatures('questLog', true)
        .createOverlay(OverlayContentKey.EXPERIENCES);
    },
    friendlyName: 'Treasure',
  },
];

const portals: PortalDefinition[] = [
  {
    from: {
      x: 18,
      y: 27,
    },
    type: PortalType.COORDINATE,
    to: {
      x: 19,
      y: 67,
    },
    dialog: 'The portal has taken you to a mysterious area...',
    friendlyName: 'Escape portal',
    layer: 'ground',
  },
  {
    from: {
      x: 19,
      y: 61,
    },
    type: PortalType.SCENE,
    to: LEVEL_ONE_SCENE_KEY,
    dialog: DEFAULT_PORTAL_TEXT,
    friendlyName: 'Back to beginning',
  },
];

export const getLevelTwoCast = (definition: SpriteDefinition): LevelCast => ({
  player: {
    ...player,
    definition,
  },
  npcs,
  items,
  portals,
  doors: [],
});

export const fireStartLocations = {
  [FireNumber.ONE]: {
    x: 40,
    y: 10,
  },
  [FireNumber.TWO]: {
    x: 43,
    y: 13,
  },
  [FireNumber.THREE]: {
    x: 40,
    y: 16,
  },
  [FireNumber.FOUR]: {
    x: 37,
    y: 13,
  },
};

export const pillarTwoSolutions: PillarTwoSolution[] = [
  {
    question: `Here's your question: what is Greg's favorite animal?`,
    options: [
      {
        id: 1,
        text: 'Baluga whale',
      },
      {
        id: 2,
        text: 'Poison dart frog',
      },
      {
        id: 3,
        text: 'Siamese cat',
      },
      {
        id: 4,
        text: 'Cardigan welsh corgi',
      },
    ],
    answer: 2,
    hint: `Frogs...why'd it have to be frogs?!`,
  },
  {
    question: `Get to the bottom of this: on a warm summer day, what is Greg's favorite drink?`,
    options: [
      {
        id: 1,
        text: 'Coca-Cola',
      },
      {
        id: 2,
        text: `Barq's Root Beer`,
      },
      {
        id: 3,
        text: 'Orange Crush',
      },
      {
        id: 4,
        text: 'Spring Water',
      },
    ],
    answer: 2,
    hint: `Let's just get to the root of the problem.`,
  },
  {
    question: `Can you solve this? What is Greg's favorite fantasy/fiction world?`,
    options: [
      {
        id: 1,
        text: 'Lord of the Rings',
      },
      {
        id: 2,
        text: `Star Wars`,
      },
      {
        id: 3,
        text: 'Star Trek',
      },
      {
        id: 4,
        text: 'Harry Potter',
      },
    ],
    answer: 2,
    hint: `I can't talk right now, I'm listening to Duel of the Fates.`,
  },
  {
    question: `Something simple for you. What is Greg's favorite Marvel character`,
    options: [
      {
        id: 1,
        text: 'Thor',
      },
      {
        id: 2,
        text: `Thanos`,
      },
      {
        id: 3,
        text: 'Spider Man',
      },
      {
        id: 4,
        text: 'Black Panther',
      },
    ],
    answer: 4,
    hint: `Has anyone seen any vibranium lately? I need to find some.`,
  },
];

export const angelMessages = {
  0: `Hello traveler. You seem lost, did you just arrive here? To go back you will need to use the portal just over there but, unfortunately, it is broken! To fix it you will need to activate the three pillars scattered across this area. Solve each pillar's mystery to obtain its power.`,
  1: `Well done, you've successfully gained the power of one obelisk thus far. Keep up the good work and you'll be out of here in no time.`,
  2: `Two pillars unlocked! Very good. You got this, just one more!`,
  3: `Congratulations! The portal is open! Go through it to earn your reward and travel back to where you came from.`,
};
