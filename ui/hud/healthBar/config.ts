import { HealthBarUIConfig, HpBarConfig } from '../../../types/hud/healthbar';
import {
  THEME_DANGER_EFFECT_NUMBER,
  THEME_NEGATIVE_EFFECT_NUMBER,
  THEME_POSTIVE_EFFECT_NUMBER,
} from '../../../constants/gameConstants';

import { defaultTopTextConfig } from '../shared/config';

export const defaultHpBarConfig: HpBarConfig = {
  backgroundColor: 0x000,
  lowColor: THEME_NEGATIVE_EFFECT_NUMBER,
  mediumColor: THEME_DANGER_EFFECT_NUMBER,
  highColor: THEME_POSTIVE_EFFECT_NUMBER,
  barHeight: 10,
  paddingX: 32,
  paddingY: 32,
  maxHealth: 100,
};

export const defaultHealthBarUIConfig: HealthBarUIConfig = {
  label: { ...defaultTopTextConfig },
  value: { ...defaultTopTextConfig },
  bar: { ...defaultHpBarConfig },
};
