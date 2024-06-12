import { Box, Button, Collapse, Stack } from '@chakra-ui/react'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { BoardGameExpandedAttributeValue, BoardGameSettingsMetadata } from '../../game'
import { FontFamily } from '../../common/constants'

/**
 * Attribute expand.
 */
export function AttributeExpand(props: AttributeExpandProps) {
    if (props.type === 'bool') {
        return <></>
    }

    const { expanded, type, value, optionList, onSelect } = props

    function isEqual(value: BoardGameExpandedAttributeValue, option: BoardGameExpandedAttributeValue): boolean {
        if (type === 'number') {
            return value === option
        } else if (type === 'time') {
            return (value as HourMinuteSecond).ms === (option as HourMinuteSecond).ms
        }

        return false
    }

    function OptionButton(props: { option: BoardGameExpandedAttributeValue }) {
        const { option } = props

        function handleClick() {
            onSelect(option)
        }

        return (
            <Button
                display="inline-flex"
                onClick={handleClick}
                colorScheme={isEqual(value, option) ? 'green' : 'gray'}
                fontFamily={type === 'time' ? FontFamily.DIGITAL_7 : 'inherit'}
            >
                {option.toString()}
            </Button>
        )
    }

    return (
        <Collapse in={expanded} animateOpacity>
            <Box padding="0.25em">
                <Stack spacing="0.5em" direction="row" flexWrap="wrap">
                    {optionList?.map(((option, index) => (
                        <OptionButton key={index} option={option} />
                    )))}
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
    // eslint-disable-next-line no-unused-vars
    onSelect: (newValue: BoardGameExpandedAttributeValue) => void
}
