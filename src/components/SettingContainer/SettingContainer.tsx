import { Box, useBoolean } from '@chakra-ui/react'
import { BoardGameAttribute, BoardGameSettingsMetadata } from '../../game'
import { ExpandableContainer } from '../ExpandableContainer'
import { Horizontal } from '../Horizontal'
import { DataCollection } from '@typinghare/extrum'
import { AttributeContainer } from './AttributeContainer'

/**
 * Settings container.
 * @param props
 * @constructor
 */
export function SettingContainer(props: SettingContainerProps) {
    const { title, dataCollection, expanded: defaultExpanded, onSettingChange } = props
    const [expanded, setExpanded] = useBoolean(defaultExpanded || false)
    const attributeList = dataCollection.getDatumList() as BoardGameAttribute[]

    return (
        <ExpandableContainer
            expanded={expanded}
            title={title}
            onExpandButtonClick={setExpanded.toggle}
        >
            {attributeList.map(((attribute, index) => (
                <Box key={index}>
                    <AttributeContainer attribute={attribute} onChange={onSettingChange} />
                    {index == attributeList.length - 1 ? '' :
                        <Horizontal floatRight margin="0.5rem 0" width="80%" />}
                </Box>
            )))}
        </ExpandableContainer>
    )
}

/**
 * Setting container properties.
 */
export interface SettingContainerProps {
    title: string

    dataCollection: DataCollection<any, BoardGameSettingsMetadata>

    // Whether it is expanded by default
    expanded?: boolean

    // Fired when any setting is changed
    onSettingChange?: () => void
}
