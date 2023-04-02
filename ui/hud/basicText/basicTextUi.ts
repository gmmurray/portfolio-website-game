import { BasicTextUIConfig } from '../../../types/hud/basicText';
import { Scene } from 'phaser';
import { defaultBasicTextUIConfig } from './config';
import { mergeWithDefault } from '../../../helpers/mergeWithDefault';

export default class BasicTextUI {
  private _texts: {
    bottomCenter?: Phaser.GameObjects.Text;
    topLeftPrimary?: Phaser.GameObjects.Text;
    topLeftSecondary?: Phaser.GameObjects.Text;
    topCenter?: Phaser.GameObjects.Text;
    center?: Phaser.GameObjects.Text;
  } = {};

  private _scene: Scene;
  private _config: BasicTextUIConfig;

  constructor(scene: Scene, config?: BasicTextUIConfig) {
    this._config = mergeWithDefault(defaultBasicTextUIConfig, config);
    this._scene = scene;
    Object.keys(this._config).forEach(key => {
      this._setTextDisplay(key as keyof BasicTextUIConfig, this._config);
    });
  }

  public shutdown = () => {
    if (this._texts.bottomCenter) {
      this._texts.bottomCenter.destroy();
      this._texts.bottomCenter = undefined;
    }
    if (this._texts.topLeftPrimary) {
      this._texts.topLeftPrimary.destroy();
      this._texts.topLeftPrimary = undefined;
    }
    if (this._texts.topLeftSecondary) {
      this._texts.topLeftSecondary.destroy();
      this._texts.topLeftSecondary = undefined;
    }
    if (this._texts.topCenter) {
      this._texts.topCenter.destroy();
      this._texts.topCenter = undefined;
    }
    if (this._texts.center) {
      this._texts.center.destroy();
      this._texts.center = undefined;
    }
  };

  public updateBottomCenterText = (value?: string) => {
    this._updateText('bottomCenter', value);
  };

  public updateTopCenterText = (value?: string) => {
    this._updateText('topCenter', value);
  };

  public updateCenterText = (value?: string) => {
    this._updateText('center', value);
  };

  public updateTopLeftText = (primary?: string, secondary?: string) => {
    if (!this._texts.topLeftPrimary) return;
    if (primary) {
      this._updateText('topLeftPrimary', primary);

      if (secondary) {
        this._setTopLeftSecondaryText(secondary);
      } else {
        this._removeTopLeftSecondaryText();
      }
    } else {
      this._removeTopLeftPrimaryText();
      this._removeTopLeftSecondaryText();
    }
  };

  private _setTextDisplay = (
    key: keyof BasicTextUIConfig,
    config: BasicTextUIConfig,
  ) => {
    if (key === 'bottomCenter') {
      this._setBottomCenterTextDisplay(config.bottomCenter);
    } else if (key === 'center') {
      this._setCenterTextDisplay(config.center);
    } else if (key === 'topCenter') {
      this._setTopCenterTextDisplay(config.topCenter);
    } else if (key === 'topLeft') {
      this._setTopLeftTextDisplay(config.topLeft);
    }
  };

  private _setBottomCenterTextDisplay = (
    config: BasicTextUIConfig['bottomCenter'],
  ) => {
    if (this._texts.bottomCenter) this._texts.bottomCenter.destroy();

    const { fontSize, fontFamily, fontColor, depth, margin } = config!;

    const x = this._getGameWidth() / 2;
    const y = this._getGameHeight() - margin!;

    this._texts.bottomCenter = this._scene.make.text({
      x,
      y,
      depth,
      text: '',
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
      },
      visible: false,
      scrollFactor: 0,
      origin: 0.5,
    });

    return this;
  };

  private _setCenterTextDisplay = (config: BasicTextUIConfig['center']) => {
    if (this._texts.center) this._texts.center.destroy();

    const {
      fontSize,
      fontFamily,
      fontColor,
      depth,
      fontStyle,
      paddingX,
      paddingY,
    } = config!;

    const centerXY = this._getGameHeight() / 2;

    const x = centerXY + paddingX;
    const y = centerXY - paddingY;

    this._texts.center = this._scene.make.text({
      x,
      y,
      depth,
      text: '',
      visible: false,
      scrollFactor: 0,
      origin: 0.5,
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
        fontStyle,
      },
    });

    return this;
  };

  private _setTopCenterTextDisplay = (
    config: BasicTextUIConfig['topCenter'],
  ) => {
    if (this._texts.topCenter) this._texts.topCenter.destroy();

    const { fontSize, fontFamily, fontColor, depth, padding } = config!;

    const x = this._getGameWidth() / 2;
    const y = padding;

    this._texts.topCenter = this._scene.make.text({
      x,
      y,
      depth,
      text: '',
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
      },
      visible: false,
      scrollFactor: 0,
      origin: 0.5,
    });

    return this;
  };

  private _setTopLeftTextDisplay = (config: BasicTextUIConfig['topLeft']) => {
    if (this._texts.topLeftPrimary) this._texts.topLeftPrimary.destroy();
    if (this._texts.topLeftSecondary) this._texts.topLeftSecondary.destroy();

    const { fontSize, fontFamily, fontColor, depth, padding } = config!;

    const xPrimary = padding;
    const yPrimary = padding;

    this._texts.topLeftPrimary = this._scene.make.text({
      x: xPrimary,
      y: yPrimary,
      depth,
      text: '',
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
      },
      visible: false,
      scrollFactor: 0,
    });

    this._texts.topLeftSecondary = this._scene.make.text({
      x: xPrimary,
      y: yPrimary! + fontSize! + 10,
      depth,
      text: '',
      style: {
        color: fontColor,
        fontFamily,
        fontSize: `${fontSize}px`,
      },
      visible: false,
      scrollFactor: 0,
    });

    return this;
  };

  private _updateText = (textKey: keyof typeof this._texts, value?: string) => {
    if (!this._texts[textKey]) return;
    if (value !== undefined) {
      this._setText(textKey, value);
    } else {
      this._removeText(textKey);
    }
  };

  private _setText = (textKey: keyof typeof this._texts, value: string) => {
    this._texts[textKey]?.setText(value).setVisible(true);
  };

  private _removeText = (textKey: keyof typeof this._texts) => {
    this._texts[textKey]?.setText('').setVisible(false);
  };

  private _setTopLeftSecondaryText = (value: string) => {
    if (!(this._texts.topLeftPrimary && this._texts.topLeftSecondary)) return;
    this._texts.topLeftSecondary.setText(value).setVisible(true);
  };

  private _removeTopLeftPrimaryText = () => {
    if (!this._texts.topLeftPrimary) return;
    this._texts.topLeftPrimary.setVisible(false).setText('');

    this._removeTopLeftSecondaryText();
  };

  private _removeTopLeftSecondaryText = () => {
    if (!(this._texts.topLeftPrimary && this._texts.topLeftSecondary)) return;
    this._texts.topLeftSecondary.setVisible(false).setText('');
  };

  private _getGameWidth = () => this._scene.cameras.main.worldView.width;
  private _getGameHeight = () => this._scene.cameras.main.worldView.height;
}
