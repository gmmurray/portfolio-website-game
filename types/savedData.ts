export interface LevelTwoSavedData {
  time?: number;
}

export interface UnlockedFeatures {
  talentTree: boolean;
  questLog: boolean;
  inventory: boolean;
}

export interface UnlockedFeatureCallbacks {
  inventory: () => any;
  quests: () => any;
  talents: () => any;
}
