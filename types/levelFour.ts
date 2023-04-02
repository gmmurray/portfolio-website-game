import { Coordinates } from './position';

export interface LevelFourEnemyDefinition {
  id: string;
  startPos: Coordinates;
  textureKey: string;
  bounds: {
    left: number;
    right: number;
  };
  damage: number;
  name: string;
}

export interface LevelFourEnemy {
  container: Phaser.GameObjects.Container;
  definition: LevelFourEnemyDefinition;
  mapBounds: {
    left: number;
    right: number;
  };
  sprite: Phaser.GameObjects.Sprite;
}

export interface LevelFourFoodDefinition {
  id: string;
  position: Coordinates;
  textureKey: string;
  name: string;
  value: number;
}

export interface LevelFourObjectiveDefinition {
  id: string;
  position: Coordinates;
  textureKey: string;
  name: string;
}

export interface LevelFourInvisibleInteractionDefinition {
  position: Coordinates;
  width: number;
  height: number;
  handlerKey: 'ladder';
  payload: Record<string, any>;
}
