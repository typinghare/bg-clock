import { Box, BoxProps, Button, useTheme } from '@mui/material'
import { StandardGameHolder, StandardGameType } from '@typinghare/board-game-clock-core'
import { gameStart } from '../redux/slice/GameSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changePanel, PanelEnum } from '../redux/slice/PanelSlice'
import { TimeControlSelect } from './TimeControlSelect'
import { globalGameHolder, standardGameContainer } from '../common/games'

export type GameSettingsHeaderProps = BoxProps & {
    gameHolder: StandardGameHolder
    onTimeControlChange: (newTimeControlName: string) => void
}

export const GameSettingsHeader: React.FC<GameSettingsHeaderProps> = function(props): JSX.Element {
    const { gameHolder, onTimeControlChange, ...otherProps } = props
    const dispatch = useDispatch()
    const gameType = gameHolder.gameType as StandardGameType
    const timeControlArray = standardGameContainer.getTimeControls(gameType)
    const game = gameHolder.game

    function handleTimeControlSelect(newTimeControlName: string): void {
        onTimeControlChange(newTimeControlName)
    }

    function handleGameStart(): void {
        // Pass game holder to the clock panel.
        globalGameHolder.content = gameHolder

        // Start the game.
        game.start()

        // The clock panel will retrieve the game from the GameHolder.
        dispatch(gameStart(null))
        dispatch(changePanel(PanelEnum.CLOCK))
    }

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        marginBottom: '1em',
        alignItems: 'center',
        gap: '1em',
    }

    const timeControlSelectStyle: React.CSSProperties = {
        display: 'inline-block',
        flex: 10,
    }

    const gameStartButtonStyle: React.CSSProperties = {
        display: 'inline-block',
        flex: 3,
    }

    // Adjust the flex value based on screen size
    const theme = useTheme()
    if (theme.breakpoints.down('sm')) {
        gameStartButtonStyle.flex = 5
    }

    return <Box sx={containerStyle} {...otherProps}>
        <TimeControlSelect
            sx={timeControlSelectStyle}
            initValue={timeControlArray[0]}
            timeControlOptions={timeControlArray}
            onTimeControlSelect={handleTimeControlSelect}
        />
        <Button
            variant='contained'
            sx={gameStartButtonStyle}
            onClick={handleGameStart}
        >{'Game Start'}</Button>
    </Box>
}