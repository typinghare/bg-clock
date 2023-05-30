import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type GameType = 'GoGame' | 'ChessGame'

export type GameState = {
    gameType: GameType
    gameStarted: boolean
}

export const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
    name: 'game',
    initialState: {
        gameType: 'GoGame',
        gameStarted: false,
    },
    reducers: {
        changeGameType: (state: GameState, panel: PayloadAction<GameType>): void => {
            state.gameType = panel.payload
        },
        gameStart: (state: GameState): void => {
            state.gameStarted = true
        },
        gameStop: (state: GameState): void => {
            state.gameStarted = false
        },
    },
})

export const { changeGameType, gameStart, gameStop } = gameSlice.actions

export const selectGameType = (state: RootState) => state.gameSlice.gameType
export const selectGameStarted = (state: RootState) => state.gameSlice.gameStarted

export default gameSlice.reducer