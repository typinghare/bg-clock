import { Page, PageEnum } from '../Page'
import { Alert, AlertIcon, Box, Button, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
    changePage,
    notifyTimeControlChangedChanged,
    selectBoardGameChangedSignal,
    selectTimeControlChangedSignal,
    useAppDispatch,
    useAppSelector,
} from '../../redux'
import { Navigation } from '../Navigation'
import { BoardGame, NotStartedState, Player } from '../../game'
import { TimeControlSelect } from './TimeControlSelect'
import { SettingContainer } from '../SettingContainer'
import { useDispatch } from 'react-redux'
import { boardGameHolder } from '../../common/holder'
import { enableFullScreen, noSleep } from '../../common/helper'
import { TapAudioPlugin } from '../../game/audio/TapAudioPlugin'
import { CountdownAudioPlugin } from '../../game/audio/CountdownAudioPlugin'
import { settings } from '../../common/settings'

/**
 * Game settings page.
 */
export function GameSettingsPage() {
    const dispatch = useDispatch()
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>()
    const [playerList, setPlayerList] = useState<Player[]>([])
    const [selectedTimeControlIndex, setSelectedTimeControlIndex] = useState<number>(0)

    useEffect(() => {
        const currentBoardGame = boardGameHolder.get()
        setBoardGame(currentBoardGame)
        setPlayerList(currentBoardGame ? currentBoardGame.getPlayerList() : [])

        if (currentBoardGame) {
            const currentSelectedTimeControlIndex: number = (() => {
                const timeControlList = currentBoardGame.getTimeControlList()
                const timeControl = currentBoardGame.getTimeControl()

                return timeControlList.indexOf(timeControl)
            })()
            setSelectedTimeControlIndex(currentSelectedTimeControlIndex)
        }
    }, [boardGameChangedSignal, timeControlChangedSignal])

    function syncPlayerSettings(): void {
        if (!boardGame || !boardGame.getAdvancedSettings().getValue('sync')) {
            return
        }

        // Synchronize players values
        const firstPlayer = playerList[0]
        if (firstPlayer) {
            // All other players align with the first player
            const keys = Object.keys(firstPlayer.getData())
            for (let i = 1; i < playerList.length; ++i) {
                const player = playerList[i]
                for (const key of keys) {
                    player.get(key).setValue(firstPlayer.getValue(key))
                }
            }
        }
    }

    if (!boardGame) {
        return (
            <Page page={PageEnum.GAME_SETTINGS}>
                <Navigation title="Game Settings" previousPage={PageEnum.GAME_SELECTION} />
                <Container paddingTop={5}>
                    <Alert status="error">
                        <AlertIcon />
                        <Box as={'span'} marginLeft={2}>
                            Fatal Error: Fail to initialize a board game.
                        </Box>
                    </Alert>
                </Container>
            </Page>
        )
    }

    const timeControlList = boardGame.getTimeControlList()

    function handleTimeControlSelect(timeControlIndex: number): void {
        if (boardGame) {
            boardGame.selectTimeControl(timeControlList[timeControlIndex])
        }

        setSelectedTimeControlIndex(timeControlIndex)
        dispatch(notifyTimeControlChangedChanged())
    }

    function PlayerSettings() {
        if (!boardGame || !boardGame.getAdvancedSettings().getValue('sync')) {
            return playerList.map((player, index) => (
                <Box key={index} mt={3}>
                    <SettingContainer
                        title={`Player Settings - ${player.getRole()}`}
                        dataCollection={player}
                        defaultExpanded={true}
                        onSettingChange={syncPlayerSettings}
                    />
                </Box>
            ))
        }

        const firstPlayer = playerList[0]
        if (!firstPlayer) {
            console.error('No players found in the board game.')
            return (<></>)
        }

        return (
            <Box marginBottom="1em">
                <SettingContainer
                    title="Player Settings"
                    dataCollection={firstPlayer}
                    defaultExpanded={true}
                    onSettingChange={syncPlayerSettings}
                />
            </Box>
        )
    }

    function startBoardGameCallback(): void {
        if (settings.getValue('screenAlwaysOn')) {
            document.addEventListener('click',
                function enableNoSleep() {
                    document.removeEventListener('click', enableNoSleep)
                    noSleep.enable()
                },
            )
        }
    }

    return (
        <Page page={PageEnum.GAME_SETTINGS}>
            <Navigation title="Game Settings" previousPage={PageEnum.GAME_SELECTION} />
            <Container paddingTop="1em">
                <Box marginBottom="1em">
                    <TimeControlSelect
                        timeControlList={timeControlList}
                        selectedTimeControlIndex={selectedTimeControlIndex}
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

                <StartButton boardGame={boardGame} callback={startBoardGameCallback} />
            </Container>
        </Page>
    )
}

/**
 * Start button.
 */
export function StartButton(props: StartButtonProps) {
    const { boardGame, callback } = props
    const dispatch = useAppDispatch()

    function handleGameStart(): void {
        if (callback) {
            callback()
        }

        if (!boardGame || !boardGame.isState(NotStartedState)) {
            return
        }

        // Add plugins
        if (settings.getValue('tapAudio')) boardGame.addPlugin(TapAudioPlugin)
        if (settings.getValue('countdownAudio')) boardGame.addPlugin(CountdownAudioPlugin)

        boardGame.start().then(() => {
            // The clock page will retrieve the game from the GameHolder
            dispatch(changePage(PageEnum.CLOCK))

            // Enable full screen
            if (settings.getValue('fullScreen')) {
                enableFullScreen()
            }
        })
    }

    return (
        <Button
            variant="solid"
            marginTop="1em"
            width={'100%'}
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
    callback?: () => void
}
