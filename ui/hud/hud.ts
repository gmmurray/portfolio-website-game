import { DEFAULT_CONFIG, HudConfig } from './config';
import {
  UnlockedFeatureCallbacks,
  UnlockedFeatures,
} from '../../types/savedData';

import BasicTextUI from './basicText/basicTextUi';
import BattleTextUI from './battleText/BattleTextUI';
import HealthBarUI from './healthBar/HealthBar';
import { Scene } from 'phaser';
import UnlockedFeaturesUI from './unlockedFeatures/UnlockedFeatures';

export default class HUD {
  public config: HudConfig = { ...DEFAULT_CONFIG };

  private _basicText?: BasicTextUI;
  private _healthBar?: HealthBarUI;
  private _unlockedFeatures?: UnlockedFeaturesUI;
  private _battleText?: BattleTextUI;

  private _scene: Scene;

  constructor(scene: Scene) {
    this._scene = scene;
  }

  public shutdown = () => {
    this._basicText?.shutdown();
    this._basicText = undefined;

    this._healthBar?.shutdown();
    this._healthBar = undefined;

    this._unlockedFeatures?.shutdown();
    this._unlockedFeatures = undefined;

    this._battleText?.shutdown();
    this._battleText = undefined;
  };

  public enableBasicText = () => {
    this._basicText = new BasicTextUI(this._scene);

    return this;
  };

  public disableBasicText = () => {
    if (this._basicText) {
      this._basicText.shutdown();
    }
    this._basicText = undefined;

    return this;
  };

  public enableHealthBar = () => {
    this._healthBar = new HealthBarUI(this._scene);

    return this;
  };

  public disableHealthBar = () => {
    if (this._healthBar) {
      this._healthBar.shutdown();
    }
    this._healthBar = undefined;

    return this;
  };

  public enableUnlockedFeatures = () => {
    this._unlockedFeatures = new UnlockedFeaturesUI(this._scene);

    return this;
  };

  public disableUnlockedFeatures = () => {
    if (this._unlockedFeatures) {
      this._unlockedFeatures.shutdown();
    }
    this._unlockedFeatures = undefined;

    return this;
  };

  public enableBattleText = () => {
    this._battleText = new BattleTextUI(this._scene);

    return this;
  };

  public disableBattleText = () => {
    if (this._battleText) {
      this._battleText.shutdown();
    }
    this._battleText = undefined;

    return this;
  };

  public updateBottomCenterText = (value?: string) => {
    this._basicText?.updateBottomCenterText(value);
  };

  public updateTopLeftText = (primary?: string, secondary?: string) => {
    this._basicText?.updateTopLeftText(primary, secondary);
  };

  public updateTopCenterText = (value?: string) => {
    this._basicText?.updateTopCenterText(value);
  };

  public updateCenterText = (value?: string) => {
    this._basicText?.updateCenterText(value);
  };

  public addBuffText = (value: string, duration: number) => {
    this._battleText?.addBuffText(value, duration);
  };

  public addDebuffText = (value: string, duration: number) => {
    this._battleText?.addDebuffText(value, duration);
  };

  public updateHealth = (value?: number) => {
    this._healthBar?.updateHealth(value);
  };

  public updateUnlockedFeatures = (
    features: UnlockedFeatures,
    callbacks: UnlockedFeatureCallbacks,
  ) => {
    this._unlockedFeatures?.update(features, callbacks);
  };
}
