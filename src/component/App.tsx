import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { PanelEnum, selectPanel } from '../redux/slice/PanelSlice';
import { ClockPanel } from './panel/ClockPanel/ClockPanel';
import { useAppSelector } from '../redux/hooks';
import { GoOptionPanel } from './panel/GoOptionPanel/GoOptionPanel';

/**
 * @layout App.
 */
export const App: FunctionComponent = () => {
    const panel = useAppSelector(selectPanel);

    return <Box sx={{ height: '100%' }}>
        <ClockPanel isShow={panel === PanelEnum.CLOCK_PANEL} />
        <GoOptionPanel isShow={panel === PanelEnum.GO_OPTION_PANEL} />
    </Box>;
};
