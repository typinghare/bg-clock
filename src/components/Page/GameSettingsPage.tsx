import { Page, PageEnum } from './Page'
import { Alert, AlertIcon, Box, Button, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { useBoardGame } from '../../state/useBoardGame'
import { changePage, selectSignal, useAppDispatch, useAppSelector } from '../../redux'
import { Navigation } from '../Navigation'
import { BoardGame, Player } from '../../game'
import { PlayerSettingContainer } from './PlayerSettingContainer'
import { TimeControlSelect } from './TimeControlSelect'

/**
 * Game settings page.
 */
export function GameSettingsPage() {
    useAppSelector(selectSignal)
    const [boardGame] = useBoardGame()
    const [playerList, setPlayerList] = useState<Player[]>([])

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

    if (!playerList.length) {
        setPlayerList(boardGame.getPlayerList())
    }

    const timeControlList = boardGame.getTimeControlList()

    function handleTimeControlSelect(timeControlIndex: number): void {
        const timeControl = timeControlList[timeControlIndex]
        if (boardGame) {
            boardGame.selectTimeControl(timeControl)
            setPlayerList(boardGame.getPlayerList())
        }
    }

    return (
        <Page page={PageEnum.GAME_SETTINGS}>
            <Navigation title="Game Settings" previousPage={PageEnum.GAME_SELECTION} />
            <Container pt={3}>
                <Box mt={3}>
                    <TimeControlSelect
                        timeControlList={timeControlList}
                        onTimeControlSelect={handleTimeControlSelect}
                    />
                </Box>

                {playerList.map((player, index) => (
                    <Box key={index} mt={3}>
                        <PlayerSettingContainer player={player} />
                    </Box>
                ))}

                <StartButton boardGame={boardGame} />
            </Container>
        </Page>
    )
}

export function StartButton(props: StartButtonProps) {
    const { boardGame } = props
    const dispatch = useAppDispatch()

    function handleGameStart(): void {
        // Start the game
        if (boardGame) {
            console.log(boardGame)
            boardGame.start()
        }

        // The clock panel will retrieve the game from the GameHolder.
        dispatch(changePage(PageEnum.CLOCK))
    }

    return (
        <Button
            variant="solid"
            mt={3}
            w={'100%'}
            onClick={handleGameStart}
        >
            Start
        </Button>
    )
}

export interface StartButtonProps {
    boardGame: BoardGame
}