import {
  MC_DIALOG_PLUGIN_KEY,
  THEME_WHITE,
  THEME_YELLOW,
} from '../constants/gameConstants';
import { McDialogConfig, WindowConfig, defaultMcDialogConfig } from './config';
import { getGameHeight, getGameWidth } from '../helpers/gameDimensions';

import Phaser from 'phaser';

export default class McDialogPlugin extends Phaser.Plugins.ScenePlugin {
  public config: McDialogConfig = defaultMcDialogConfig;

  public eventCounter: number = 0;
  public visible: boolean = false;
  public questionText!: Phaser.GameObjects.Text;
  public optionsText: Record<number, Phaser.GameObjects.Text> = {};
  public optionsRect: Record<number, WindowConfig> = {};
  public optionsRectIdLookup: Record<number, number> = {};
  public dialogText!: string[];
  public graphics!: Phaser.GameObjects.Graphics;
  public closeBtnText!: Phaser.GameObjects.Text;
  public timedEvent!: Phaser.Time.TimerEvent;

  private _scaledTextSize = this.config.fontSize;

  public constructor(
    scene: Phaser.Plugins.ScenePlugin['scene'],
    pluginManager: Phaser.Plugins.PluginManager,
  ) {
    super(scene, pluginManager, MC_DIALOG_PLUGIN_KEY);
    this.scene = scene;
  }

  public boot = () => {
    const { events } = this.systems;

    events.on('shutdown', this.shutdown, this);
    events.on('destroy', this.destroy, this);
  };

  public shutdown = () => {
    if (this.timedEvent) this.timedEvent.remove();
    if (this.questionText) this.questionText.destroy();
    if (this.closeBtnText) this.closeBtnText.destroy();
    if (this.graphics) this.graphics.destroy();

    Object.keys(this.optionsText).forEach(key => {
      // @ts-ignore
      if (this.optionsText[key]) this.optionsText[key].destroy();
    });
  };

  public destroy = () => {
    this.shutdown();
  };

  public init = (config?: McDialogConfig) => {
    if (!config) config = {};

    this.setConfig(config)._createWindow().updateDimensions();
  };

  public setConfig = (config?: McDialogConfig) => {
    Object.keys(this.config).forEach(key => {
      // @ts-ignore
      this.config[key] = (config ?? {})[key] ?? this.config[key];
    });

    return this;
  };

  public toggleWindow = (newValue: boolean = !this.visible) => {
    this.visible = newValue;
    this._toggleVisibility(this.visible);
  };

