import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum PanelEnum {
    PORTAL_PANEL,
    CLOCK_PANEL,

    // option panels
    GO_OPTION_PANEL,
}

export type PanelState = {
    panel: PanelEnum
}

export const panelSlice = createSlice<PanelState, SliceCaseReducers<PanelState>>({
    name: 'panel',
    initialState: {
        panel: PanelEnum.GO_OPTION_PANEL,
    },
    reducers: {
        changePanel: (state: PanelState, panel: PayloadAction<PanelEnum>) => {
            state.panel = panel.payload;
        },
    },
});

export const { changePanel } = panelSlice.actions;

export const selectPanel = (state: RootState) => state.panelSlice.panel;

export default panelSlice.reducer;