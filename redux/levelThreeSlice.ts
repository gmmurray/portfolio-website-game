import { LevelThreeDifficulty, LevelThreeFireType } from '../types/levelThree';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Coordinates } from '../types/position';
import { StateSelector } from '../types/redux';

export type LevelThreeState = {
  orbs: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  health: number;
  difficulty: LevelThreeDifficulty;
  activeFires: {
    [LevelThreeFireType.COLUMN]: boolean;
    [LevelThreeFireType.EXPLOSION]: boolean;
  };
  standingInFire?: Coordinates;
  playerIsDead: boolean;
  lastDamageTimestamp?: string;
  enemies: string[];
};

const initialState: LevelThreeState = {
  orbs: {
    1: false,
    2: false,
    3: false,
  },
  health: 100,
  difficulty: LevelThreeDifficulty.EASY,
  activeFires: {
    [LevelThreeFireType.COLUMN]: false,
    [LevelThreeFireType.EXPLOSION]: false,
  },
  standingInFire: undefined,
  playerIsDead: false,
  lastDamageTimestamp: undefined,
  enemies: [],
};

export const levelThreeSlice = createSlice({
  name: 'levelThree',
  initialState,
  reducers: {
    healthChanged: (state, action: PayloadAction<number>) => ({
      ...state,
      health: changeHealth(state.health, action.payload),
      lastDamageTimestamp:
        action.payload < 0 ? new Date().toString() : state.lastDamageTimestamp,
    }),
    orbCollected: (state, action: PayloadAction<1 | 2 | 3>) => ({
      ...state,
      orbs: {
        ...state.orbs,
        [action.payload]: true,
      },
    }),
    activeFiresChanged: (
      state,
      action: PayloadAction<{ active: boolean; type: LevelThreeFireType }>,
    ) => ({
      ...state,
      activeFires: {
        ...state.activeFires,
        [action.payload.type]: action.payload.active,
      },
    }),
    standingInFireChanged: (
      state,
      action: PayloadAction<Coordinates | undefined>,
    ) => ({
      ...state,
      standingInFire: action.payload
        ? {
            ...state.standingInFire,
            ...action.payload,
          }
        : undefined,
    }),
    levelRestarted: state => ({
      ...initialState,
      difficulty: state.difficulty,
    }),
    enemiesChanged: (state, action: PayloadAction<string[]>) => ({
      ...state,
      enemies: action.payload,
    }),
    difficultyChanged: (_, action: PayloadAction<LevelThreeDifficulty>) => ({
      ...initialState,
      difficulty: action.payload,
    }),
  },
});

const { actions, reducer } = levelThreeSlice;

const selectLevelThreeState: StateSelector<LevelThreeState> = state =>
  state.levelThree;
const selectLevelThreeHealth: StateSelector<
  LevelThreeState['health']
> = state => selectLevelThreeState(state).health;
const selectLevelThreeDifficultySettings: StateSelector<
  LevelThreeState['difficulty']
> = state => selectLevelThreeState(state).difficulty;
const selectLevelThreeOrbs: StateSelector<LevelThreeState['orbs']> = state =>
  selectLevelThreeState(state).orbs;
const selectLevelThreeStandingInFire: StateSelector<
  LevelThreeState['standingInFire']
> = state => selectLevelThreeState(state).standingInFire;
const selectLevelThreeActiveFires: StateSelector<
  LevelThreeState['activeFires']
> = state => selectLevelThreeState(state).activeFires;
const selectLevelThreePlayerIsDead: StateSelector<
  LevelThreeState['playerIsDead']
> = state => selectLevelThreeState(state).playerIsDead;
const selectLevelThreeLastDamageTimestamp: StateSelector<
  LevelThreeState['lastDamageTimestamp']
> = state => selectLevelThreeState(state).lastDamageTimestamp;
const selectLevelThreeEnemies: StateSelector<
  LevelThreeState['enemies']
> = state => selectLevelThreeState(state).enemies;

export const levelThreeActions = actions;
export const levelThreeReducer = reducer;
export const levelThreeSelectors = {
  selectLevelThreeHealth,
  selectLevelThreeDifficultySettings,
  selectLevelThreeOrbs,
  selectLevelThreeStandingInFire,
  selectLevelThreeActiveFires,
  selectLevelThreePlayerIsDead,
  selectLevelThreeLastDamageTimestamp,
  selectLevelThreeEnemies,
};

const changeHealth = (currHealth: number, changeValue: number) => {
  const newValue = currHealth + changeValue;
  if (newValue >= 100) {
    return 100;
  } else if (newValue <= 0) {
    return 0;
  } else {
    return newValue;
  }
};
