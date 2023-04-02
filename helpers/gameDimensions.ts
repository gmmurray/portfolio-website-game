export const getGameWidth = (scene: Phaser.Scene) => {
  const value = scene.sys.game.config.width;
  return typeof value === 'number' ? value : parseInt(value);
};

export const getGameHeight = (scene: Phaser.Scene) => {
  const value = scene.sys.game.config.height;
  return typeof value === 'number' ? value : parseInt(value);
};

export const getMaxSquareScreenDimension = (
  width: number,
  height: number,
  divisibleBy: number,
) => {
  if (width === height && width % divisibleBy === 0) {
    return width;
  }

  let result: number;

  const max = Math.max(width, height);

  if (max === width) {
    result = height;
  } else {
    result = width;
  }

  while (result % divisibleBy !== 0) {
    result--;
  }

  return result;
};
