import {
  BattleTextUIConfig,
  BuffDebuffTextConfig,
} from '../../../types/hud/battleText';
import {
  THEME_NEGATIVE_EFFECT,
  THEME_POSITIVE_EFFECT,
} from '../../../constants/gameConstants';

import { defaultBasicTextConfig } from '../shared/config';

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

export const defaultBattleTextUIConfig: BattleTextUIConfig = {
  buffs: { ...defaultBuffTextConfig },
  debuffs: { ...defaultDebuffTextConfig },
};
