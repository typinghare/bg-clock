import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DEFAULT_PAGE, PageEnum } from '../../components/Page'

export type PageState = {
    page: PageEnum
    signal: boolean
}

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        page: DEFAULT_PAGE,
        signal: false,
    },
    reducers: {
        changePage: (state: PageState, { payload: page }: PayloadAction<PageEnum>): void => {
            state.page = page
        },
        pulse(state: PageState) {
            state.signal = !state.signal
        },
    },
})

export const { changePage, pulse } = pageSlice.actions

export const selectPage = (state: RootState) => state.pageSlice.page
export const selectSignal = (state: RootState) => state.pageSlice.signal

export default pageSlice.reducer