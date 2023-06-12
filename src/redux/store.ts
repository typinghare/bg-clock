import { configureStore } from '@reduxjs/toolkit'
import pageSlice from './slice/PageSlice'
import gameSlice from './slice/GameSlice'

export const store = configureStore({
    reducer: {
        pageSlice,
        gameSlice,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;