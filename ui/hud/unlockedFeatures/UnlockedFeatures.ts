import { AnyCallback, noop } from '../../../types/callback';
import {
  FeatureSpriteConfig,
  FeatureTextConfig,
  UnlockedFeatureUIConfig,
} from '../../../types/hud/unlockedFeatures';
import {
  UnlockedFeatureCallbacks,
  UnlockedFeatures,
} from '../../../types/savedData';

import { Scene } from 'phaser';
import { UIScene } from '../../../scenes/UIScene';
import { defaultUnlockedFeatureUIConfig } from './config';
import { mergeWithDefault } from '../../../helpers/mergeWithDefault';
import { v4 as uuidv4 } from 'uuid';

export default class UnlockedFeaturesUI {
  private _scene: Scene;

  private _sprites: {
    inventoryActive?: Phaser.GameObjects.Sprite;
    inventoryInactive?: Phaser.GameObjects.Sprite;
    questsActive?: Phaser.GameObjects.Sprite;
    questsInactive?: Phaser.GameObjects.Sprite;
    talentsActive?: Phaser.GameObjects.Sprite;
    talentsInactive?: Phaser.GameObjects.Sprite;
  } = {};

  private _texts: {
    inventory?: Phaser.GameObjects.Text;
    quests?: Phaser.GameObjects.Text;
    talents?: Phaser.GameObjects.Text;
  } = {};

  private _callbacks: {
    inventory: AnyCallback;
    quests: AnyCallback;
    talents: AnyCallback;
  } = {
    inventory: noop,
    quests: noop,
    talents: noop,
  };

  private _config: UnlockedFeatureUIConfig;

  constructor(scene: Scene, config?: UnlockedFeatureUIConfig) {
    this._config = mergeWithDefault(defaultUnlockedFeatureUIConfig, config);
    this._scene = scene;
    Object.keys(this._config).forEach(key => {
      this._setDisplay(key as keyof UnlockedFeatureUIConfig, this._config);
    });
  }

  public shutdown = () => {
    Object.keys(this._sprites).forEach(key => {
      if (this._sprites[key as keyof typeof this._sprites]) {
        this._sprites[key as keyof typeof this._sprites]?.destroy();
      }
    });
    Object.keys(this._texts).forEach(key => {
      if (this._texts[key as keyof typeof this._texts]) {
        this._texts[key as keyof typeof this._texts]?.destroy();
      }
    });
    Object.keys(this._callbacks).forEach(
      key => (this._callbacks[key as keyof typeof this._callbacks] = noop),
    );
  };

  public update = (
    features: UnlockedFeatures,
    callbacks: UnlockedFeatureCallbacks,
  ) => this._update(features, callbacks);

  private _setDisplay = (
    key: keyof UnlockedFeatureUIConfig,
    config: UnlockedFeatureUIConfig,
  ) => {
    if (key === 'inventoryText') {
      this._setTextDisplay(config.inventoryText!, 0, 'inventory');
    } else if (key === 'questsText') {
      this._setTextDisplay(config.questsText!, 1, 'quests');
    } else if (key === 'talentsText') {
      this._setTextDisplay(config.talentsText!, 2, 'talents');
    } else if (key === 'inventorySprite') {
      this._setSpriteDisplay(
        config.inventorySprite!,
        0,
        'inventory',
        'inventoryActive',
        'inventoryInactive',
      );
    } else if (key === 'questsSprite') {
      this._setSpriteDisplay(
        config.questsSprite!,
        1,
        'quests',
        'questsActive',
        'questsInactive',
      );
    } else if (key === 'talentsSprite') {
      this._setSpriteDisplay(
        config.talentsSprite!,
        2,
        'talents',
        'talentsActive',
        'talentsInactive',
      );
    }
  };

  private _setTextDisplay = (
    config: FeatureTextConfig,
    position: number,
    textKey: keyof typeof this._texts,
  ) => {
    if (this._texts[textKey]) this._texts[textKey]!.destroy();

    const {
      fontSize,
      fontFamily,
      fontColor,
      depth,
      getPaddingX,
      align,
      text: content,
    } = config;

    const x = this._getGameWidth() - getPaddingX(position);
    const y = this._getGameHeight() - 16;

    this._texts[textKey] = this._scene.make.text({
      x,
      y,
      depth,
      text: content,
      visible: false,
      scrollFactor: 0,
      origin: 0.5,
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
        align,
      },
    });

