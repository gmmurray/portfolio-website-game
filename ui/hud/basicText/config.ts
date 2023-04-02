import {
  BasicTextUIConfig,
  CenterTextConfig,
} from '../../../types/hud/basicText';
import { defaultBasicTextConfig, defaultTopTextConfig } from '../shared/config';

export const defaultCenterTextConfig: CenterTextConfig = {
  ...defaultBasicTextConfig,
  fontSize: defaultBasicTextConfig.fontSize! * 2,
  fontStyle: 'bold',
  paddingX: 16,
  paddingY: 64,
};

export const defaultBasicTextUIConfig: BasicTextUIConfig = {
  bottomCenter: { ...defaultBasicTextConfig },
  topLeft: { ...defaultTopTextConfig },
  topCenter: { ...defaultTopTextConfig },
  center: { ...defaultCenterTextConfig },
};
