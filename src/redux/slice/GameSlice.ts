import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { StandardGameType } from '@typinghare/board-game-clock-core'

export interface GameState {
    gameType: StandardGameType
    timeControlType: string
    gameStarted: boolean
}

export const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
    name: 'game',
    initialState: {
        gameType: 'Go',
        timeControlType: 'Byoyomi',
        gameStarted: false,
    },
    reducers: {
        changeGameType: (state: GameState, gameTypeAction: PayloadAction<StandardGameType>): void => {
            state.gameType = gameTypeAction.payload
        },
        gameStart: (state: GameState): void => {
            state.gameStarted = true
        },
        gameStop: (state: GameState): void => {
            state.gameStarted = false
        },
        setTimeControlType: (state: GameState, timeControlTypeAction: PayloadAction<string>): void => {
            state.timeControlType = timeControlTypeAction.payload
        },
    },
})

export const { changeGameType, gameStart, gameStop, setTimeControlType } = gameSlice.actions

export const selectGameType = (state: RootState) => state.gameSlice.gameType
export const selectTimeControlType = (state: RootState) => state.gameSlice.timeControlType
export const selectGameStarted = (state: RootState) => state.gameSlice.gameStarted

export default gameSlice.reducer