import { UnlockedFeatures } from './savedData';

export enum OverlayContentKey {
  SKILLS,
  UF,
  UNF,
  BIO,
  EXPERIENCES,
  PROJECTS,
}

export interface OverlayContent {
  lead: string;
  component?: JSX.Element;
  unlockedKey?: keyof UnlockedFeatures;
}

export interface OverlayContentMap {
  [key: number]: OverlayContent;
}
