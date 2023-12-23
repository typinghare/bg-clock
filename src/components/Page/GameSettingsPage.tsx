import { Page, PageEnum } from './Page'
import { Alert, AlertIcon, Box, Button, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { useBoardGame } from '../../state/useBoardGame'
import { changePage, selectSignal, useAppDispatch, useAppSelector } from '../../redux'
import { Navigation } from '../Navigation'
import { BoardGame, Player } from '../../game'
import { TimeControlSelect } from './TimeControlSelect'
import { SettingContainer } from '../SettingContainer'

/**
 * Game settings page.
 */
export function GameSettingsPage() {
    useAppSelector(selectSignal)
    const [boardGame] = useBoardGame()
    const [playerList, setPlayerList] = useState<Player[]>([])

    if (!boardGame) {
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

    if (boardGame.getAdvancedSettings().getValue('sync')) {
        // Synchronize players values
        const firstPlayer = playerList[0]
        if (firstPlayer) {
            // All other players align with the first player
            const keys = Object.keys(firstPlayer.getData())
            for (let i = 0; i < playerList.length; ++i) {
                const player = playerList[i]
                for (const key of keys) {
                    player.getDatum(key).setValue(firstPlayer.getValue(key))
                }
            }
        }
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

    function PlayerSettings() {
        if (!boardGame || !boardGame.getAdvancedSettings().getValue('sync')) {
            return playerList.map((player, index) => (
                <Box key={index} mt={3}>
                    <SettingContainer
                        title={`Player Settings - ${player.getRole()}`}
                        dataCollection={player}
                    />
                </Box>
            ))
        }

        const firstPlayer = playerList[0]
        if (!firstPlayer) {
            return <></>
        }

        return (
            <Box mt={3}>
                <SettingContainer
                    title="Player Settings"
                    dataCollection={firstPlayer}
                />
            </Box>
        )
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

                <PlayerSettings />

                <Box mt={3}>
                    <SettingContainer
                        title="Advanced Settings"
                        dataCollection={boardGame.getAdvancedSettings()}
                    />
                </Box>

                <StartButton boardGame={boardGame} />
            </Container>
        </Page>
    )
}

/**
 * Start button
 */
export function StartButton(props: StartButtonProps) {
    const { boardGame } = props
    const dispatch = useAppDispatch()

    function handleGameStart(): void {
        // Start the game
        if (boardGame) {
            console.log(boardGame)
            boardGame.getReady()
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

/**
 * Start button properties.
 */
export interface StartButtonProps {
    boardGame: BoardGame
}