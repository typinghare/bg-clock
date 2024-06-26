import { Box, useBoolean } from '@chakra-ui/react'
import { TimeControl } from '../../game'
import { ExpandableContainer } from '../ExpandableContainer'
import { Horizontal } from '../Horizontal'

/**
 * Time control select.
 */
export function TimeControlSelect(props: TimeControlSelectProps) {
    const { timeControlList, selectedTimeControlIndex, onTimeControlSelect } = props
    const [accordionExpanded, setAccordionExpanded] = useBoolean()

    function createTimeControlSelectedHandler(index: number) {
        return function() {
            setAccordionExpanded.off()
            onTimeControlSelect(index)
        }
    }

    const timeControlName = timeControlList[selectedTimeControlIndex].getName()

    return (
        <ExpandableContainer
            expanded={accordionExpanded}
            title={`Time Control (${timeControlName})`}
            onExpandButtonClick={setAccordionExpanded.toggle}
        >
            {timeControlList.map(((timeControl, index) => (
                <Box key={index}>
                    <TimeControlBlock
                        index={index}
                        timeControl={timeControl}
                        selected={index === selectedTimeControlIndex}
                        onTimeControlSelected={createTimeControlSelectedHandler(index)}
                    />
                    {index == timeControlList.length - 1 ? '' :
                        <Horizontal floatRight margin="0.5rem 0" width="80%" />}
                </Box>
            )))}
        </ExpandableContainer>
    )
}

/**
 * Time control block includes the name and the description of a time control.
 */
export function TimeControlBlock(props: TimeControlBlockProps) {
    const { index, timeControl, selected, onTimeControlSelected } = props

    return (
        <Box
            padding="0.5rem"
            borderRadius="0.25rem"
            cursor="pointer"
            backgroundColor={selected ? '#d8f3dc' : '#f3f3f3'}
            sx={{ ':hover': { backgroundColor: selected ? '#d8f3dc' : '#eeeeee' } }}
            onClick={() => onTimeControlSelected(index)}
        >
            <Box fontSize="1.15em" fontWeight="bold">
                {timeControl.getName()}
            </Box>
            <p>
                {timeControl.getDescription()}
            </p>
        </Box>
    )
}

export interface TimeControlSelectProps {
    timeControlList: TimeControl[]
    selectedTimeControlIndex: number
    onTimeControlSelect: (timeControlIndex: number) => void
}

export interface TimeControlBlockProps {
    index: number
    timeControl: TimeControl
    selected: boolean
    onTimeControlSelected: TimeControlSelectedHandler
}

export type TimeControlSelectedHandler = (index: number) => void
