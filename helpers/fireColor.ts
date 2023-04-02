import { FireColor } from '../types/levelTwo';

export const getFireColorName = (color: FireColor) => {
  let colorName: string;
  switch (color) {
    case FireColor.BLUE:
      colorName = 'blue';
      break;
    case FireColor.GREEN:
      colorName = 'green';
      break;
    case FireColor.WHITE:
      colorName = 'white';
      break;
    case FireColor.PURPLE:
      colorName = 'purple';
      break;
  }

  return colorName;
};
