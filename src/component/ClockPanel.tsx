import React from 'react'
import { Panel, PanelProps } from './Panel'
import { Box } from '@mui/material'
import { ClockDisplay } from './ClockDisplay'
import { AnyGame } from '@typinghare/board-game-clock-core'
import { GameHolder } from '../game/GameManager'
import { useAppSelector } from '../redux/hooks'
import { selectGameStarted } from '../redux/slice/GameSlice'

export type ClockPanelProps = PanelProps & {}

export const ClockPanel: React.FC<ClockPanelProps> = function(props): JSX.Element {
    const { isShow } = props
    const gameStarted: boolean = useAppSelector(selectGameStarted)

    if (!gameStarted) {
        return <Panel isShow={isShow} />
    }

    // Retrieve the game from the game holder.
    const game: AnyGame = GameHolder.getGame()

    const sectionStyle: React.CSSProperties = {
        flex: 12,
    }

    const ribbonStyle: React.CSSProperties = {
        flex: 1,
        backgroundColor: '#333333',
    }

    return <Panel isShow={isShow}>
        <Box sx={sectionStyle}><ClockDisplay game={game} role={'A'} overturn /></Box>
        <Box sx={ribbonStyle} />
        <Box sx={sectionStyle}><ClockDisplay game={game} role={'B'} /></Box>
    </Panel>
}

