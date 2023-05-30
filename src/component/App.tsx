import React from 'react'
import { Box } from '@mui/material'
import { PanelEnum, selectPanel } from '../redux/slice/PanelSlice'
import { useAppSelector } from '../redux/hooks'
import { ClockPanel } from './ClockPanel'
import { GameSettingsPanel } from './GameSettingsPanel'

/**
 * [Panel]
 * @see GameSettingsPanel
 * @see ClockPanel
 *
 * Panel[GameSettingsPanel]
 * @see GameSettingsSection
 * @see GameSettingsHeader
 * @see PlayerSettingsSection
 * @see AdvancedSettingsSection
 */
export const App: React.FC = function(): JSX.Element {
    const panel = useAppSelector(selectPanel)
    const style: React.CSSProperties = { height: '100vh' }

    return <Box sx={style}>
        <ClockPanel isShow={panel === PanelEnum.CLOCK} />
        <GameSettingsPanel isShow={panel === PanelEnum.GAME_SETTINGS} />
    </Box>
}