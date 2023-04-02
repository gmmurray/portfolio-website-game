import { HUD_INITIALIZED_EVENT, HUD_SHUTDOWN_EVENT } from '../ui/events';
import {
  LEVEL_ONE_SCENE_KEY,
  RANDOM_MOVEMENT_DELAY,
} from '../constants/gameConstants';
import {
  gregSpriteDefinition,
  greyCatSpriteDefinition,
  whiteCatSpriteDefinition,
} from '../assetDefinitions/sprites';

import { LevelScene } from './LevelScene';
import { SceneConfig } from '../types/SceneConfig';
import { getLevelOneCast } from '../cast/levelOne';
import { levelOneMapDefinition } from '../assetDefinitions/tiles';

export class LevelOne extends LevelScene {
  constructor() {
    super(LEVEL_ONE_SCENE_KEY);
    this.levelNumber = 1;
    this.mapDefinition = levelOneMapDefinition;
  }

  public create = ({ uiEmitter, characterSelector }: SceneConfig) => {
    this.uiEventEmitter = uiEmitter;
    this.characterSelector = characterSelector;
    this.cast = getLevelOneCast(this.characterSelector.getPlayerDefinition());

    this.setCharacters()
      ?.setItems()
      ?.setPortals()
      ?.setDoors()
      ?.setCamera()
      ?.setMap()
      ?.attachKeyboardListener();

    this._initializeHUD();

    this.dialog.init();

    if (!this.isDev) {
      this.createNewDialog(
        'hint: move using the arrow or WASD keys. interact using space or enter',
      );
    }

    this.initialCharacterMovement();
    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
      this.dialog.updateDimensions(gameSize);
    });

    this.events.on('wake', () => this._initializeHUD());
  };

  public update = () => {
    this.useGridPlayerControls().setFacing();
  };

  public shutdown = () => {
    this.uiEventEmitter.emit(HUD_SHUTDOWN_EVENT);
  };

  public initialCharacterMovement = () => {
    const greg = this.characters.find(
      c => c.definition!.key === gregSpriteDefinition.key,
    );
    const khufu = this.characters.find(
      c => c.definition!.key === greyCatSpriteDefinition.key,
    );
    const dre = this.characters.find(
      c => c.definition!.key === whiteCatSpriteDefinition.key,
    );

    // start with greg off screen and running towards player. then go to walking speed
    if (greg) {
      this.gridEngine.moveTo(greg.definition!.key, { x: 24, y: 50 });
      this.gridEngine.setSpeed(greg.definition!.key, 2);
    }
    // start the cats mving around randomly with delay so they aren't synchronized
    if (khufu) {
      this.gridEngine.moveRandomly(
        khufu.definition!.key,
        RANDOM_MOVEMENT_DELAY,
        khufu.startingSpeed,
      );
    }
    if (dre) {
      this.gridEngine.moveRandomly(
        dre.definition!.key,
        RANDOM_MOVEMENT_DELAY + 200,
        dre.startingSpeed,
      );
    }
  };

  private _initializeHUD = () => {
    this.time.delayedCall(
      100,
      () => {
        this.uiEventEmitter.emit(
          HUD_INITIALIZED_EVENT,
          true,
          false,
          true,
          false,
        );
        this.loadUnlockedFeatures();
      },
      [],
      this,
    );
  };
}
