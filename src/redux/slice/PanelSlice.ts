import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum PanelEnum {
    PORTAL = 0,
    GAME_SELECT = 0,
    GAME_SETTINGS = 1,
    CLOCK = 2,
}

export type PanelState = {
    panel: PanelEnum
}

export const panelSlice = createSlice<PanelState, SliceCaseReducers<PanelState>>({
    name: 'panel',
    initialState: {
        panel: PanelEnum.GAME_SETTINGS,
    },
    reducers: {
        changePanel: (state: PanelState, panel: PayloadAction<PanelEnum>): void => {
            state.panel = panel.payload;
        },
    },
});

export const { changePanel } = panelSlice.actions;

export const selectPanel = (state: RootState) => state.panelSlice.panel;

export default panelSlice.reducer;