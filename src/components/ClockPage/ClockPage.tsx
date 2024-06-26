import { Page, PageEnum } from '../Page'
import {
    selectBoardGameChangedSignal,
    selectTimeControlChangedSignal,
    useAppSelector,
} from '../../redux'
import {
    Box,
    BoxProps,
    Button,
    Modal,
    ModalContent,
    ModalOverlay,
    useBoolean,
} from '@chakra-ui/react'
import { ClockDisplay } from './ClockDisplay'
import {
    BoardGame,
    OngoingState,
    PlayerPauseRequest,
    PlayerResumeRequest,
    TwoPlayerBoardGame,
} from '../../game'
import { useEffect, useState } from 'react'
import { boardGameHolder } from '../../common/holder'
import { TimeColor } from '../../common/constants'
import { Horizontal } from '../Horizontal'

/**
 * Clock page.
 */
export function ClockPage() {
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>(undefined)
    const [isModalOpen, setModal] = useBoolean()

    useEffect(() => {
        const currentBoardGame = boardGameHolder.get()
        setBoardGame(currentBoardGame)
    }, [boardGameChangedSignal, timeControlChangedSignal])

    if (!boardGame) {
        return (<Page page={PageEnum.CLOCK} />)
    }

    function handlePause() {
        if (boardGame) {
            boardGame.handleRequest(new PlayerPauseRequest())
        }

        setModal.off()
    }

    function handleResume() {
        if (boardGame) {
            boardGame.handleRequest(new PlayerResumeRequest())
        }

        setModal.off()
    }

    function OperationBox(props: BoxProps) {
        const isOngoing: boolean = boardGame?.isState(OngoingState) || false

        return (
            <Box
                display="flex"
                flexDirection="column"
                {...props}
            >
                <Button
                    marginBottom="1rem"
                    colorScheme={isOngoing ? 'orange' : 'gray'}
                    cursor={isOngoing ? 'pointer' : 'not-allowed'}
                    variant={isOngoing ? 'solid' : 'outline'}
                    onClick={handlePause}
                >
                    Pause
                </Button>

                <Button
                    marginBottom="1rem"
                    colorScheme="teal"
                    variant={isOngoing ? 'outline' : 'solid'}
                    cursor={isOngoing ? 'not-allowed' : 'pointer'}
                    onClick={handleResume}
                >
                    Resume
                </Button>

                <Button onClick={setModal.off}>
                    Cancel
                </Button>
            </Box>
        )
    }

    return (
        <Page page={PageEnum.CLOCK}>
            <Box flex={12} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_A} transform="rotate(180deg)" />
            </Box>
            <Box
                flex={1}
                backgroundColor={TimeColor.TIME_RUNNING_COLOR}
                userSelect="none"
                onClick={setModal.on}
            >
                <Modal isOpen={isModalOpen} onClose={setModal.off}>
                    <ModalOverlay />
                    <ModalContent padding="1rem">
                        <OperationBox transform="rotate(180deg)" />
                        <Horizontal marginTop="1.5rem" marginBottom="1.5rem" />
                        <OperationBox />
                    </ModalContent>
                </Modal>
            </Box>
            <Box flex={12} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_B} />
            </Box>
        </Page>
    )
}
