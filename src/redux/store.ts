import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import agentSlice from './slice/AgentSlice';
import panelSlice from './slice/PanelSlice';

export const store = configureStore({
  reducer: {
    agentSlice: agentSlice,
    panelSlice: panelSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
