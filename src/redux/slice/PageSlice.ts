import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum PageEnum {
    PORTAL = 0,
    GAME_SELECT = 1,
    GAME_SETTINGS = 2,
    CLOCK = 3,
    APP_SETTINGS = 4
}

export type PageState = {
    page: PageEnum
}

export const pageSlice = createSlice<PageState, SliceCaseReducers<PageState>>({
    name: 'page',
    initialState: {
        page: PageEnum.PORTAL,
    },
    reducers: {
        switchPage: (state: PageState, { payload: page }: PayloadAction<PageEnum>): void => {
            state.page = page
        },
    },
})

export const { switchPage } = pageSlice.actions

export const selectPage = (state: RootState) => state.pageSlice.page

export default pageSlice.reducer