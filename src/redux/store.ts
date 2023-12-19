import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import pageSlice from './page/PageSlice'
import  counterSlice from '../features/counter/counterSlice'

export const store = configureStore({
    reducer: {
        counterSlice,
        pageSlice,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
