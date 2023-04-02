export interface BasicTextConfig {
  margin?: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  depth?: number;
}

export interface TopTextConfig extends BasicTextConfig {
  padding?: number;
}

export interface SpriteConfig {
  spriteKey: string;
  frame: number;
}
