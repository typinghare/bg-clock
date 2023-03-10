import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum Panel {
    PORTAL_PANEL,
    SELECT_PANEL,
    CLOCK_PANEL,
}

export type PanelState = {
    panel: Panel
}

export const panelSlice = createSlice({
    name: 'panel',
    initialState: {
        panel: Panel.SELECT_PANEL,
    },
    reducers: {
        switchPanel: (state: PanelState, panel: PayloadAction<Panel>) => {
            state.panel = panel.payload;
        },
    },
});

export const { switchPanel } = panelSlice.actions;

export const selectPanel = (state: RootState) => state.panelSlice.panel;

export default panelSlice.reducer;