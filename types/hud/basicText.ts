import { BasicTextConfig, TopTextConfig } from './shared';

export interface CenterTextConfig extends BasicTextConfig {
  fontStyle: string;
  paddingX: number;
  paddingY: number;
}

export interface BasicTextUIConfig {
  bottomCenter?: BasicTextConfig;
  topLeft?: TopTextConfig;
  topCenter?: TopTextConfig;
  center?: CenterTextConfig;
}
