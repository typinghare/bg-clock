import {
    Box,
    Button,
    Collapse,
    Modal,
    ModalContent,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    useBoolean,
    useBreakpointValue,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { BoardGameExpandedAttributeValue, BoardGameSettingsMetadata } from '../../game'
import { FontFamily } from '../../common/constants'
import { useState } from 'react'

/**
 * Attribute expand.
 */
export function AttributeExpand(props: AttributeExpandProps) {
    const [modalOpen, setModalOpen] = useBoolean(false)

    if (props.type === 'bool') {
        return <></>
    }

    const { expanded, type, value, optionList, onSelect } = props

    function isEqual(
        value: BoardGameExpandedAttributeValue,
        option: BoardGameExpandedAttributeValue,
    ): boolean {
        if (type === 'number') {
            return value === option
        } else if (type === 'time') {
            return (value as HourMinuteSecond).ms === (option as HourMinuteSecond).ms
        }

        return false
    }

    function OptionButton(props: { optionValue: BoardGameExpandedAttributeValue }) {
        const { optionValue } = props
        return (
            <Button
                display="inline-flex"
                onClick={() => {
                    onSelect(optionValue)
                }}
                colorScheme={isEqual(value, optionValue) ? 'green' : 'gray'}
                fontFamily={type === 'time' ? FontFamily.DIGITAL_7 : 'inherit'}
            >
                {optionValue.toString()}
            </Button>
        )
    }

    function handleCustomizeButtonClick(): void {
        setModalOpen.on()
    }

    function handleCustomizeButtonClose(value: BoardGameExpandedAttributeValue): void {
        onSelect(value)
        setModalOpen.off()
    }

    function CustomizeButton() {
        return (
            <>
                <Button
                    display="inline-flex"
                    onClick={handleCustomizeButtonClick}
                >
                    Custom
                </Button>
                <CustomizeModal
                    isOpen={modalOpen}
                    onClose={handleCustomizeButtonClose}
                    type={type}
                    currentValue={value}
                />
            </>

        )
    }

    return (
        <Collapse in={expanded} animateOpacity>
            <Box padding="0.25em">
                <Stack spacing="0.5em" direction="row" flexWrap="wrap">
                    {optionList?.map(((option, index) => (
                        <OptionButton key={index} optionValue={option} />
                    )))}
                    <CustomizeButton key={optionList ? optionList.length : 0} />
                </Stack>
            </Box>
        </Collapse>
    )
}

export interface AttributeExpandProps {
    expanded: boolean
    type: BoardGameSettingsMetadata['type']
    value: BoardGameExpandedAttributeValue
    optionList?: BoardGameExpandedAttributeValue[]
    onSelect: (newValue: BoardGameExpandedAttributeValue) => void
}

function CustomizeModal(props: CustomizeModalProps) {
    const { onClose, type, currentValue, ...otherProps } = props
    const [value, setValue] = useState<BoardGameExpandedAttributeValue>(currentValue)

    function handleClose(): void {
        onClose(value)
    }

    function handleCancel(): void {
        onClose(currentValue)
    }

    const modalSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' })

    return (
        <Modal onClose={handleClose} size={modalSize} {...otherProps}>
            <ModalOverlay />
            <ModalContent padding="1em">

                {type === 'number' && (
                    <>
                        <Box fontSize="1.25em" fontWeight="bold" marginBottom="0.75em">
                            Input a number:
                        </Box>
                        <NumberInput
                            defaultValue={currentValue as number}
                            width="100%"
                            marginBottom="0.75em"
                            onChange={(_, value) => {
                                setValue(value)
                            }}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </>
                )}

                {
                    type === 'time' && (
                        <>
                            <Box fontSize="1.25em" fontWeight="bold" marginBottom="0.75em">
                                Select a time
                            </Box>
                        </>
                    )
                }

                <Box display="flex" justifyContent="flex-end">
                    <Wrap spacing={2}>
                        <WrapItem>
                            <Button colorScheme="green" onClick={handleClose}>
                                Ok
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Button colorScheme="blackAlpha" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </WrapItem>
                    </Wrap>
                </Box>
            </ModalContent>
        </Modal>
    )
}

interface CustomizeModalProps {
    isOpen: boolean
    onClose: (value: BoardGameExpandedAttributeValue) => void
    type: BoardGameSettingsMetadata['type']
    currentValue: BoardGameExpandedAttributeValue
}
