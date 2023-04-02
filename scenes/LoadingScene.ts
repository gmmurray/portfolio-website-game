import {
  ASSETS_BASE_URL,
  CHARACTER_SELECT_SCENE_KEY,
  LOADING_SCENE_KEY,
  THEME_DARK_YELLOW_NUMBER,
  THEME_WHITE,
  THEME_YELLOW_NUMBER,
  UI_SCENE_KEY,
} from '../constants/gameConstants';
import {
  acidBlobSpriteDefinition,
  beetleSpriteDefinition,
  fantasyIconsSpriteDefinition,
  fireSpriteDefinitions,
  goblinSpriteDefinition,
  gregSpriteDefinition,
  greyCatSpriteDefinition,
  levelThreeFireBarrierDefinition,
  levelThreeFireExplosionDefinition,
  levelthreeFireColumnDefinition,
  playerCharacterOptions,
  purplePortalSpriteDefinition,
  skeletonOneSpriteDefinition,
  skeletonTwoSpriteDefinition,
  slimeSpriteDefinition,
  soldierSpriteDefinition,
  whiteCatSpriteDefinition,
} from '../assetDefinitions/sprites';
import {
  coffeeCupImageDefinition,
  javascriptPixelImageDefinition,
  pizzaPartyImageDefinition,
  tunaRollImageDefinition,
} from '../assetDefinitions/images';
import { getGameHeight, getGameWidth } from '../helpers/gameDimensions';
import {
  levelFourMapDefinition,
  levelOneMapDefinition,
  levelThreeMapDefinition,
  levelTwoMapDefinition,
} from '../assetDefinitions/tiles';

import { CharacterSelector } from '../characterSelect/characterSelector';
import { Scene } from 'phaser';
import { SceneConfig } from '../types/SceneConfig';
import { UIEventEmitter } from '../ui/eventEmitter';

const spriteDefinitions = [
  ...Object.values(playerCharacterOptions),
  gregSpriteDefinition,
  greyCatSpriteDefinition,
  whiteCatSpriteDefinition,
  ...fireSpriteDefinitions,
  levelthreeFireColumnDefinition,
  levelThreeFireExplosionDefinition,
  levelThreeFireBarrierDefinition,
  goblinSpriteDefinition,
  skeletonOneSpriteDefinition,
  skeletonTwoSpriteDefinition,
  soldierSpriteDefinition,
  fantasyIconsSpriteDefinition,
  beetleSpriteDefinition,
  acidBlobSpriteDefinition,
  slimeSpriteDefinition,
  purplePortalSpriteDefinition,
];
const tileDefinitions = [
  levelOneMapDefinition,
  levelTwoMapDefinition,
  levelThreeMapDefinition,
  levelFourMapDefinition,
];

const imageDefinitions = [
  coffeeCupImageDefinition,
  tunaRollImageDefinition,
  pizzaPartyImageDefinition,
  javascriptPixelImageDefinition,
];

export class LoadingScene extends Scene {
  public isDev = process.env.NODE_ENV === 'development';
  public progressBox?: Phaser.GameObjects.Graphics;
  public progressText?: Phaser.GameObjects.Text;
  public progressBar?: Phaser.GameObjects.Graphics;
  public uiEmitter: UIEventEmitter;
  public characterSelector: CharacterSelector;
  constructor() {
    super(LOADING_SCENE_KEY);
    this.uiEmitter = UIEventEmitter.getInstance();
    this.characterSelector = CharacterSelector.getInstance();
  }

  public preload = () => {
    // handle loading https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/ loading bar tutorial
    this._createProgress();
    this.load.on('progress', this._updateProgress);
    this.load.on('complete', this._removeProgress);

    this._setBaseLoadUrl()._loadSprites()._loadTiles()._loadImages();
  };

  public create = () => {
    if (!this.isDev) {
      this._showLogoIntro();
    }
    this._startFirstScene();
  };

  private _createProgress = () => {
    const width = this._getGameWidth() / 2;
    this.progressBox = this.add
      .graphics()
      .fillStyle(THEME_DARK_YELLOW_NUMBER, 1)
      .fillRect(width - width / 2, width, width, 50)
      .setScrollFactor(0)
      .setDepth(1);

    this.progressText = this.make.text({
      x: width,
      y: width + 25,
      text: '0%',
      style: {
        font: '20px monospace',
        color: THEME_WHITE,
      },
      scrollFactor: 0,
      origin: 0.5,
      depth: 3,
    });

    this.progressBar = this.add.graphics().setScrollFactor(0).setDepth(2);

    return this;
  };

  private _updateProgress = (value: number) => {
    if (!this.progressBar) return;

    const boxWidth = this._getGameWidth() / 2;

    this.progressBar
      .clear()
      .fillStyle(THEME_YELLOW_NUMBER, 1)
      .fillRect(
        boxWidth - boxWidth / 2 + 10,
        boxWidth + 10,
        (boxWidth - 15) * value,
        30,
      );

    if (this.progressText) {
      this.progressText.setText(`${parseInt((value * 100).toString())}%`);
    }

    return;
  };

  private _removeProgress = () => {
    if (this.progressBox) this.progressBox.destroy();
    if (this.progressText) this.progressText.destroy();
    if (this.progressBar) this.progressBar.destroy();
  };

  private _setBaseLoadUrl = () => {
    this.load.baseURL = ASSETS_BASE_URL;
    return this;
  };

  private _loadSprites = () => {
    spriteDefinitions.forEach(({ key, source, frameWidth, frameHeight }) => {
      this.load.spritesheet(key, source, { frameWidth, frameHeight });
    });

    return this;
  };

  private _loadTiles = () => {
    tileDefinitions.forEach(({ key, source, tilesets }) => {
      this.load.tilemapTiledJSON(key, source);

      tilesets.forEach(({ key: tsKey, source: tsSource }) => {
        this.load.image(tsKey, tsSource);
      });
    });

    return this;
  };

  private _loadImages = () => {
    this.load.image('logo', '../../../assets/game/images/logo_transparent.png');

    imageDefinitions.forEach(({ key, source }) => {
      this.load.image(key, source);
    });

    return this;
  };

  private _showLogoIntro = () => {
    const width = this._getGameWidth() / 2;
    const height = this._getGameHeight() / 2;
    this.add.image(width, height, 'logo').setScale(0.25);
    return this;
  };

  private _startFirstScene = () => {
    this.time.delayedCall(
      this.isDev ? 0 : 2000,
      () => {
        this.scene.launch(UI_SCENE_KEY, this.uiEmitter);
        this.scene.start(
          CHARACTER_SELECT_SCENE_KEY,
          new SceneConfig(this.uiEmitter, this.characterSelector),
        );
      },
      [],
      this,
    );

    return this;
  };

  private _getGameWidth = () => getGameWidth(this);

  private _getGameHeight = () => getGameHeight(this);
}
