import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import agentSlice from './slice/AgentSlice';

export const store = configureStore({
  reducer: {
    agentSlice: agentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
