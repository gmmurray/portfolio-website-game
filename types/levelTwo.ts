import { ItemDefinition } from './interactions';

export interface PillarProgress {
  completed: boolean;
}

export interface PillarOneSolution {
  itemName: string;
  hint: string;
}

export interface IPillarOneState {
  solution: PillarOneSolution;
  isFound: boolean;
}

export interface PillarTwoSolutionOption {
  id: number;
  text: string;
}

export interface PillarTwoSolution {
  question: string;
  options: PillarTwoSolutionOption[];
  answer: number; // correct answer id
  hint: string;
}

export interface IPillarTwoState {
  solution: PillarTwoSolution;
  isComplete: boolean;
}

export interface ILevelTwoProgress {
  1: PillarProgress;
  2: PillarProgress;
  3: PillarProgress;
}

export class LevelTwoProgress implements ILevelTwoProgress {
  public 1: PillarProgress;
  public 2: PillarProgress;
  public 3: PillarProgress;

  constructor() {
    this[1] = this._createProgress();
    this[2] = this._createProgress();
    this[3] = this._createProgress();
  }

  private _createProgress = (): PillarProgress => ({
    completed: false,
  });
}

export enum FireColor {
  GREEN,
  BLUE,
  WHITE,
  PURPLE,
}

export enum FireNumber {
  ONE,
  TWO,
  THREE,
  FOUR,
}

export interface PuzzleFires {
  active?: FireColor;
  fires: {
    [FireColor.GREEN]?: {
      sprite: Phaser.GameObjects.Sprite | null;
      animation: Phaser.Animations.Animation | null;
      characterId: string | null;
    };
    [FireColor.BLUE]?: {
      sprite: Phaser.GameObjects.Sprite | null;
      animation: Phaser.Animations.Animation | null;
      characterId: string | null;
    };
    [FireColor.WHITE]?: {
      sprite: Phaser.GameObjects.Sprite | null;
      animation: Phaser.Animations.Animation | null;
      characterId: string | null;
    };
    [FireColor.PURPLE]?: {
      sprite: Phaser.GameObjects.Sprite | null;
      animation: Phaser.Animations.Animation | null;
      characterId: string | null;
    };
  };
}

export interface IPillarThreeState {
  [FireNumber.ONE]: PuzzleFires;
  [FireNumber.TWO]: PuzzleFires;
  [FireNumber.THREE]: PuzzleFires;
  [FireNumber.FOUR]: PuzzleFires;
  solution: Record<FireNumber, FireColor>;
}

export class PillarThreeState implements IPillarThreeState {
  public [FireNumber.ONE]: PuzzleFires;
  public [FireNumber.TWO]: PuzzleFires;
  public [FireNumber.THREE]: PuzzleFires;
  public [FireNumber.FOUR]: PuzzleFires;
  public solution!: Record<FireNumber, FireColor>;

  constructor() {
    this[FireNumber.ONE] = this._createFire();
    this[FireNumber.TWO] = this._createFire();
    this[FireNumber.THREE] = this._createFire();
    this[FireNumber.FOUR] = this._createFire();
  }

  private _createFire = (): PuzzleFires => ({
    active: undefined,
    fires: {
      [FireColor.GREEN]: {
        sprite: null,
        animation: null,
        characterId: null,
      },
      [FireColor.BLUE]: {
        sprite: null,
        animation: null,
        characterId: null,
      },
      [FireColor.WHITE]: {
        sprite: null,
        animation: null,
        characterId: null,
      },
      [FireColor.PURPLE]: {
        sprite: null,
        animation: null,
        characterId: null,
      },
    },
  });
}

export interface LevelTwoItem extends ItemDefinition {
  pillar?: 1 | 2 | 3;
  hint?: string;
}
