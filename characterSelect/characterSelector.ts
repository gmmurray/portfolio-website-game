import {
  PlayerSpriteDefinition,
  SpriteDefinition,
} from '../types/assetDefinitions';

import { playerCharacterOptions } from '../assetDefinitions/sprites';

let instance: CharacterSelector | null = null;
export class CharacterSelector {
  private _defaultPlayerDefinition: SpriteDefinition;
  private _selectedPlayerDefinition: SpriteDefinition | null = null;

  constructor() {
    this._defaultPlayerDefinition = this._createDefaultCharacter();
  }

  private _createDefaultCharacter = () => {
    const options = Object.values(playerCharacterOptions);

    const num = Math.floor(Math.random() * options.length);

    return options[num];
  };

  public getPlayerDefinition = () => {
    return this._selectedPlayerDefinition ?? this._defaultPlayerDefinition;
  };

  public setPlayerDefinition = (definition?: PlayerSpriteDefinition) => {
    this._selectedPlayerDefinition = definition ?? null;
  };

  static getInstance = () => instance ?? new CharacterSelector();
}
