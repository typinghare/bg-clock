import { Box, BoxProps, Button } from '@mui/material'
import { AnyGame } from '@typinghare/board-game-clock-core'
import { gameStart, GameType } from '../redux/slice/GameSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { GameHolder } from '../game/GameManager'
import { changePanel, PanelEnum } from '../redux/slice/PanelSlice'
import { TimeControlSelect } from './TimeControlSelect'
import { GameTimeControls } from '../common/games'

export type GameSettingsHeaderProps = BoxProps & {
    game: AnyGame,
    gametype: GameType,
    onTimeControlChange: (newTimeControlName: string) => void
}

export const GameSettingsHeader: React.FC<GameSettingsHeaderProps> = function(props): JSX.Element {
    const { game, gametype, onTimeControlChange, ...otherProps } = props
    const dispatch = useDispatch()

    const timeControlArray = GameTimeControls[gametype]

    function handleTimeControlSelect(newTimeControlName: string): void {
        onTimeControlChange(newTimeControlName)
    }

    function handleGameStart(): void {
        // Start this game and hold it by GameHolder.
        game.start()
        GameHolder.setGame(game)

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