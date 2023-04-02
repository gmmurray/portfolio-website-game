import {
  assetCredits,
  guideCredits,
  introMessage,
} from '../helpers/creditsSceneContent';

import { CREDIT_SCENE_KEY } from '../constants/gameConstants';
import { PORTFOLIO_URL } from '../constants/urls';

const lineHeight = 15;

const fontFamily = 'Monospace';
const fontSize = `${lineHeight}px`;

const introTextDuration = 5000;

export class CreditsScene extends Phaser.Scene {
  private _scrollingTextContainer!: Phaser.GameObjects.Container;
  private _introText!: Phaser.GameObjects.Text;
  private _showScrollingText = false;
  private _scrollingPaused = false;

  constructor() {
    super(CREDIT_SCENE_KEY);
  }

  public create = () => {
    this._setScrollingTextContainer();
    this._setIntroText();
    this._setLinks();

    this.time.delayedCall(introTextDuration, this._startTextScroll, [], this);
  };

  public update = () => {
    if (this._showScrollingText) {
      this._moveScrollingText();
    }
  };

  private _setScrollingTextContainer = () => {
    const screenDimension = this._getScreenDimension();

    const text = this._createCreditsText();

    this._scrollingTextContainer = this.add
      .container(screenDimension, screenDimension * 3, text)
      .setVisible(false);
  };

  private _setIntroText = () => {
    const screenDimension = this._getScreenDimension();

    this._introText = this.add
      .text(screenDimension, screenDimension, introMessage, {
        fontFamily,
        fontSize: `${lineHeight * 3}px`,
        wordWrap: { width: screenDimension - 50 },
        align: 'center',
      })
      .setOrigin(0.5);
  };

  private _setLinks = () => {
    this.add
      .text(lineHeight, lineHeight, 'Restart game', {
        fontFamily,
        fontSize,
      })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this._handleRestartGameClick());

    this.add
      .text(lineHeight, lineHeight * 3, 'Go home', {
        fontFamily,
        fontSize,
      })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this._handleGoHomeClick());

    this.add
      .text(lineHeight, lineHeight * 5, 'Go to credits page', {
        fontFamily,
        fontSize,
      })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this._handleGoToCreditsClick());
  };

  private _startTextScroll = () => {
    this._introText.destroy();
    this._scrollingTextContainer.setVisible(true);
    this._showScrollingText = true;
  };

  private _moveScrollingText = () => {
    if (this._scrollingPaused) return;
    this._scrollingTextContainer.setY(this._scrollingTextContainer.y - 0.75);
  };

  private _handleCreditsHover = (hovering: boolean) => {
    this._scrollingPaused = hovering;
  };

  private _handleRestartGameClick = () => {
    if (window) {
      window.location.reload();
    }
  };

  private _handleGoHomeClick = () => {
    if (window) {
      window.location.href = PORTFOLIO_URL;
    }
  };

  private _handleGoToCreditsClick = () => {
    if (window) {
      window.location.href = window.location.origin + '/credits';
    }
  };

  private _createCreditsText = () => {
    let text = 'Guides\n\n\n';

    text += this._getGuideCredits();
    text += '\n\n\nAssets\n\n\n';
    text += this._getAssetCredits();

    return this.add
      .text(0, 0, text, {
        fontSize,
        fontFamily,
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerover', () => this._handleCreditsHover(true))
      .on('pointerout', () => this._handleCreditsHover(false));
  };

  private _getGuideCredits = () => guideCredits.map(c => c.name).join(`\n\n`);
  private _getAssetCredits = () => assetCredits.map(c => c.name).join(`\n\n`);

  private _getScreenDimension = () => this.cameras.main.width / 2;
}
