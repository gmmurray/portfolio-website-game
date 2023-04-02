export const getTileSource = (filename: string) =>
  `../../../assets/game/tiles/${filename}`;
export const getTileMapSource = (filename: string) =>
  getTileSource(`${filename}.json`);
export const getTileSetSource = (filename: string) =>
  getTileSource(`${filename}.png`);

export const getSpriteSource = (filename: string) =>
  `../../../assets/game/sprites/${filename}.png`;

export const getImageSource = (filename: string) =>
  `../../../assets/game/images/${filename}.png`;
