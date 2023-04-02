const names = [
  'Ego',
  'Jagged',
  'Work',
  'Elegance',
  'Enthuse',
  'Wit',
  'Imagine',
  'Ability',
  'Omen',
  'Reason',
  'Move',
  'Wish',
];

const getRandomIndex = () => Math.floor(Math.random() * names.length);

export const generateJavascriptFrameworks = () => {
  const result: string[] = [];

  const addToResult = () => {
    if (result.length === 6) return;

    let value = `${names[getRandomIndex()]}JS`;

    if (!result.includes(value)) result.push(value);

    addToResult();
  };

  addToResult();

  return result;
};
