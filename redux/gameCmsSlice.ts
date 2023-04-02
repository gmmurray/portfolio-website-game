import { GameCmsContent, InventoryProject } from '../types/cmsContent';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StateSelector } from '../types/redux';
import cloneDeep from 'lodash.clonedeep';

type GameCmsState = {
  data: GameCmsContent | null;
  selectedTalentTree: number;
  selectedQuestTab: 0 | 1 | 2;
  selectedQuest: number;
  selectedProject: InventoryProject | null;
};

const initialState: GameCmsState = {
  data: null,
  selectedTalentTree: 0,
  selectedQuestTab: 0,
  selectedQuest: 0,
  selectedProject: null,
};

export const gameCmsSlice = createSlice({
  name: 'gameCms',
  initialState,
  reducers: {
    dataLoaded: (
      state: GameCmsState,
      action: PayloadAction<GameCmsContent>,
    ) => ({
      ...state,
      data: cloneDeep({ ...action.payload }),
    }),
    selectedTalentTreeChanged: (
      state: GameCmsState,
      action: PayloadAction<number>,
    ) => ({
      ...state,
      selectedTalentTree: action.payload,
    }),
    selectedQuestTabChanged: (
      state: GameCmsState,
      action: PayloadAction<0 | 1 | 2>,
    ) => ({
      ...state,
      selectedQuestTab: action.payload,
    }),
    selectedQuestChanged: (
      state: GameCmsState,
      action: PayloadAction<number>,
    ) => ({
      ...state,
      selectedQuest: action.payload,
    }),
    selectedProjectChanged: (
      state: GameCmsState,
      action: PayloadAction<InventoryProject | null>,
    ) => ({
      ...state,
      selectedProject:
        state.selectedProject &&
        action.payload &&
        action.payload.title === state.selectedProject.title
          ? null
          : action.payload,
    }),
    reset: (state: GameCmsState) => ({ ...initialState, data: state.data }),
  },
});

const { actions, reducer } = gameCmsSlice;

const selectGameCmsState: StateSelector<GameCmsState> = state => state.gameCms;

const selectGameCmsData: StateSelector<GameCmsState['data']> = state =>
  selectGameCmsState(state).data;

const selectGameCmsAboutContent: StateSelector<
  Exclude<GameCmsState['data'], null>['aboutContent']
> = state => selectGameCmsData(state)!.aboutContent;

const selectSelectedTalentTree: StateSelector<
  GameCmsState['selectedTalentTree']
> = state => selectGameCmsState(state).selectedTalentTree;

const selectGameCmsExperiencesContent: StateSelector<
  Exclude<GameCmsState['data'], null>['experiencesContent']
> = state => selectGameCmsState(state).data!.experiencesContent;

const selectGameCmsFeaturedContent: StateSelector<
  Exclude<GameCmsState['data'], null>['featuredContent']
> = state => selectGameCmsState(state).data!.featuredContent;

const selectGameCmsOtherContent: StateSelector<
  Exclude<GameCmsState['data'], null>['otherContent']
> = state => selectGameCmsState(state).data!.otherContent;

const selectGameCmsSelectedQuestTab: StateSelector<
  GameCmsState['selectedQuestTab']
> = state => selectGameCmsState(state).selectedQuestTab;

const selectGameCmsSelectedQuest: StateSelector<
  GameCmsState['selectedQuest']
> = state => selectGameCmsState(state).selectedQuest;

const selectGameCmsSelectedProject: StateSelector<
  GameCmsState['selectedProject']
> = state => selectGameCmsState(state).selectedProject;

export const gameCmsActions = actions;
export const gameCmsReducer = reducer;
export const gameCmsSelectors = {
  selectGameCmsData,
  selectGameCmsAboutContent,
  selectSelectedTalentTree,
  selectGameCmsExperiencesContent,
  selectGameCmsSelectedQuestTab,
  selectGameCmsSelectedQuest,
  selectGameCmsFeaturedContent,
  selectGameCmsOtherContent,
  selectGameCmsSelectedProject,
};
