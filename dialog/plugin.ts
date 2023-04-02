import {
  DIALOG_PLUGIN_KEY,
  THEME_DARK_BLUE_NUMBER,
  THEME_DARK_YELLOW,
  THEME_DARK_YELLOW_NUMBER,
  THEME_WHITE,
} from '../constants/gameConstants';
import { getGameHeight, getGameWidth } from '../helpers/gameDimensions';

import { DialogConfig } from '../types/dialog';
import Phaser from 'phaser';

// credit https://github.com/nkholski/phaser-plugin-starter and https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/
export default class DialogPlugin extends Phaser.Plugins.ScenePlugin {
  public config: DialogConfig = {
    borderThickness: 3,
    borderColor: THEME_DARK_YELLOW_NUMBER,
    borderAlpha: 1,
    windowAlpha: 0.9,
    windowColor: THEME_DARK_BLUE_NUMBER,
    windowHeight: 150,
    padding: 32,
    depth: 50,
    closeBtnColor: THEME_DARK_YELLOW,
    closeBtnFontSize: 24,
    fontSize: 20,
    speed: 5,
  };
  public eventCounter: number = 0;
  public visible: boolean = false;
  public text!: Phaser.GameObjects.Text;
  public dialog!: string[];
  public graphics!: Phaser.GameObjects.Graphics;
  public closeBtn!: Phaser.GameObjects.Text;
  public timedEvent!: Phaser.Time.TimerEvent;
  private _onClose?: () => any;

  private scaledTextSize = this.config.fontSize;

  constructor(
    scene: Phaser.Plugins.ScenePlugin['scene'],
    pluginManager: Phaser.Plugins.PluginManager,
  ) {
    super(scene, pluginManager, DIALOG_PLUGIN_KEY);
    this.scene = scene;
  }

  boot() {
    const eventEmitter = this.systems.events;

    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  }

  shutdown() {
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
  }

  destroy() {
    this.shutdown();
  }

  init = (options?: DialogConfig) => {
    if (!options) options = {};

    this.setOptions(options)._createWindow().updateDimensions();
  };

  setOptions = (options?: DialogConfig) => {
    Object.keys(this.config).forEach(key => {
      // @ts-ignore
      this.config[key] = (options ?? {})[key] ?? this.config[key];
    });

    return this;
  };

  toggleWindow = (newValue: boolean = !this.visible, callback?: () => any) => {
    this.visible = newValue;
    if (this.text) this.text.setVisible(this.visible);
    if (this.graphics) this.graphics.setVisible(this.visible);
    if (this.closeBtn) this.closeBtn.visible = this.visible;
    if (!newValue && this._onClose !== undefined) {
      this._onClose();
      this._onClose = undefined;
    }
    if (newValue && callback) {
      this._onClose = callback;
    }
  };

  setText = (text: string, animate: boolean = true) => {
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.timedEvent.remove();

    const temp = animate ? '' : text;
    this._setText(temp);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.config.speed ?? 1) * 30,
        callback: this._animateText,
        callbackScope: this,
        loop: true,
      });
    }

    return this;
  };

  public updateDimensions = (gameSize?: Phaser.Structs.Size) => {
    let width = gameSize ? gameSize.width : this._getGameWidth();

    let factor: number;
    if (width <= 400) {
      factor = 0.6;
    } else if (width <= 600) {
      factor = 0.8;
    } else {
      factor = 1;
    }
    this.scaledTextSize = this.config.fontSize! * factor;
  };

  private _getGameWidth = () => getGameWidth(this.scene);

  private _getGameHeight = () => getGameHeight(this.scene);

  private _calculateWindowDimensions = (width: number, height: number) => ({
    x: this.config.padding!,
    y: height - this.config.windowHeight! - this.config.padding!,
    rectWidth: width - this.config.padding! * 2,
    rectHeight: this.config.windowHeight!,
  });

  private _createInnerWindow = (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    this.graphics
      .fillStyle(this.config.windowColor!, this.config.windowAlpha!)
      .fillRect(x + 1, y + 1, width - 1, height - 1);

    return this;
  };

  private _createOuterWindow = (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    this.graphics
      .lineStyle(
        this.config.borderThickness!,
        this.config.borderColor!,
        this.config.borderAlpha,
      )
      .strokeRect(x, y, width, height);
    return this;
  };

  private _createCloseModalButton = () => {
    const closeButton = this.scene.make.text({
      x:
        this._getGameWidth() -
        this.config.padding! -
        this.config.closeBtnFontSize!,
      y:
        this._getGameHeight() -
        this.config.windowHeight! -
        this.config.padding! +
        3,
      text: 'X',
      style: {
        font: `bold ${this.config.closeBtnFontSize}px Monospace`,
        color: this.config.closeBtnColor,
      },
      depth: this.config.depth! + 1,
      scrollFactor: 0,
    });

    closeButton.setInteractive();
    closeButton.on('pointerover', () => closeButton.setColor('#fff'));
    closeButton.on('pointerout', () =>
      closeButton.setColor(this.config.closeBtnColor!),
    );
    closeButton.on('pointerdown', () => {
      this.toggleWindow();
      if (this.timedEvent) this.timedEvent.remove();
      if (this.text) this.text.destroy();
    });

    this.closeBtn = closeButton;
    return this;
  };

  private _createCloseModalButtonBorder = () => {
    const width = this.config.closeBtnFontSize! + 8;
    const x = this._getGameWidth() - this.config.padding! - width;
    const y =
      this._getGameHeight() - this.config.windowHeight! - this.config.padding!;
    this.graphics.strokeRect(x, y, width, width);
  };

  private _setText = (text: string) => {
    if (this.text) this.text.destroy();

    const x = this.config.padding! + 10;
    const y =
      this._getGameHeight() -
      this.config.windowHeight! -
      this.config.padding! +
      10;

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: {
          width: this._getGameWidth() - this.config.padding! * 2 - 50,
          useAdvancedWrap: true,
        },
        color: THEME_WHITE,
        fontSize: `${this.scaledTextSize}px`,
        fontFamily: 'Monospace',
      },
      depth: this.config.depth,
      scrollFactor: 0,
    });
  };

  private _animateText = () => {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  };

  private _createWindow = () => {
    const gameWidth = this._getGameWidth();

    const gameHeight = this._getGameHeight();

    const { x, y, rectWidth, rectHeight } = this._calculateWindowDimensions(
      gameWidth,
      gameHeight,
    );

    this.graphics = this.scene.add
      .graphics()
      .setDepth(this.config.depth!)
      .setScrollFactor(0);

    this._createOuterWindow(x, y, rectWidth, rectHeight)
      ._createInnerWindow(x, y, rectWidth, rectHeight)
      ._createCloseModalButton()
      ._createCloseModalButtonBorder();

    if (this.graphics) this.graphics.setVisible(this.visible);
    if (this.text) this.text.setVisible(this.visible);
    if (this.closeBtn) this.closeBtn.setVisible(this.visible);

    return this;
  };
}
