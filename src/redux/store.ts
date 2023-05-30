import { configureStore } from '@reduxjs/toolkit'
import panelSlice from './slice/PanelSlice'
import gameSlice from './slice/GameSlice'

export const store = configureStore({
    reducer: {
        panelSlice: panelSlice,
        gameSlice: gameSlice,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;