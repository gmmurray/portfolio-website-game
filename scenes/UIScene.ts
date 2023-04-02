import {
  ADD_BUFF_EVENT,
  ADD_DEBUFF_EVENT,
  HUD_INITIALIZED_EVENT,
  HUD_SHUTDOWN_EVENT,
  UPDATE_BOTTOM_CENTER_TEXT_EVENT,
  UPDATE_CENTER_TEXT_EVENT,
  UPDATE_HEALTH_EVENT,
  UPDATE_TOP_CENTER_TEXT_EVENT,
  UPDATE_TOP_LEFT_TEXT_EVENT,
  UPDATE_UNLOCKED_FEATURES_EVENT,
} from '../ui/events';
import { UnlockedFeatureCallbacks, UnlockedFeatures } from '../types/savedData';

import HUD from '../ui/hud/hud';
import PhaserTooltip from '../PhaserTooltip/phaserTooltip';
import { Scene } from 'phaser';
import { UIEventEmitter } from '../ui/eventEmitter';
import { UI_SCENE_KEY } from '../constants/gameConstants';

export class UIScene extends Scene {
  public hud?: HUD;
  public phaserTooltip!: PhaserTooltip;
  private _uiEventEmitter!: UIEventEmitter;

  constructor() {
    super(UI_SCENE_KEY);
  }

  public create = (uiEventEmitter: UIEventEmitter) => {
    this._uiEventEmitter = uiEventEmitter;
    this._registerEvents();
  };

  private _initializeHUDHandler = (
    enableBasicText: boolean,
    enableHealthBar: boolean,
    enableUnlockedFeatures: boolean,
    enableBattleText: boolean,
  ) => {
    this.hud = new HUD(this);
    if (enableBasicText) {
      this.hud.enableBasicText();
    } else {
      this.hud.disableBasicText();
    }

    if (enableHealthBar) {
      this.hud.enableHealthBar();
    } else {
      this.hud.disableHealthBar();
    }

    if (enableUnlockedFeatures) {
      this.hud.enableUnlockedFeatures();
    } else {
      this.hud.disableUnlockedFeatures();
    }

    if (enableBattleText) {
      this.hud.enableBattleText();
    } else {
      this.hud.disableBattleText();
    }
  };

  private _shutdownHandler = () => {
    this.hud?.shutdown();
  };

  private _updateTopLeftText = (primary?: string, secondary?: string) => {
    this.hud?.updateTopLeftText(primary, secondary);
  };

  private _updateTopCenterText = (value?: string) => {
    this.hud?.updateTopCenterText(value);
  };

  private _updateUnlockedFeaturesHandler = (
    features: UnlockedFeatures,
    callbacks: UnlockedFeatureCallbacks,
  ) => {
    this.hud?.updateUnlockedFeatures(features, callbacks);
  };

  private _updateHealth = (value?: number) => {
    this.hud?.updateHealth(value);
  };

  private _addBuffText = (value: string, duration: number) => {
    this.hud?.addBuffText(value, duration);
  };

  private _addDebuffText = (value: string, duration: number) => {
    this.hud?.addDebuffText(value, duration);
  };

  private _updateCenterText = (value?: string) => {
    this.hud?.updateCenterText(value);
  };

  private _updateBottomCenterText = (value?: string) => {
    this.hud?.updateBottomCenterText(value);
  };

  private _registerEvents = () => {
    this._uiEventEmitter.on(
      HUD_INITIALIZED_EVENT,
      this._initializeHUDHandler,
      this,
    );
    this._uiEventEmitter.on(HUD_SHUTDOWN_EVENT, this._shutdownHandler, this);
    this._uiEventEmitter.on(
      UPDATE_TOP_LEFT_TEXT_EVENT,
      this._updateTopLeftText,
      this,
    );
    this._uiEventEmitter.on(
      UPDATE_TOP_CENTER_TEXT_EVENT,
      this._updateTopCenterText,
      this,
    );
    this._uiEventEmitter.on(UPDATE_HEALTH_EVENT, this._updateHealth, this);
    this._uiEventEmitter.on(
      UPDATE_UNLOCKED_FEATURES_EVENT,
      this._updateUnlockedFeaturesHandler,
      this,
    );
    this._uiEventEmitter.on(ADD_BUFF_EVENT, this._addBuffText, this);
    this._uiEventEmitter.on(ADD_DEBUFF_EVENT, this._addDebuffText, this);
    this._uiEventEmitter.on(
      UPDATE_CENTER_TEXT_EVENT,
      this._updateCenterText,
      this,
    );
    this._uiEventEmitter.on(
      UPDATE_BOTTOM_CENTER_TEXT_EVENT,
      this._updateBottomCenterText,
      this,
    );
  };
}
