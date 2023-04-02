import { HealthBarUIConfig } from '../../../types/hud/healthbar';
import { Scene } from 'phaser';
import { UI_DEPTH } from '../../../constants/gameConstants';
import { defaultHealthBarUIConfig } from './config';
import { mergeWithDefault } from '../../../helpers/mergeWithDefault';

export default class HealthBarUI {
  private _scene: Scene;

  private _label!: Phaser.GameObjects.Text;
  private _value!: Phaser.GameObjects.Text;
  private _barValue!: Phaser.GameObjects.Graphics;
  private _barBackground!: Phaser.GameObjects.Graphics;

  private _config: HealthBarUIConfig;

  constructor(scene: Scene, config?: HealthBarUIConfig) {
    this._config = mergeWithDefault(defaultHealthBarUIConfig, config);
    this._scene = scene;
    Object.keys(this._config).forEach(key => {
      this._setDisplay(key as keyof HealthBarUIConfig, this._config);
    });
  }

  public shutdown = () => {
    if (this._label) {
      this._label.destroy();
    }
    if (this._value) this._value.destroy();
    if (this._barValue) this._barValue.destroy();
    if (this._barBackground) this._barBackground.destroy();
  };

  public updateBar = (value: number) => {
    if (!(this._barBackground && this._barValue)) return;
    this._setBarValue(value);

    return this;
  };

  public updateValueText = (value?: number) => {
    if (value !== undefined) {
      this._setValueText(value);
    } else {
      this._removeValueText();
    }

    return this;
  };

  public updateHealth = (value?: number) => {
    if (value !== undefined) {
      this.updateBar(value)?.updateValueText(value);
    } else {
      this.updateValueText();
    }
  };

  private _setDisplay = (
    key: keyof HealthBarUIConfig,
    config: HealthBarUIConfig,
  ) => {
    if (key === 'label') {
      this._setLabelDisplay(config.label, config.bar);
    } else if (key === 'value') {
      this._setValueDisplay(config.value, config.bar);
    } else if (key === 'bar') {
      this._setBarDisplay(config.bar);
    }
  };

  private _setLabelDisplay = (
    labelConfig: HealthBarUIConfig['label'],
    barConfig: HealthBarUIConfig['bar'],
  ) => {
    if (this._label) this._label.destroy();

    const { fontSize, fontFamily, fontColor, depth } = labelConfig!;

    const { paddingX, paddingY, barHeight } = barConfig!;

    const gameWidth = this._getGameWidth();

    const barWidth = gameWidth / 4;
    const x = gameWidth - barWidth - paddingX;
    const y = paddingY + 2 * barHeight;

    this._label = this._scene.make.text({
      x,
      y,
      depth,
      text: 'HP',
      visible: true,
      scrollFactor: 0,
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
      },
      origin: 0,
    });

    return this;
  };

  private _setValueDisplay = (
    valueConfig: HealthBarUIConfig['value'],
    barConfig: HealthBarUIConfig['bar'],
  ) => {
    if (this._value) this._value.destroy();

    const { fontSize, fontFamily, fontColor, depth } = valueConfig!;

    const { paddingX, paddingY, barHeight } = barConfig!;

    const gameWidth = this._getGameWidth();
    const x = gameWidth - paddingX;
    const y = paddingY + 2 * barHeight;

    this._value = this._scene.make
      .text({
        x,
        y,
        depth,
        text: '',
        visible: false,
        scrollFactor: 0,
        style: {
          color: fontColor,
          fontFamily,
          fontSize: `${fontSize}px`,
        },
      })
      .setOrigin(1, 0);

    return this;
  };

  private _setBarDisplay = (config: HealthBarUIConfig['bar']) => {
    this._setBarGraphics()._setBarBackground(config);
  };

  private _setBarGraphics = () => {
    this._barValue = this._scene.add.graphics().setScrollFactor(0);

    this._barBackground = this._scene.add.graphics().setScrollFactor(0);

    return this;
  };

  private _setBarBackground = (config: HealthBarUIConfig['bar']) => {
    if (!this._barBackground) return;

    const { paddingX, paddingY, barHeight, backgroundColor } = config!;

    const gameWidth = this._getGameWidth();

    const barWidth = gameWidth / 4;

    this._barBackground
      .fillStyle(backgroundColor, 1)
      .fillRect(gameWidth - barWidth - paddingX, paddingY, barWidth, barHeight)
      .setDepth(UI_DEPTH);

    return this;
  };

  private _setBarValue = (value: number) => {
    if (!(this._barValue && this._barValue)) return;

    const {
      paddingX,
      paddingY,
      barHeight,
      lowColor,
      mediumColor,
      highColor,
      maxHealth,
    } = this._config.bar!;

    const gameWidth = this._getGameWidth();

    const barWidth = gameWidth / 4;

    let barColor: number;
    if (value > 30) {
      barColor = highColor;
    } else if (value >= 15) {
      barColor = mediumColor;
    } else {
      barColor = lowColor;
    }

    this._barValue
      .clear()
      .fillStyle(barColor, 1)
      .fillRect(
        gameWidth - barWidth - paddingX,
        paddingY,
        (barWidth * value) / maxHealth,
        barHeight,
      )
      .setDepth(UI_DEPTH + 1);

    return this;
  };

  private _setValueText = (value: number) => {
    if (!this._value) return;

    const { maxHealth } = this._config.bar!;
    this._value.setText(`${value}/${maxHealth}`).setVisible(true);
  };

  private _removeValueText = () => {
    if (!this._value.text) return;
    this._value.setVisible(false).setText('');
  };

  private _getGameWidth = () => this._scene.cameras.main.worldView.width;
  private _getGameHeight = () => this._scene.cameras.main.worldView.height;
}
