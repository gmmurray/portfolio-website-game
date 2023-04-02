import {
  THEME_DARK_BLUE_NUMBER,
  THEME_DARK_YELLOW,
  THEME_DARK_YELLOW_NUMBER,
} from '../constants/gameConstants';

export interface McDialogConfig {
  borderThickness?: number;
  borderColor?: number;
  borderAlpha?: number;
  windowAlpha?: number;
  windowColor?: number;
  windowHeight?: number;
  padding?: number;
  depth?: number;
  closeBtnColor?: string;
  closeBtnFontSize?: number;
  fontSize?: number;
  speed?: number;
  answerLimit?: number;
  answerFontSize?: number;
}

export const defaultMcDialogConfig: McDialogConfig = {
  borderThickness: 3,
  borderColor: THEME_DARK_YELLOW_NUMBER,
  borderAlpha: 1,
  windowAlpha: 0.9,
  windowColor: THEME_DARK_BLUE_NUMBER,
  windowHeight: 150,
  padding: 32,
  depth: 50,
  closeBtnColor: THEME_DARK_YELLOW,
  closeBtnFontSize: 24,
  fontSize: 20,
  speed: 5,
  answerLimit: 4,
  answerFontSize: 16,
};

export interface WindowConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}
