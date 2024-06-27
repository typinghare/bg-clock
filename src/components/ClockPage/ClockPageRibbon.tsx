import { Box, BoxProps, Button, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import {
    BoardGame,
    OngoingState,
    PausedState,
    PlayerPauseRequest,
    PlayerResumeRequest,
} from '../../game'
import { Horizontal } from '../Horizontal'

export function ClockPageRibbon(props: ClockPageRibbonProps) {
    const { boardGame, isOpen, onClose } = props

    function handlePause() {
        if (boardGame) {
            boardGame.handleRequest(new PlayerPauseRequest())
        }

        onClose()
    }

    function handleResume() {
        if (boardGame) {
            boardGame.handleRequest(new PlayerResumeRequest())
        }

        onClose()
    }

    function OperationBox(props: BoxProps) {
        const isPaused: boolean = boardGame?.isState(PausedState) || false
        const isOngoing: boolean = boardGame?.isState(OngoingState) || false

        return (
            <Box
                display="flex"
                flexDirection="column"
                {...props}
            >
                <Button
                    marginBottom="1rem"
                    colorScheme="orange"
                    cursor={isOngoing ? 'pointer' : 'not-allowed'}
                    variant={isOngoing ? 'solid' : 'outline'}
                    onClick={handlePause}
                >
                    Pause
                </Button>

                <Button
                    marginBottom="1rem"
                    colorScheme="teal"
                    variant={isPaused ? 'solid' : 'outline'}
                    cursor={isPaused ? 'pointer' : 'not-allowed'}
                    onClick={handleResume}
                >
                    Resume
                </Button>

                <Button onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        )
    }

    return (
        <Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent padding="1rem">
                    <OperationBox transform="rotate(180deg)" />
                    <Horizontal marginTop="1.5rem" marginBottom="1.5rem" />
                    <OperationBox />
                </ModalContent>
            </Modal>
        </Box>
    )
}

export interface ClockPageRibbonProps extends BoxProps {
    boardGame?: BoardGame
    isOpen: boolean
    onClose: () => void
}
