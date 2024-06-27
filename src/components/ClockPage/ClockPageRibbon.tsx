import { Box, BoxProps, Button, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { BoardGame, OngoingState, PausedState } from '../../game'
import { Horizontal } from '../Horizontal'
import { PauseEvent } from '../../game/event/PauseEvent'
import { ResumeEvent } from '../../game/event/ResumeEvent'

export function ClockPageRibbon(props: ClockPageRibbonProps) {
    const { boardGame, isOpen, onClose, label, ...otherProps } = props

    function handlePause() {
        if (boardGame && boardGame.isState(OngoingState)) {
            const pauseEvent = new PauseEvent({ role: '' })
            boardGame.getGameContext().eventManager.trigger(pauseEvent)
            onClose()
        }
    }

    function handleResume() {
        if (boardGame && boardGame.isState(PausedState)) {
            const resumeEvent = new ResumeEvent({ role: '' })
            boardGame.getGameContext().eventManager.trigger(resumeEvent)
            onClose()
        }
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
        <Box height="100%" display="flex" fontSize="1.25rem" {...otherProps}>
            <Box height="100%" flex={1}>
                <RibbonLabel label={label} transform="rotate(180deg)" />
            </Box>
            <Box height="100%" flex={1}>
                <RibbonLabel label={label} />
            </Box>

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
    label: string
}

function RibbonLabel(props: RibbonLabelProps) {
    const { label, ...otherProps } = props

    return (
        <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            userSelect="none"
            cursor="default"
            {...otherProps}
        >
            <div>
                {label}
            </div>
        </Box>
    )
}

interface RibbonLabelProps extends BoxProps {
    label: string
}