  public setQuestionText = (question: string, animate: boolean = true) => {
    this.eventCounter = 0;
    this.dialogText = question.split('');
    if (this.timedEvent) this.timedEvent.remove();

    const temp = animate ? '' : question;
    this._setQuestionText(temp);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - this.config.speed! * 30,
        callback: this._animateText,
        callbackScope: this,
        loop: true,
      });
    }

    return this;
  };

  public setOptionsText = (options: { id: number; text: string }[]) => {
    const limitedOptions = options.slice(0, this.config.answerLimit);
    limitedOptions.forEach(({ id, text }, index) => {
      this.optionsText[id] = this._makeOptionsText(id, text, index);
    });
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
    this._scaledTextSize = this.config.fontSize! * factor;
  };

  private _setQuestionText = (text: string) => {
    if (this.questionText) this.questionText.destroy();

    const x = this.config.padding! + 10;
    const y = this._getWindowYPosition() - this.config.padding! + 10;

    this.questionText = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: {
          width: this._getGameWidth() - this.config.padding! * 2 - 50,
          useAdvancedWrap: true,
        },
        color: THEME_WHITE,
        fontSize: `${this._scaledTextSize}px`,
        fontFamily: 'Monospace',
      },
      depth: this.config.depth,
      scrollFactor: 0,
    });
  };

  private _animateText = () => {
    this.eventCounter++;
    this.questionText.setText(
      this.questionText.text + this.dialogText[this.eventCounter - 1],
    );
    if (this.eventCounter === this.dialogText.length) {
      this.timedEvent.remove();
    }
  };

  private _makeOptionsText = (id: number, text: string, index: number) => {
    if (this.optionsText[id]) this.optionsText[id].destroy();

    const currentRect = this.optionsRect[index];
    const textObject = (this.optionsText[id] = this.scene.make.text({
      x: currentRect.x + currentRect.width / 2,
      y: currentRect.y + currentRect.height / 2,
      text,
      depth: this.config.depth,
      scrollFactor: 0,
      style: {
        color: THEME_YELLOW,
        fontSize: `${this._scaledTextSize}px`,
        fontFamily: 'Monospace',
      },
      origin: 0.5,
    }));

    textObject
      .setInteractive()
      .on('pointerover', () => textObject.setColor(THEME_WHITE))
      .on('pointerout', () => textObject.setColor(THEME_YELLOW));

    return textObject;
  };

  private _getGameWidth = () => getGameWidth(this.scene);
  private _getGameHeight = () => getGameHeight(this.scene);

  private _createWindow = () => {
    const windowDimensions = this._calculateWindowDimensions();
    const optionRects = this._calculateOptionDimensions();

    this.graphics = this.scene.add
      .graphics()
      .setDepth(this.config.depth!)
      .setScrollFactor(0);

    this._createOuterWindow(windowDimensions)
      ._createInnerWindow(windowDimensions)
      ._createCloseModalButton()
      ._createCloseModalButtonBorder();

    optionRects.forEach((option, index) => {
      this.optionsRect = {
        ...(this.optionsRect ?? {}),
        [index]: option,
      };
      this._createOptionWindow(option);
    });

    this._toggleVisibility(this.visible);

    return this;
  };

  private _calculateWindowDimensions = (): WindowConfig => {
    const gameWidth = this._getGameWidth();
    const gameHeight = this._getGameHeight();

    return {
      x: this.config.padding!,
      y: this._getWindowYPosition() - this.config.padding!,
      width: gameWidth - this.config.padding! * 2,
      height: gameHeight / 2,
    };
  };

  private _createOuterWindow = ({ x, y, width, height }: WindowConfig) => {
    this.graphics
      .lineStyle(
        this.config.borderThickness!,
        this.config.borderColor!,
        this.config.borderAlpha,
      )
      .strokeRect(x, y, width, height);
    return this;
  };

  private _createInnerWindow = ({ x, y, width, height }: WindowConfig) => {
    this.graphics
      .fillStyle(this.config.windowColor!, this.config.windowAlpha!)
      .fillRect(x + 1, y + 1, width - 1, height - 1);

    return this;
  };

  private _calculateOptionDimensions = (): WindowConfig[] => {
    const width = this._getOptionWidth();
    const height = this._getOptionHeight();
    const leftOptionX = this.config.padding! * 2;
    const rightOptionX = this._getGameWidth() - leftOptionX - width;
    const rowOneY = this._getWindowYPosition() + this.config.padding!;
    const rowTwoY = rowOneY + height + this.config.padding!;

    return [
      {
        x: leftOptionX,
        y: rowOneY,
        width,
        height,
      },
      {
        x: rightOptionX,
        y: rowOneY,
        width,
        height,
      },
      {
        x: leftOptionX,
        y: rowTwoY,
        width,
        height,
      },
      {
        x: rightOptionX,
        y: rowTwoY,
        width,
        height,
      },
    ];
  };

  private _createOptionWindow = ({ x, y, width, height }: WindowConfig) => {
    this.graphics
      .lineStyle(
        this.config.borderThickness!,
        this.config.borderColor!,
        this.config.borderAlpha,
      )
      .strokeRect(x, y, width, height);
  };

  private _createCloseModalButton = () => {
    const closeButton = this.scene.make.text({
      x:
        this._getGameWidth() -
        this.config.padding! -
        this.config.closeBtnFontSize!,
      y: this._getWindowYPosition() - this.config.padding! + 3,
      text: 'X',
      style: {
        font: `bold ${this.config.closeBtnFontSize}px Monospace`,
        color: this.config.closeBtnColor,
      },
      depth: this.config.depth! + 1,
      scrollFactor: 0,
    });

    closeButton.setInteractive();

    closeButton.on('pointerover', () => closeButton.setColor(THEME_WHITE));
    closeButton.on('pointerout', () =>
      closeButton.setColor(this.config.closeBtnColor!),
    );
    closeButton.on('pointerdown', () => {
      this.toggleWindow();
      if (this.timedEvent) this.timedEvent.remove();
    });

    this.closeBtnText = closeButton;
    return this;
  };

  private _createCloseModalButtonBorder = () => {
    const width = this.config.closeBtnFontSize! + 8;
    const x = this._getGameWidth() - this.config.padding! - width;
    const y = this._getWindowYPosition() - this.config.padding!;
    this.graphics.strokeRect(x, y, width, width);
    return this;
  };

  private _getWindowYPosition = () =>
    this._getGameHeight() - this._getGameHeight() / 2;

  private _toggleVisibility = (value: boolean) => {
    if (this.questionText) this.questionText.setVisible(value);
    if (this.graphics) this.graphics.setVisible(value);
    if (this.closeBtnText) this.closeBtnText.setVisible(value);

    if (this.optionsText) {
      Object.keys(this.optionsText).forEach(key => {
        // @ts-ignore
        if (this.optionsText[key]) this.optionsText[key].setVisible(value);
      });
    }
  };

  public setOnSelect = (func: Function) => {
    Object.keys(this.optionsText).forEach(key => {
      // @ts-ignore
      if (!this.optionsText[key]) return;
      // @ts-ignore
      this.optionsText[key].on('pointerdown', () => func(key));
    });
  };

  private _getOptionWidth = () =>
    this._getGameWidth() / 2 - this.config.padding! * 3;

  private _getOptionHeight = () =>
    this._getGameHeight() / 4 - this.config.padding! * 2;
}
