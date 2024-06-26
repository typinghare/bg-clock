import { Page, PageEnum } from '../Page'
import {
    selectBoardGameChangedSignal,
    selectTimeControlChangedSignal,
    useAppSelector,
} from '../../redux'
import { Box, Button, Modal, ModalContent, ModalOverlay, useBoolean } from '@chakra-ui/react'
import { ClockDisplay } from './ClockDisplay'
import { BoardGame, PlayerPauseRequest, PlayerResumeRequest, TwoPlayerBoardGame } from '../../game'
import { useEffect, useState } from 'react'
import { boardGameHolder } from '../../common/holder'
import { TimeColor } from '../../common/constants'

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
                        <Button marginBottom="1rem" colorScheme="yellow" onClick={handlePause}>
                            Pause
                        </Button>

                        <Button colorScheme="teal" onClick={handleResume}>
                            Resume
                        </Button>
                    </ModalContent>
                </Modal>
            </Box>
            <Box flex={12} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_B} />
            </Box>
        </Page>
    )
}
