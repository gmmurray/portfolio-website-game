import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { OverlayContentKey } from '../types/overlayContent';
import { StateSelector } from '../types/redux';
import { UnlockedFeatures } from '../types/savedData';

type OverlayState = {
  open: boolean;
  contentKey: OverlayContentKey | null;
  pausedScene: string | null;
  unlockedFeatures: UnlockedFeatures;
};

const initialState: OverlayState = {
  open: false,
  contentKey: null,
  pausedScene: null,
  unlockedFeatures: {
    inventory: false,
    questLog: false,
    talentTree: false,
  },
};

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    overlayOpened: (
      state,
      {
        payload: { contentKey, pausedScene },
      }: PayloadAction<{ contentKey: OverlayContentKey; pausedScene: string }>,
    ) => ({
      ...state,
      contentKey,
      open: true,
      pausedScene,
    }),
    overlayClosed: state => ({
      ...state,
      open: initialState.open,
      contentKey: initialState.contentKey,
      pausedScene: initialState.pausedScene,
    }),
    updateUnlockedFeatures: (
      state,
      action: PayloadAction<UnlockedFeatures>,
    ) => ({
      ...state,
      unlockedFeatures: action.payload,
    }),
  },
});

const { actions, reducer } = overlaySlice;

export const overlayActions = actions;
export const overlayReducer = reducer;

const selectOverlayState: StateSelector<OverlayState> = state => state.overlay;

const selectOverlayOpen: StateSelector<OverlayState['open']> = state =>
  selectOverlayState(state).open;

const selectOverlayContentKey: StateSelector<
  OverlayState['contentKey']
> = state => selectOverlayState(state).contentKey;

const selectPausedScene: StateSelector<OverlayState['pausedScene']> = state =>
  selectOverlayState(state).pausedScene;

const selectUnlockedFeatures: StateSelector<
  OverlayState['unlockedFeatures']
> = state => selectOverlayState(state).unlockedFeatures;

export const overlaySelectors = {
  selectOverlayState,
  selectOverlayOpen,
  selectOverlayContentKey,
  selectPausedScene,
  selectUnlockedFeatures,
};
