import { Box, useBoolean } from '@chakra-ui/react'
import { TimeControl } from '../../../game'
import { useState } from 'react'
import { ExpandableContainer } from '../../ExpandableContainer'
import { Horizontal } from '../../Horizontal'
import { StyleMap } from '../../../common/style'

/**
 * Time control select.
 */
export function TimeControlSelect(props: TimeControlSelectProps) {
    const { timeControlList, onTimeControlSelect } = props
    const [accordionExpanded, setAccordionExpanded] = useBoolean()
    const [selectedTimeControlIndex, setSelectedTimeControlIndex] = useState(0)

    function createTimeControlSelectedHandler(index: number) {
        return function() {
            setAccordionExpanded.off()
            setSelectedTimeControlIndex(index)
            onTimeControlSelect(index)
        }
    }

    return (
        <ExpandableContainer
            expanded={accordionExpanded}
            title="Time Control"
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
    const styles: StyleMap = {
        root: {
            padding: '0.5rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            backgroundColor: selected ? '#d8f3dc' : '#f3f3f3',
            ':hover': {
                backgroundColor: selected ? '#d8f3dc' : '#eeeeee',
            },
        },
        title: {
            fontSize: '1.15rem', fontWeight: 'bold',
        },
    }

    function handleClick() {
        onTimeControlSelected(index)
    }

    return (
        <Box onClick={handleClick} sx={styles.root}>
            <Box sx={styles.title}>
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
    onTimeControlSelect: (timeControlIndex: number) => void
}

export interface TimeControlBlockProps {
    index: number
    timeControl: TimeControl
    selected: boolean
    onTimeControlSelected: TimeControlSelectedHandler
}

export type TimeControlSelectedHandler = (index: number) => void