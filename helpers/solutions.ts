export function getRandomSolution<T>(solutions: T[]): T | null {
  if (!solutions || solutions.length === 0) {
    return null;
  }

  const answerIndex = Math.floor(Math.random() * solutions.length);
  return solutions[answerIndex];
}

// credit Durstenfeld and https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
export function shuffleArray<T>(array: T[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
