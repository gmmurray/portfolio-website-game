import { BasicTextConfig, SpriteConfig } from './shared';

export interface FeatureTextConfig extends BasicTextConfig {
  getPaddingX: (num: number) => number;
  paddingY: number;
  text: string;
  align: string;
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

export interface UnlockedFeatureUIConfig {
  inventoryText?: FeatureTextConfig;
  inventorySprite?: FeatureSpriteConfig;
  questsText?: FeatureTextConfig;
  questsSprite?: FeatureSpriteConfig;
  talentsText?: FeatureTextConfig;
  talentsSprite?: FeatureSpriteConfig;
  inactiveSpriteFrame: number;
}
