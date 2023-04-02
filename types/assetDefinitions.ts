import { FireColor } from './levelTwo';
import { LevelFour } from '../scenes/LevelFour';
import { Tilemaps } from 'phaser';

export interface SpriteDefinition {
  key: string;
  source: string;
  frameWidth: number;
  frameHeight: number;
  walkingAnimationMapping?: number;
  scale: number;
}

export interface PlayerSpriteDefinition extends SpriteDefinition {
  infoKey: string;
}

export interface TileSetDefinition {
  name: string;
  key: string;
  source: string;
}

export interface TileMapDefinition {
  key: string;
  source: string;
  animatedLayer: string[];
  tilesets: TileSetDefinition[];
  characterLayer?: CharacterLayerDefinition;
}

export interface ImageDefinition {
  key: string;
  source: string;
}

export interface CharacterLayerTransition {
  x: number;
  y: number;
  toUpper: boolean;
}

export interface CharacterLayerDefinition {
  lower: string;
  upper: string;
  transitions: CharacterLayerTransition[];
}

export interface FireSpriteDefinition extends SpriteDefinition {
  color: FireColor;
}

export interface LayerDefinition {
  [name: string]: {
    depth?: number;
    configure?: (layer: Tilemaps.TilemapLayer, level: LevelFour) => any;
  };
}
