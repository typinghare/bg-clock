import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type RepeaterState = {
    signal: boolean
}

export const repeaterSlice = createSlice({
    name: 'repeater',
    initialState: {
        signal: false,
    },
    reducers: {
        pulse(state: RepeaterState) {
            state.signal = !state.signal
        },
    },
})

export const { pulse } = repeaterSlice.actions

export const selectSignal = (state: RootState) => state.repeaterSlice.signal

export default repeaterSlice.reducer