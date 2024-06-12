import { Box, BoxProps, Tooltip, useBoolean, useOutsideClick } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import React, { RefObject, useRef } from 'react'

/**
 * Attribute description.
 * @constructor
 */
export function AttributeDescription(props: AttributeDescriptionProps) {
    const { description, ...boxProps } = props
    const ref = useRef() as RefObject<never>
    const [isTooltipOpen, setIsTooltipOpen] = useBoolean()
    useOutsideClick({
        ref: ref,
        handler: setIsTooltipOpen.off,
    })

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        setIsTooltipOpen.toggle()
    }

    return (
        <Box ref={ref} onClick={handleClick} {...boxProps}>
            <Tooltip label={description} isOpen={isTooltipOpen}>
                <QuestionOutlineIcon />
            </Tooltip>
        </Box>
    )
}

/**
 * Attribute description properties.
 */
export interface AttributeDescriptionProps extends BoxProps {
    description: string
}
