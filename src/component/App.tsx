import React from 'react'
import { Box } from '@mui/material'
import { PanelEnum, selectPanel } from '../redux/slice/PanelSlice'
import { useAppSelector } from '../redux/hooks'
import { ClockPage } from './ClockPage'
import { GameSettingsPage } from './GameSettingsPage'
import { GameSelectPage } from './GameSelectPage'

export const App = function(): JSX.Element {
    const panel = useAppSelector(selectPanel)
    const style = { height: '100vh' }

    return <Box sx={style}>
        <ClockPage isDisplay={panel === PanelEnum.CLOCK} />
        <GameSettingsPage isDisplay={panel === PanelEnum.GAME_SETTINGS} />
        <GameSelectPage isDisplay={panel === PanelEnum.GAME_SELECT} />
    </Box>
}