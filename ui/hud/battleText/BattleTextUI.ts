import {
  BattleTextUIConfig,
  BuffDebuffTextConfig,
} from '../../../types/hud/battleText';

import { Scene } from 'phaser';
import { defaultBattleTextUIConfig } from './config';
import { mergeWithDefault } from '../../../helpers/mergeWithDefault';

export default class BattleTextUI {
  private _scene: Scene;
  private _config: BattleTextUIConfig;

  private _buffs?: Phaser.GameObjects.Text[];
  private _debuffs?: Phaser.GameObjects.Text[];

  constructor(scene: Scene, config?: BattleTextUIConfig) {
    this._config = mergeWithDefault(defaultBattleTextUIConfig, config);
    this._scene = scene;
    Object.keys(this._config).forEach(key => {
      this._setDisplay(key as keyof BattleTextUIConfig, this._config);
    });
  }

  public shutdown = () => {
    if (this._buffs) {
      this._buffs.forEach(buff => buff.shutdown());
    }

    if (this._debuffs) {
      this._debuffs.forEach(debuff => debuff.shutdown());
    }
  };

  public addBuffText = (value: string, duration: number) => {
    this._addBuffDebuffText(value, duration, 'buffs', this._buffs);
  };

  public addDebuffText = (value: string, duration: number) => {
    this._addBuffDebuffText(value, duration, 'debuffs', this._debuffs);
  };

  private _setDisplay = (
    key: keyof BattleTextUIConfig,
    config: BattleTextUIConfig,
  ) => {
    if (false) {
    }
  };

  private _addBuffDebuffText = (
    value: string,
    fadeScrollDuration: number,
    type: 'buffs' | 'debuffs',
    texts?: Phaser.GameObjects.Text[],
  ) => {
    if (!texts) {
      texts = [];
    }

    const config = type === 'buffs' ? this._config.buffs : this._config.debuffs;

    const newText = this._createBuffDebuffTextDisplay(config!, value);

    const newTextIndex = texts.length;

    texts.push(newText);

    this._fadeScrollBuffDebuffText(newText, fadeScrollDuration);
    this._scene.time.delayedCall(
      fadeScrollDuration,
      this._removeBuffDebuffText,
      [texts, newTextIndex],
      this,
    );
  };

  private _createBuffDebuffTextDisplay = (
    config: BuffDebuffTextConfig,
    value: string,
  ) => {
    const {
      fontSize,
      fontFamily,
      fontColor,
      depth,
      paddingX,
      fontStyle,
      align,
    } = config;

    const centerX = this._getGameWidth() / 2;
    const centerY = this._getGameHeight() / 2;

    const x = centerX + paddingX;
    const y = centerY;

    return this._scene.make.text({
      x,
      y,
      depth,
      text: value,
      visible: true,
      scrollFactor: 0,
      origin: 0.5,
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
        align,
        fontStyle,
      },
    });
  };

  private _fadeScrollText = (
    text: Phaser.GameObjects.Text,
    delay: number,
    duration: number,
  ) => {
    this._scene.time.delayedCall(
      delay,
      () => {
        this._fadeOutText(text, duration)._scrollDownText(text, duration);
      },
      [],
      this,
    );
  };

  private _fadeOutText = (text: Phaser.GameObjects.Text, duration: number) => {
    this._scene.add.tween({
      targets: [text],
      duration,
      ease: 'Linear',
      alpha: 0,
    });

    return this;
  };

  private _scrollDownText = (
    text: Phaser.GameObjects.Text,
    duration: number,
  ) => {
    this._scene.add.tween({
      targets: [text],
      duration,
      ease: 'Linear',
      y: '+=100',
    });

    return this;
  };

  private _fadeScrollBuffDebuffText = (
    text: Phaser.GameObjects.Text,
    fadeScrollDuration: number,
  ) => {
    this._fadeScrollText(text, 0, fadeScrollDuration);

    return this;
  };

  private _removeBuffDebuffText = (
    texts: Phaser.GameObjects.Text[],
    index: number,
  ) => {
    texts.splice(index, 1);
  };

  private _getGameWidth = () => this._scene.cameras.main.worldView.width;
  private _getGameHeight = () => this._scene.cameras.main.worldView.height;
}
