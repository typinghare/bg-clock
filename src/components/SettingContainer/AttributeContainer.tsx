import {
    BoardGameAttribute,
    BoardGameAttributeValue,
    BoardGameExpandedAttributeValue,
    BoardGameSettingsMetadata,
} from '../../game'
import { AttributeExpand } from './AttributeExpand'
import { Box, BoxProps, Switch, useBoolean } from '@chakra-ui/react'
import { StyleMap } from '../../common/style'
import { useState } from 'react'
import { AttributeDescription } from './AttributeDescription'
import { pulse, useAppDispatch } from '../../redux'

/**
 * Attribute container.
 */
export function AttributeContainer(props: AttributeContainerProps) {
    const { attribute } = props
    const dispatch = useAppDispatch()
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

    function handleSelect(newValue: BoardGameExpandedAttributeValue): void {
        attribute.setValue(newValue)
        setValue(newValue)
        setExpanded.off()

        // Refresh settings UI
        dispatch(pulse())
    }

    function handleBooleanChange(): void {
        const newValue = !attribute.getValue()
        attribute.setValue(newValue)
        setValue(newValue)

        // Refresh settings UI
        dispatch(pulse())
    }

    return (
        <>
            <Box sx={styles.line} onClick={handleLineClick}>
                <Box sx={styles.label}>{label}</Box>
                <AttributeDescription description={description} sx={styles.description} />
                <AttributeValue
                    type={type}
                    value={value}
                    sx={styles.value}
                    onChange={handleBooleanChange}
                />
            </Box>
            {type !== 'bool' && (
                <AttributeExpand
                    expanded={expanded}
                    type={type}
                    value={value as BoardGameExpandedAttributeValue}
                    optionList={optionList as BoardGameExpandedAttributeValue[]}
                    onSelect={handleSelect}
                />
            )}
        </>
    )
}

/**
 * Setting value.
 */
export function AttributeValue(props: AttributeValueProps) {
    const { type, value, sx, onChange } = props
    const styles: StyleMap = {
        root: {
            fontFamily: type === 'time' ? 'Digital-7' : 'inherit',
            ...sx,
        },
    }

    return (
        <Box display="inline" sx={styles.root}>
            {type === 'bool' && (<Switch isChecked={!!value} onChange={onChange} />)}
            {type === 'number' && (<Box>{value.toString()}</Box>)}
            {type === 'time' && (<Box>{value.toString()}</Box>)}
        </Box>
    )
}

/**
 * Attribute value properties.
 */
export interface AttributeValueProps extends BoxProps {
    type: BoardGameSettingsMetadata['type']
    value: BoardGameAttributeValue

    onChange?: () => void
}

/**
 * Attribute container properties.
 */
export interface AttributeContainerProps {
    attribute: BoardGameAttribute
}