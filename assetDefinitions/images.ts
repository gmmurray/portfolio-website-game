import { ImageDefinition } from '../types/assetDefinitions';
import { getImageSource } from '../helpers/getAssetSource';

export const coffeeCupImageDefinition: ImageDefinition = {
  key: 'coffee-cup-image',
  source: getImageSource('coffee_cup'),
};

export const tunaRollImageDefinition: ImageDefinition = {
  key: 'tuna-roll-image',
  source: getImageSource('tuna_roll'),
};

export const pizzaPartyImageDefinition: ImageDefinition = {
  key: 'pizza-party-image',
  source: getImageSource('pizza_party'),
};

export const javascriptPixelImageDefinition: ImageDefinition = {
  key: 'javascript-pixel-image',
  source: getImageSource('javascript_pixel'),
};
