import { Box, BoxProps, Switch, useBoolean } from '@chakra-ui/react'
import { Player, PlayerAttribute, PlayerAttributeValue, PlayerSettingsMetadata } from '../../../game'
import { ExpandableContainer } from '../../ExpandableContainer'
import { StyleMap } from '../../../common/style'
import { Horizontal } from '../../Horizontal'
import { PlayerAttributeDescription } from './PlayerAttributeDescription'
import { ExpandedPlayerAttributeValue, PlayerAttributeExpand } from './PlayerAttributeExpand'
import { useState } from 'react'

export function PlayerSettingContainer(props: PlayerSettingContainerProps) {
    const { player } = props
    const [expanded, setExpanded] = useBoolean()
    const attributeList = player.getAttributeList()

    return (
        <ExpandableContainer
            expanded={expanded}
            title={`Player ${player.getRole()} - Settings`}
            onExpandButtonClick={setExpanded.toggle}
        >
            {attributeList.map(((attribute, index) => (
                <Box key={index}>
                    <PlayerAttributeContainer attribute={attribute} />
                    {index == attributeList.length - 1 ? '' :
                        <Horizontal floatRight margin="0.5rem 0" width="80%" />}
                </Box>
            )))}
        </ExpandableContainer>
    )
}

export function PlayerAttributeContainer(props: PlayerAttributeContainerProps) {
    const { attribute } = props
    const [expanded, setExpanded] = useBoolean()
    const styles: StyleMap = {
        line: {
            display: 'flex',
            alignItems: 'center',
            height: '2.5em',
        },
        label: {
            display: 'inline',
            fontWeight: 'bold',
            marginLeft: '0.5em',
        },
        description: {
            marginLeft: '0.5em',
        },
        value: {
            marginLeft: 'auto',
            marginRight: '0.75em',
        },
    }

    const [value, setValue] = useState(attribute.getValue())
    const type = attribute.getMeta('type')
    const label: string = attribute.getMeta('label')
    const description: string = attribute.getMeta('description')
    const optionList = attribute.getMeta('optionList')

    function handleLineClick() {
        setExpanded.toggle()
    }

    function handleSelect(newValue: ExpandedPlayerAttributeValue): void {
        attribute.setValue(newValue)
        setValue(newValue)
        setExpanded.off()
    }

    return (
        <>
            <Box sx={styles.line} onClick={handleLineClick}>
                <Box sx={styles.label}>{label}</Box>
                <PlayerAttributeDescription description={description} sx={styles.description} />
                <PlayerSettingValue type={type} value={value} sx={styles.value} />
            </Box>
            {type !== 'bool' && (
                <PlayerAttributeExpand
                    expanded={expanded}
                    type={type}
                    value={value as ExpandedPlayerAttributeValue}
                    optionList={optionList as ExpandedPlayerAttributeValue[]}
                    onSelect={handleSelect}
                />
            )}
        </>
    )
}

export function PlayerSettingValue(props: PlayerSettingValueProps) {
    const { type, value, sx } = props
    const styles: StyleMap = {
        root: {
            fontFamily: type === 'time' ? 'Digital-7' : 'inherit',
            ...sx,
        },
    }

    return (
        <Box display="inline" sx={styles.root}>
            {type === 'bool' && (<Switch />)}
            {type === 'number' && (<Box>{value.toString()}</Box>)}
            {type === 'time' && (<Box>{value.toString()}</Box>)}
        </Box>
    )
}

export interface PlayerSettingContainerProps {
    player: Player
}

export interface PlayerAttributeContainerProps {
    attribute: PlayerAttribute
}

export interface PlayerSettingValueProps extends BoxProps {
    type: PlayerSettingsMetadata['type']
    value: PlayerAttributeValue
}

