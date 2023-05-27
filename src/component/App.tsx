import React from 'react'
import { Box } from '@mui/material'
import { PanelEnum, selectPanel } from '../redux/slice/PanelSlice'
import { useAppSelector } from '../redux/hooks'
import { ClockPanel } from './ClockPanel'
import { GameSettingsPanel } from './GameSettingsPanel'

export const App: React.FC = function(): JSX.Element {
    const panel = useAppSelector(selectPanel)

    return <Box sx={{ height: '100%' }}>
        <ClockPanel isShow={panel === PanelEnum.CLOCK} />
        <GameSettingsPanel isShow={panel === PanelEnum.GAME_SETTINGS} />
    </Box>
}