import { StandardGameHolder, StandardGameType } from '@typinghare/board-game-clock-core'
import { useDispatch } from 'react-redux'
import { standardGameContainer } from './GameSettingsPage'
import { useGameHolder } from '../hook/GameHolder'
import { PageEnum, switchPage } from '../redux/slice/PageSlice'
import { gameStart, setTimeControlType } from '../redux/slice/GameSlice'
import { useEffect, useState } from 'react'
import {
    Box,
    BoxProps,
    Button,
    FormControl,
    FormControlProps,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Theme,
} from '@mui/material'

export interface GameSettingsHeaderProps extends BoxProps {
    gameHolder: StandardGameHolder
}

export function GameSettingsHeader(props: GameSettingsHeaderProps): JSX.Element {
    const { gameHolder, ...otherProps } = props
    const dispatch = useDispatch()
    const { gameType, timeControlType, game } = gameHolder
    const timeControlArray = standardGameContainer.getTimeControls(gameType as StandardGameType)
    const [, setGameHolder] = useGameHolder()

    function handleTimeControlSelect(newTimeControlName: string): void {
        dispatch(setTimeControlType(newTimeControlName))
    }

    function handleGameStart(): void {
        // Pass on game holder to the clock page.
        setGameHolder(gameHolder)

        // Start the game.
        game.start()

        // The clock panel will retrieve the game from the GameHolder.
        dispatch(gameStart(null))
        dispatch(switchPage(PageEnum.CLOCK))
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
            initValue={timeControlType}
            timeControlOptions={timeControlArray}
            onTimeControlSelect={handleTimeControlSelect}
        />
        <Button
            variant='contained'
            sx={styles.gameStartButton}
            onClick={handleGameStart}
            children='Game Start'
        />
    </Box>
}

export interface TimeControlSelectProps extends FormControlProps {
    initValue: string,
    timeControlOptions: string[],
    onTimeControlSelect: (timeControl: string) => void
}

export const TIME_CONTROL_LABEL = 'Time Control'

export function TimeControlSelect(props: TimeControlSelectProps): JSX.Element {
    const { initValue, timeControlOptions, onTimeControlSelect, ...otherProps } = props
    const [value, setValue] = useState(initValue)

    useEffect(() => {
        setValue(initValue)
    }, [initValue])

    function handleChange(event: SelectChangeEvent) {
        const newValue = event.target.value as string
        setValue(newValue)
        onTimeControlSelect(newValue)
    }

    const menuItemArray: JSX.Element[] = timeControlOptions.map(timeControlOption => (
        <MenuItem
            key={timeControlOption}
            value={timeControlOption}
        >
            {timeControlOption}
        </MenuItem>
    ))

    return <FormControl size='small' {...otherProps}>
        <InputLabel>{TIME_CONTROL_LABEL}</InputLabel>
        <Select
            sx={{ width: '100%' }}
            labelId={TIME_CONTROL_LABEL}
            value={value}
            label='Time Control'
            onChange={handleChange}
            children={menuItemArray}
        />
    </FormControl>
}