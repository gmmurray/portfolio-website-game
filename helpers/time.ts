export const convertSecondsToTimeString = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);
