import { StyleMap } from '../../../common/style'
import { Box, Button, Collapse, Stack } from '@chakra-ui/react'
import { PlayerAttributeValue, PlayerSettingsMetadata } from '../../../game'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

/**
 * Attribute expand.
 */
export function PlayerAttributeExpand(props: PlayerAttributeExpandProps) {
    if (props.type === 'bool') {
        return ''
    }

    const { expanded, type, value, optionList, onSelect } = props
    const styles: StyleMap = {
        container: {
            padding: '0.25em',
        },
        optionButton: {
            fontFamily: type === 'time' ? 'Digital-7' : 'inherit',
        },
    }

    function isEqual(value: ExpandedPlayerAttributeValue, option: ExpandedPlayerAttributeValue): boolean {
        if (type === 'number') {
            return value === option
        } else if (type === 'time') {
            return (value as HourMinuteSecond).ms === (option as HourMinuteSecond).ms
        }

        return false
    }

    function OptionButton(props: { option: ExpandedPlayerAttributeValue }) {
        const { option } = props

        function handleClick() {
            onSelect(option)
        }

        return (
            <Button
                display="inline-flex"
                onClick={handleClick}
                colorScheme={isEqual(value, option) ? 'green' : 'gray'}
                sx={styles.optionButton}
            >
                {option.toString()}
            </Button>
        )
    }

    return (
        <Collapse in={expanded} animateOpacity>
            <Box sx={styles.container}>
                <Stack spacing="0.5em" direction="row" flexWrap="wrap">
                    {optionList?.map(((option, index) => (
                        <OptionButton key={index} option={option} />
                    )))}
                </Stack>
            </Box>
        </Collapse>
    )
}

export type ExpandedPlayerAttributeValue = Exclude<PlayerAttributeValue, boolean>

export interface PlayerAttributeExpandProps {
    expanded: boolean
    type: PlayerSettingsMetadata['type']
    value: ExpandedPlayerAttributeValue
    optionList?: ExpandedPlayerAttributeValue[]
    onSelect: (newValue: ExpandedPlayerAttributeValue) => void
}