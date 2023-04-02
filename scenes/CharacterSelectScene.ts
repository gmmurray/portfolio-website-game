import {
  CHARACTER_SELECT_SCENE_KEY,
  LEVEL_ONE_SCENE_KEY,
  SCALE,
  THEME_SECONDARY_BLUE_NUMBER,
  THEME_YELLOW_NUMBER,
} from '../constants/gameConstants';
import {
  playerCharacterInformation,
  playerCharacterOptions,
} from '../assetDefinitions/sprites';

import { CharacterSelector } from '../characterSelect/characterSelector';
import { PlayerSpriteDefinition } from '../types/assetDefinitions';
import { SceneConfig } from '../types/SceneConfig';
import { UIEventEmitter } from '../ui/eventEmitter';

const lineHeight = 15;
const containerHeight = 5 * lineHeight;

const fontFamily = 'Monospace';
const fontSize = `${lineHeight}px`;

export class CharacterSelectScene extends Phaser.Scene {
  private _characterSelector!: CharacterSelector;
  private _uiEmitter!: UIEventEmitter;
  private _options: {
    definition: PlayerSpriteDefinition;
    container: Phaser.GameObjects.Container;
    graphics: Phaser.GameObjects.Graphics;
  }[] = [];
  private _selectedIndex: number | null = null;
  private _confirmButton?: Phaser.GameObjects.Text;
  private _characterSprite: Phaser.GameObjects.Sprite | null = null;
  private _characterTitleText: Phaser.GameObjects.Text | null = null;
  private _characterDescriptionText: Phaser.GameObjects.Text | null = null;

  constructor() {
    super(CHARACTER_SELECT_SCENE_KEY);
  }

  public create = ({ uiEmitter, characterSelector }: SceneConfig) => {
    this._characterSelector = characterSelector;
    this._uiEmitter = uiEmitter;

    this._setHeaderContainer();
    this._setAvatarContainers();
    this._setButtons();
  };

  private _setHeaderContainer = () => {
    const screenWidth = this.cameras.main.width;
    const containerWidth = screenWidth - lineHeight * 2;

    const text = this.add
      .text(containerWidth / 2, containerHeight / 2, 'Choose your character', {
        fontFamily,
        fontSize: `${lineHeight * 3}px`,
      })
      .setOrigin(0.5);
    this.add.container(lineHeight, lineHeight, text);
  };

  private _setAvatarContainers = () => {
    const screenWidth = this.cameras.main.width;
    const options = Object.values(playerCharacterOptions);

    const containerWidth = (screenWidth / options.length) * 2;

    let characterIndex = 0;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < options.length / 2; j++) {
        const index = characterIndex;
        const definition = options[index];

        const boxWidth = containerWidth - lineHeight * 2; // width - padding on each side
        const boxHeight = containerHeight;

        const graphics = this.add.graphics();
        graphics
          .lineStyle(2, THEME_SECONDARY_BLUE_NUMBER, 1)
          .strokeRect(0, 0, boxWidth, boxHeight);

        const text = this.add
          .text(
            boxWidth / 2, // center width
            boxHeight / 2, // center height
            playerCharacterInformation[definition.infoKey].name,
            { fontFamily, fontSize },
          )
          .setOrigin(0.5);

        const container = this.add.container(
          j * containerWidth + lineHeight,
          lineHeight +
            containerHeight +
            lineHeight +
            i * (lineHeight + boxHeight), // first container + margin + previous row's height
          [graphics, text],
        );

        this._options.push({
          definition,
          container,
          graphics,
        });

        text
          .setInteractive({ useHandCursor: true })
          .on(
            'pointerdown',
            () => this._handleOptionSelect(index, boxWidth, boxHeight),
            this,
          );
        characterIndex++;
      }
    }
  };

  private _handleOptionSelect = (
    index: number,
    boxWidth: number,
    boxHeight: number,
  ) => {
    if (this._selectedIndex !== null) {
      this._options[this._selectedIndex].graphics
        .lineStyle(2, THEME_SECONDARY_BLUE_NUMBER, 1)
        .strokeRect(0, 0, boxWidth, boxHeight);
    }

    this._options[index].graphics
      .lineStyle(2, THEME_YELLOW_NUMBER, 1)
      .strokeRect(0, 0, boxWidth, boxHeight);

    this._selectedIndex = index;
    this._confirmButton?.setVisible(true);
    this._setCharacterTitle();
    this._setCharacterSprite();
    this._setCharacterDescription();
  };

  private _setButtons = () => {
    const screenHeight = this.cameras.main.height;
    const screenWidth = this.cameras.main.width;

    const randomButton = this.add
      .text(screenHeight / 2, 0, 'Random character', {
        fontFamily,
        fontSize,
      })
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5)
      .on('pointerdown', this._handleRandomClick, this);

    this._confirmButton = this.add
      .text(screenWidth / 2, -(lineHeight * 3), 'Select this character', {
        fontFamily,
        fontSize,
      })
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5)
      .on('pointerdown', this._handleConfirmClick, this)
      .setVisible(false);

    this.add.container(lineHeight, screenHeight - lineHeight * 2, [
      this._confirmButton,
      randomButton,
    ]);
  };

  private _setCharacterTitle = () => {
    if (this._selectedIndex === null) return;

    const screenWidth = this.cameras.main.width;

    const y = containerHeight * 3 + lineHeight * 5;

    const { infoKey } = this._options[this._selectedIndex].definition;

    if (this._characterTitleText) {
      this._characterTitleText.destroy();
    }

    this._characterTitleText = this.add
      .text(screenWidth / 2, y, playerCharacterInformation[infoKey].name, {
        fontFamily,
        fontSize: `${lineHeight * 2}px`,
      })
      .setOrigin(0.5);
  };

  private _setCharacterDescription = () => {
    if (this._selectedIndex === null) return;

    const screenWidth = this.cameras.main.width;

    const y = containerHeight * 3 + lineHeight * 8;

    const { infoKey } = this._options[this._selectedIndex].definition;

    if (this._characterDescriptionText) {
      this._characterDescriptionText.destroy();
    }

    this._characterDescriptionText = this.add
      .text(
        screenWidth / 2,
        y,
        playerCharacterInformation[infoKey].description,
        {
          fontFamily,
          fontSize,
          wordWrap: { width: screenWidth - lineHeight * 2 },
          align: 'center',
        },
      )
      .setOrigin(0.5);
  };

  private _setCharacterSprite = () => {
    if (this._selectedIndex === null) return;

    const screenWidth = this.cameras.main.width;

    const y = containerHeight * 6 + lineHeight;

    const spriteKey = this._options[this._selectedIndex].definition.key;

    if (this._characterSprite) {
      this._characterSprite.destroy();
    }

    this._characterSprite = this.add
      .sprite(screenWidth / 2, y, spriteKey, 1)
      .setScale(SCALE)
      .setDisplaySize(150, 150)
      .setOrigin(0.5);
  };

  private _handleConfirmClick = () => {
    if (this._selectedIndex === null) return;

    this._makeCharacterSelection(this._options[this._selectedIndex].definition);
  };

  private _handleRandomClick = () => {
    this._makeCharacterSelection();
  };

  private _makeCharacterSelection = (definition?: PlayerSpriteDefinition) => {
    this._characterSelector?.setPlayerDefinition(definition);

    this.scene.start(
      LEVEL_ONE_SCENE_KEY,
      new SceneConfig(this._uiEmitter!, this._characterSelector!),
    );
  };
}
