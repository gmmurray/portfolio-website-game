import { LOCAL_STORAGE_KEY } from '../constants/gameConstants';
import { UnlockedFeatures } from '../types/savedData';

export const loadAllSavedData = (): Record<string, any> | null => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!item) return null;

  return JSON.parse(item);
};

export function loadLevelSavedData<T>(sceneKey: string): T | null {
  const save = loadAllSavedData();
  return save && save[sceneKey] ? (save[sceneKey] as T) : null;
}

export function saveLevelData<T>(data: T, sceneKey: string) {
  const current = loadAllSavedData() ?? {};
  const value = {
    ...current,
    [sceneKey]: {
      ...current[sceneKey],
      ...data,
    },
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
}

export const updateUnlockedFeatures = (unlockedFeatures: UnlockedFeatures) => {
  const current = loadAllSavedData() ?? {};

  const newValue = {
    ...current,
    unlockedFeatures: {
      ...current.unlockedFeatures,
      ...unlockedFeatures,
    },
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
};

export const loadUnlockedFeatures = () =>
  (loadAllSavedData() ?? {}).unlockedFeatures;
