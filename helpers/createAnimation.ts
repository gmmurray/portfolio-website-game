import { AnimationDefinition } from '../types/animations';
import { Scene } from 'phaser';

export const createAnimation = (
  scene: Scene,
  definition: AnimationDefinition,
  spriteKey: string,
) => {
  if (!scene) return;

  const { key, frames, frameRate, repeat } = definition;
  scene.anims.create({
    key,
    frames: scene.anims.generateFrameNumbers(spriteKey, {
      frames,
    }),
    frameRate,
    repeat,
  });
};
