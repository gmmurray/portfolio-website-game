export interface AnimationDefinition {
  key: string;
  frames: number[];
  frameRate?: number;
  repeat?: number;
}

export interface AnimationDefinitionMap {
  [spriteKey: string]: { [key: string]: AnimationDefinition };
}
