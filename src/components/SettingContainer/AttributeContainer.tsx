import {
    BoardGameAttribute,
    BoardGameAttributeValue,
    BoardGameExpandedAttributeValue,
    BoardGameSettingsMetadata,
} from '../../game'
import { AttributeExpand } from './AttributeExpand'
import { Box, BoxProps, Switch, useBoolean } from '@chakra-ui/react'
import { useState } from 'react'
import { AttributeDescription } from './AttributeDescription'
import { FontFamily } from '../../common/constants'

/**
 * Attribute container.
 */
export function AttributeContainer(props: AttributeContainerProps) {
    const { attribute, onChange } = props
    const [expanded, setExpanded] = useBoolean()
    const [value, setValue] = useState(attribute.getValue())
    const type = attribute.meta('type')
    const label: string = attribute.meta('label')
    const description: string = attribute.meta('description')
    const optionList = attribute.meta('optionList')

    function handleSelect(newValue: BoardGameExpandedAttributeValue): void {
        attribute.setValue(newValue)
        setValue(newValue)
        setExpanded.off()

        if (onChange) {
            onChange()
        }
    }

    function handleBooleanChange(): void {
        const newValue = !attribute.getValue()
        attribute.setValue(newValue)
        setValue(newValue)

        if (onChange) {
            onChange()
        }
    }

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                height="2.5em"
                onClick={setExpanded.toggle}
            >
                <Box display="inline" fontWeight="bold" marginLeft="0.5em">{label}</Box>
                <AttributeDescription description={description} marginLeft="0.5em" />
                <AttributeValue
                    type={type}
                    value={value}
                    marginLeft="auto"
                    marginRight="0.5em"
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
    const { type, value, onChange, ...otherProps } = props

    return (
        <Box
            as="span"
            fontFamily={type === 'time' ? FontFamily.DIGITAL_7 : 'inherit'}
            {...otherProps}
        >
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
}

/**
 * Attribute container properties.
 */
export interface AttributeContainerProps {
    attribute: BoardGameAttribute
    onChange?: () => void
}
