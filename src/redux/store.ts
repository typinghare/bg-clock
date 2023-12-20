import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import pageSlice from './page/PageSlice'

/**
 * Developers register all slices here.
 */
export const store = configureStore({
    reducer: {
        pageSlice,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