    return this;
  };

  private _setSpriteDisplay = (
    config: FeatureSpriteConfig,
    position: number,
    callbackKey: keyof typeof this._callbacks,
    activeKey: keyof typeof this._sprites,
    inactiveKey: keyof typeof this._sprites,
  ) => {
    if (this._sprites[activeKey]) this._sprites[activeKey]!.destroy();
    if (this._sprites[inactiveKey]) this._sprites[inactiveKey]!.destroy();

    const { spriteKey, getPaddingX, paddingY, frame, hoverText, depth, scale } =
      config;

    const x = this._getGameWidth() - getPaddingX(position);
    const y = this._getGameHeight() - paddingY;

    this._sprites[activeKey] = this._scene.add
      .sprite(x, y, spriteKey, frame)
      .setScrollFactor(0)
      .setDepth(depth)
      .setVisible(false)
      .setScale(scale);

    this._sprites[inactiveKey] = this._scene.add
      .sprite(x, y, spriteKey, this._config.inactiveSpriteFrame)
      .setScrollFactor(0)
      .setDepth(depth)
      .setVisible(true)
      .setScale(scale);

    this._sprites[activeKey]!.on('pointerdown', () =>
      this._callbacks[callbackKey](),
    );

    this._addTooltip(x, y, activeKey, hoverText);

    return this;
  };

  private _addTooltip = (
    x: number,
    y: number,
    spriteKey: keyof typeof this._sprites,
    text: string,
  ) => {
    const id = uuidv4();
    (this._scene as UIScene).phaserTooltip.createTooltip({
      x,
      y: y - 50,
      hasBackground: false,
      text: {
        text,
        fontFamily: 'monospace',
        fontSize: 16,
      },
      id,
      target: this._sprites[spriteKey],
    });

    (this._scene as UIScene).phaserTooltip.hideTooltip(id);

    if (this._sprites[spriteKey]) {
      this._sprites[spriteKey]!.on(
        'pointerover',
        () => {
          (this._scene as UIScene).phaserTooltip.showTooltip(id, true);
        },
        this._scene,
      );
      this._sprites[spriteKey]!.on(
        'pointerout',
        () => (this._scene as UIScene).phaserTooltip.hideTooltip(id, true),
        this._scene,
      );
    }
  };

  private _update = (
    features: UnlockedFeatures,
    updatedCallbacks: UnlockedFeatureCallbacks,
  ) => {
    const { inventory, questLog, talentTree } = features ?? {};

    const {
      inventory: updatedInventoryCallback,
      quests: updatedQuestsCallback,
      talents: updatedTalentsCallback,
    } = updatedCallbacks;

    let inventoryOperation = inventory
      ? this._enableFeature
      : this._disableFeature;

    let questsOperation = questLog ? this._enableFeature : this._disableFeature;

    let talentsOperation = talentTree
      ? this._enableFeature
      : this._disableFeature;

    inventoryOperation(
      'inventoryActive',
      'inventoryInactive',
      'inventory',
      'inventory',
      updatedInventoryCallback,
    );
    questsOperation(
      'questsActive',
      'questsInactive',
      'quests',
      'quests',
      updatedQuestsCallback,
    );
    talentsOperation(
      'talentsActive',
      'talentsInactive',
      'talents',
      'talents',
      updatedTalentsCallback,
    );
  };

  private _enableFeature = (
    activeSpriteKey: keyof typeof this._sprites,
    inactiveSpriteKey: keyof typeof this._sprites,
    textKey: keyof typeof this._texts,
    callbackKey: keyof typeof this._callbacks,
    newCallback: AnyCallback,
  ) => {
    this._sprites[activeSpriteKey]
      ?.setVisible(true)
      ?.setInteractive({ useHandCursor: true });
    this._sprites[inactiveSpriteKey]?.setVisible(false);
    this._texts[textKey]?.setVisible(true);
    this._callbacks[callbackKey] = newCallback;
  };

  private _disableFeature = (
    activeSpriteKey: keyof typeof this._sprites,
    inactiveSpriteKey: keyof typeof this._sprites,
    textKey: keyof typeof this._texts,
    callbackKey: keyof typeof this._callbacks,
    newCallback: AnyCallback,
  ) => {
    this._sprites[activeSpriteKey]?.setVisible(false)?.disableInteractive();
    this._sprites[inactiveSpriteKey]?.setVisible(true);
    this._texts[textKey]?.setVisible(false);
    this._callbacks[callbackKey] = noop;
  };

  private _getGameWidth = () => this._scene.cameras.main.worldView.width;
  private _getGameHeight = () => this._scene.cameras.main.worldView.height;
}
