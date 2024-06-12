import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DEFAULT_PAGE, PageEnum } from '../../components/Page'

export type PageState = {
    page: PageEnum
}

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        page: DEFAULT_PAGE,
    },
    reducers: {
        changePage: (state: PageState, { payload: page }: PayloadAction<PageEnum>): void => {
            state.page = page
        },
    },
})

export const { changePage } = pageSlice.actions
export const selectPage = (state: RootState) => state.pageSlice.page
export default pageSlice.reducer
