import { Coordinates } from '../types/position';

export const createDamagingFireKey = (key: string, location: Coordinates) =>
  `${key}-${location.x}-${location.y}`;
