import { Box, BoxProps, Button, Theme } from '@mui/material'
import { StandardGameHolder, StandardGameType } from '@typinghare/board-game-clock-core'
import { gameStart } from '../redux/slice/GameSlice'
import { useDispatch } from 'react-redux'
import { changePanel, PanelEnum } from '../redux/slice/PanelSlice'
import { TimeControlSelect } from './TimeControlSelect'
import { standardGameContainer } from './GameSettingsPage'
import { useGameHolder } from '../state/GameHolder'

export interface GameSettingsHeaderProps extends BoxProps {
    gameHolder: StandardGameHolder
    onTimeControlChange: (newTimeControlName: string) => void
}

export const GameSettingsHeader = function(props: GameSettingsHeaderProps): JSX.Element {
    const { gameHolder, onTimeControlChange, ...otherProps } = props
    const dispatch = useDispatch()
    const gameType = gameHolder.gameType as StandardGameType
    const timeControlArray = standardGameContainer.getTimeControls(gameType)
    const game = gameHolder.game
    const [, setGameHolder] = useGameHolder()

    function handleTimeControlSelect(newTimeControlName: string): void {
        onTimeControlChange(newTimeControlName)
    }

    function handleGameStart(): void {
        // Pass game holder to the clock panel.
        setGameHolder(gameHolder)

        // Start the game.
        game.start()

        // The clock panel will retrieve the game from the GameHolder.
        dispatch(gameStart(null))
        dispatch(changePanel(PanelEnum.CLOCK))
    }

    const styles = {
        root: {
            display: 'flex',
            marginBottom: '1em',
            alignItems: 'center',
            gap: '1em',
        },
        timeControlSelect: {
            display: 'inline-block',
            flex: 10,
        },
        gameStartButton: (theme: Theme) => ({
            display: 'inline-block',
            [theme.breakpoints.down('md')]: {
                flex: 5,
            },
            [theme.breakpoints.up('md')]: {
                flex: 3,
            },
        }),
    }

    return <Box sx={styles.root} {...otherProps}>
        <TimeControlSelect
            sx={styles.timeControlSelect}
            initValue={timeControlArray[0]}
            timeControlOptions={timeControlArray}
            onTimeControlSelect={handleTimeControlSelect}
        />
        <Button
            variant='contained'
            sx={styles.gameStartButton}
            onClick={handleGameStart}
        >{'Game Start'}</Button>
    </Box>
}