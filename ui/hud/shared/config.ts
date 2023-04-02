import { BasicTextConfig, TopTextConfig } from '../../../types/hud/shared';
import { THEME_WHITE, UI_DEPTH } from '../../../constants/gameConstants';

export const defaultBasicTextConfig: BasicTextConfig = {
  margin: 25,
  fontSize: 18,
  fontFamily: 'Monospace',
  fontColor: THEME_WHITE,
  depth: UI_DEPTH,
};
export const defaultTopTextConfig: TopTextConfig = {
  ...defaultBasicTextConfig,
  padding: 32,
};
