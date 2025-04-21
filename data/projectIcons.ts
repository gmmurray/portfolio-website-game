const iconBank = [
  'fa-solid fa-gem',
  'fa-solid fa-cog',
  'fa-solid fa-bolt',
  'fa-solid fa-shield-alt',
  'fa-solid fa-star',
  'fa-solid fa-fire',
  'fa-solid fa-feather-alt',
  'fa-solid fa-leaf',
  'fa-solid fa-skull',
  'fa-solid fa-dragon',
  'fa-solid fa-book',
  'fa-solid fa-wrench',
  'fa-solid fa-hammer',
  'fa-solid fa-atom',
  'fa-solid fa-bug',
  'fa-solid fa-fist-raised',
  'fa-solid fa-anchor',
  'fa-solid fa-globe',
  'fa-solid fa-key',
  'fa-solid fa-magic',
  'fa-solid fa-moon',
  'fa-solid fa-sun',
  'fa-solid fa-tree',
  'fa-solid fa-rocket',
  'fa-solid fa-snowflake',
];

const colorBank = [
  '#ff6f61', // soft coral red
  '#6a89cc', // muted periwinkle blue
  '#38ada9', // soft teal
  '#e58e26', // sunset orange
  '#f6b93b', // mellow gold
  '#60a3bc', // desaturated cyan
  '#e55039', // warm vermillion
  '#78e08f', // gentle green
  '#fa983a', // orange sherbet
  '#1e3799', // deep blue
  '#78c2ad', // minty turquoise
  '#cf6a87', // dusty rose
  '#574b90', // twilight purple
  '#82ccdd', // sky blue
  '#f8c291', // peach
  '#b8e994', // pale green
  '#f97f51', // persimmon
  '#3c6382', // dark desaturated blue
  '#e77f67', // salmon clay
  '#546de5', // lavender blue
  '#f368e0', // pastel pink
  '#63cdda', // ocean teal
  '#c44569', // faded crimson
  '#786fa6', // dusty purple
  '#ff9f43', // amber
];

export type ProjectIcon = {
  icon: string;
  color: string;
};

// shuffle using Fisher-Yates
function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateProjectIcons(): ProjectIcon[] {
  const shuffledIcons = shuffle(iconBank);
  const shuffledColors = shuffle(colorBank);
  const length = Math.min(shuffledIcons.length, shuffledColors.length);

  return Array.from({ length }, (_, i) => ({
    icon: shuffledIcons[i],
    color: shuffledColors[i],
  }));
}
