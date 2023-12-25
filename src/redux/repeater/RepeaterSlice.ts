import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type RepeaterState = {
    boardGameChangedSignal: boolean
    timeControlChangedSignal: boolean
    settingsChangedSignal: boolean
}

export const repeaterSlice = createSlice({
    name: 'repeater',
    initialState: {
        boardGameChangedSignal: false,
        timeControlChangedSignal: false,
        settingsChangedSignal: false,
    },
    reducers: {
        notifyBoardGameChanged(state: RepeaterState) {
            state.boardGameChangedSignal = !state.boardGameChangedSignal
        },
        notifyTimeControlChangedChanged(state: RepeaterState) {
            state.boardGameChangedSignal = !state.boardGameChangedSignal
        },
        notifySettingsChanged(state: RepeaterState) {
            state.settingsChangedSignal = !state.settingsChangedSignal
        },
    },
})

export const {
    notifyBoardGameChanged,
    notifyTimeControlChangedChanged,
    notifySettingsChanged,
} = repeaterSlice.actions

export const selectBoardGameChangedSignal = (state: RootState) => state.repeaterSlice.boardGameChangedSignal
export const selectTimeControlChangedSignal = (state: RootState) => state.repeaterSlice.timeControlChangedSignal
export const selectSettingsChangedSignal = (state: RootState) => state.repeaterSlice.settingsChangedSignal

export default repeaterSlice.reducer