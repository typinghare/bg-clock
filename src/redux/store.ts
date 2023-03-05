import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './slice/GameSlice';
import panelSlice from './slice/PanelSlice';

export const store = configureStore({
  reducer: {
    gameSlice: gameSlice,
    panelSlice: panelSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;