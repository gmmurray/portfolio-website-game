import { BasicTextConfig } from './shared';

export interface BuffDebuffTextConfig extends BasicTextConfig {
  paddingX: number;
  fontStyle: string;
  align: 'right' | 'left';
}

export interface BattleTextUIConfig {
  buffs?: BuffDebuffTextConfig;
  debuffs?: BuffDebuffTextConfig;
}
