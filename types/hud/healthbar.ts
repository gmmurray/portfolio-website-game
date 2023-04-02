import { TopTextConfig } from './shared';

export interface HealthBarUIConfig {
  label?: TopTextConfig;
  value?: TopTextConfig;
  bar?: HpBarConfig;
}

export interface HpBarConfig {
  backgroundColor: number;
  lowColor: number;
  mediumColor: number;
  highColor: number;
  barHeight: number;
  paddingX: number;
  paddingY: number;
  maxHealth: number;
}
