import { Page, PageEnum } from './Page'
import { Alert, AlertIcon, Button, Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useBoardGame } from '../../state/useBoardGame'
import { changePage, selectSignal, useAppDispatch, useAppSelector } from '../../redux'
import { StyleMap } from '../../common/style'
import { Navigation } from '../Navigation'

/**
 * Game settings page.
 */
export function GameSettingsPage() {
    useAppSelector(selectSignal)
    const [boardGame] = useBoardGame()
    const dispatch = useAppDispatch()

    if (boardGame === undefined) {
        return (
            <Page page={PageEnum.GAME_SETTINGS}>
                <Navigation title="Game Settings" previousPage={PageEnum.GAME_SELECTION} />
                <Alert margin={2} status="error">
                    <AlertIcon />
                    Fatal Error: Fail to initialize a board game.
                </Alert>
            </Page>
        )
    }

    const timeControlList = boardGame.getTimeControlList()
    const styles: StyleMap = {
        timeControlSelect: {
            display: 'inline-block',
            flex: 10,
        },
    }

    function handleGameStart(): void {
        // Start the game
        if (boardGame) {
            boardGame.start()
        }

        // The clock panel will retrieve the game from the GameHolder.
        dispatch(changePage(PageEnum.CLOCK))
    }

    function handleTimeControlSelect(timeControlIndex: number): void {
        const timeControl = timeControlList[timeControlIndex]
        if (boardGame) {
            boardGame.selectTimeControl(timeControl)
        }
    }

    return (
        <Page page={PageEnum.GAME_SETTINGS}>
            <Navigation title="Game Settings" previousPage={PageEnum.GAME_SELECTION} />

            <TimeControlSelect
                timeControlNameList={timeControlList.map(timeControl => timeControl.getName())}
                onTimeControlSelect={handleTimeControlSelect}
            />

            <Button
                variant="solid"
                sx={styles.gameStartButton}
                onClick={handleGameStart}
            >
                Game Start
            </Button>
        </Page>
    )
}

/**
 * Time control select.
 */
export function TimeControlSelect(props: TimeControlSelectProps) {
    const { timeControlNameList, onTimeControlSelect } = props

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        onTimeControlSelect(parseInt(event.target.value))
    }

    return (
        <Select placeholder="Select Time Control" onChange={handleSelectChange}>
            {timeControlNameList.map((timeControlName, index) => (
                <option key={index} value={index}>{timeControlName}</option>
            ))}
        </Select>
    )
}

export interface TimeControlSelectProps {
    timeControlNameList: string[],
    onTimeControlSelect: (timeControlIndex: number) => void
}