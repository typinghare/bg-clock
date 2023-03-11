import { configureStore } from '@reduxjs/toolkit';
import panelSlice from './slice/PanelSlice';

export const store = configureStore({
    reducer: {
        panelSlice: panelSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;