import { configureStore } from '@reduxjs/toolkit';
import { gameCmsReducer } from './gameCmsSlice';
import { levelThreeReducer } from './levelThreeSlice';
import { overlayReducer } from './overlaySlice';

export const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    gameCms: gameCmsReducer,
    levelThree: levelThreeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const storeDispatch = store.dispatch;
