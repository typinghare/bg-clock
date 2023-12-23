import { configureStore } from '@reduxjs/toolkit'
import pageSlice from './page/PageSlice'
import repeaterSlice from './repeater/RepeaterSlice'

/**
 * Developers register all slices here.
 */
export const store = configureStore({
    reducer: {
        pageSlice,
        repeaterSlice,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
