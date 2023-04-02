import { Coordinates } from './position';
import { Direction } from 'grid-engine';
import { LevelScene } from '../scenes/LevelScene';
import { SpriteDefinition } from './assetDefinitions';

export interface LevelCast {
  player: PlayerCharacter;
  npcs: NpcCharacter[];
  items: ItemDefinition[];
  doors: DoorDefinition[];
  portals: PortalDefinition[];
}

export type PerformInteraction = (scene: LevelScene) => any;

export interface Interaction {
  friendlyName?: string;
}

export enum PortalType {
  SCENE,
  COORDINATE,
}

export interface ItemDefinition extends Interaction {
  handler: PerformInteraction;
  x: number;
  y: number;
  sprite?: Phaser.GameObjects.Sprite;
}
export interface DoorDefinition extends Interaction {
  from: Coordinates[];
  to: Coordinates;
  face?: Direction;
  inactive?: boolean;
  inactiveMoveDir?: Direction;
  inactiveDialog?: string;
  layer?: string;
}

export interface PortalDefinition extends Interaction {
  from: Coordinates;
  type: PortalType;
  to: string | Coordinates;
  dialog?: string;
  face?: Direction;
  layer?: string;
}

export interface Character {
  sprite?: Phaser.GameObjects.Sprite;
  definition: SpriteDefinition;
  startingX: number;
  startingY: number;
  startingSpeed: number;
  facingDirection?: Direction;
}

export interface PlayerCharacter extends Character {}

export interface NpcCharacter extends Character, Interaction {
  radius?: number;
  handler?: PerformInteraction;
}
