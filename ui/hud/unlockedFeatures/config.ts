import {
  FeatureSpriteConfig,
  FeatureTextConfig,
  UnlockedFeatureUIConfig,
} from '../../../types/hud/unlockedFeatures';
import {
  INVENTORY_KEY,
  QUESTS_KEY,
  TALENTS_KEY,
  UI_DEPTH,
} from '../../../constants/gameConstants';

import { defaultBasicTextConfig } from '../shared/config';
import { fantasyIconsSpriteDefinition } from '../../../assetDefinitions/sprites';

export const defaultFeatureTextConfig: FeatureTextConfig = {
  ...defaultBasicTextConfig,
  getPaddingX: num => num * 48 + 48,
  paddingY: 36,
  text: '',
  align: 'center',
  fontSize: 14,
};

const defaultFeatureSpriteConfig: FeatureSpriteConfig = {
  getPaddingX: num => num * 48 + 48,
  paddingY: 48,
  width: 48,
  height: 48,
  spriteKey: fantasyIconsSpriteDefinition.key,
  frame: 15,
  hoverText: '',
  depth: UI_DEPTH,
  scale: 1.5,
};

export const defaultUnlockedFeatureUIConfig: UnlockedFeatureUIConfig = {
  inventoryText: {
    ...defaultFeatureTextConfig,
    text: INVENTORY_KEY,
  },
  inventorySprite: {
    ...defaultFeatureSpriteConfig,
    frame: 160,
    hoverText: 'Inventory',
  },
  questsText: {
    ...defaultFeatureTextConfig,
    text: QUESTS_KEY,
  },
  questsSprite: {
    ...defaultFeatureSpriteConfig,
    frame: 218,
    hoverText: 'Quests',
  },
  talentsText: {
    ...defaultFeatureTextConfig,
    text: TALENTS_KEY,
  },
  talentsSprite: {
    ...defaultFeatureSpriteConfig,
    frame: 53,
    hoverText: 'Talents',
  },
  inactiveSpriteFrame: 15,
};
