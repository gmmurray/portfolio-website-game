import {
  INVENTORY_KEY,
  QUESTS_KEY,
  TALENTS_KEY,
  THEME_DANGER_EFFECT_NUMBER,
  THEME_NEGATIVE_EFFECT,
  THEME_NEGATIVE_EFFECT_NUMBER,
  THEME_POSITIVE_EFFECT,
  THEME_POSTIVE_EFFECT_NUMBER,
  THEME_WHITE,
} from '../../constants/gameConstants';

import { fantasyIconsSpriteDefinition } from '../../assetDefinitions/sprites';

const BASE_DEPTH = 49;

export interface BasicTextConfig {
  margin?: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  depth?: number;
}

const defaultBasicTextConfig: BasicTextConfig = {
  margin: 25,
  fontSize: 18,
  fontFamily: 'Monospace',
  fontColor: THEME_WHITE,
  depth: BASE_DEPTH,
};

export interface TopTextConfig extends BasicTextConfig {
  padding?: number;
}

const defaultTopTextConfig: TopTextConfig = {
  ...defaultBasicTextConfig,
  padding: 32,
};

export interface CenterTextConfig extends BasicTextConfig {
  fontStyle: string;
  paddingX: number;
  paddingY: number;
}

export interface BuffDebuffTextConfig extends BasicTextConfig {
  paddingX: number;
  fontStyle: string;
  align: 'right' | 'left';
}

export interface FeatureTextConfig extends BasicTextConfig {
  getPaddingX: (num: number) => number;
  paddingY: number;
  text: string;
  align: string;
}

export interface SpriteConfig {
  spriteKey: string;
  frame: number;
}

export interface FeatureSpriteConfig extends SpriteConfig {
  getPaddingX: (num: number) => number;
  paddingY: number;
  width: number;
  height: number;
  hoverText: string;
  depth: number;
  scale: number;
}

const defaultCenterTextConfig: CenterTextConfig = {
  ...defaultBasicTextConfig,
  fontSize: defaultBasicTextConfig.fontSize! * 2,
  fontStyle: 'bold',
  paddingX: 16,
  paddingY: 64,
};

const defaultBuffTextConfig: BuffDebuffTextConfig = {
  ...defaultBasicTextConfig,
  fontColor: THEME_POSITIVE_EFFECT,
  paddingX: 128,
  fontStyle: 'bold',
  align: 'left',
};

const defaultDebuffTextConfig: BuffDebuffTextConfig = {
  ...defaultBasicTextConfig,
  fontColor: THEME_NEGATIVE_EFFECT,
  paddingX: -128,
  fontStyle: 'bold',
  align: 'right',
};

const defaultFeatureTextConfig: FeatureTextConfig = {
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
  depth: BASE_DEPTH,
  scale: 1.5,
};

export interface HpBarConfig {
  backgroundColor: number;
  lowColor: number;
  mediumColor: number;
  highColor: number;
  barHeight: number;
  paddingX: number;
  paddingY: number;
}

const defaultHpBarConfig: HpBarConfig = {
  backgroundColor: 0x000,
  lowColor: THEME_NEGATIVE_EFFECT_NUMBER,
  mediumColor: THEME_DANGER_EFFECT_NUMBER,
  highColor: THEME_POSTIVE_EFFECT_NUMBER,
  barHeight: 10,
  paddingX: 32,
  paddingY: 32,
};

export interface HudConfig {
  texts: {
    bottomCenter?: BasicTextConfig;
    topLeft?: TopTextConfig;
    topCenter?: TopTextConfig;
    center?: CenterTextConfig;
    hp?: {
      label?: TopTextConfig;
      value?: TopTextConfig;
    };
    buffs?: BuffDebuffTextConfig;
    debuffs?: BuffDebuffTextConfig;
    inventory?: FeatureTextConfig;
    quest?: FeatureTextConfig;
    talents?: FeatureTextConfig;
  };
  bars: {
    hp?: HpBarConfig;
  };
  sprites: {
    featured: {
      inventory: FeatureSpriteConfig;
      quests: FeatureSpriteConfig;
      talents: FeatureSpriteConfig;
    };
  } & Record<string, Record<string, SpriteConfig>>;
  maxHealth: number;
}

export const DEFAULT_CONFIG: HudConfig = {
  texts: {
    bottomCenter: {
      ...defaultBasicTextConfig,
    },
    topLeft: {
      ...defaultTopTextConfig,
    },
    topCenter: {
      ...defaultTopTextConfig,
    },
    center: {
      ...defaultCenterTextConfig,
    },
    hp: {
      label: { ...defaultTopTextConfig },
      value: { ...defaultTopTextConfig },
    },
    buffs: {
      ...defaultBuffTextConfig,
    },
    debuffs: {
      ...defaultDebuffTextConfig,
    },
    inventory: {
      ...defaultFeatureTextConfig,
      text: INVENTORY_KEY,
    },
    quest: {
      ...defaultFeatureTextConfig,
      text: QUESTS_KEY,
    },
    talents: {
      ...defaultFeatureTextConfig,
      text: TALENTS_KEY,
    },
  },
  bars: {
    hp: { ...defaultHpBarConfig },
  },
  sprites: {
    featured: {
      inventory: {
        ...defaultFeatureSpriteConfig,
        frame: 160,
        // @ts-ignore
        hoverText: 'Inventory',
      },
      quests: {
        ...defaultFeatureSpriteConfig,
        frame: 218,
        hoverText: 'Quests',
      },
      talents: {
        ...defaultFeatureSpriteConfig,
        frame: 53,
        hoverText: 'Talents',
      },
    },
  },
  maxHealth: 100,
};

export const INACTIVE_FEATURE_SPRITE_FRAME = 15;
