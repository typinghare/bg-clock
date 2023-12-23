import { Box, BoxProps, Tooltip, useBoolean, useOutsideClick } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import React, { RefObject, useRef } from 'react'

/**
 * Player attribute description.
 * @constructor
 */
export function PlayerAttributeDescription(props: PlayerAttributeDescriptionProps) {
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
        console.log(isTooltipOpen)
    }

    return (
        <Box ref={ref} onClick={handleClick} {...boxProps}>
            <Tooltip label={description} isOpen={isTooltipOpen}>
                <QuestionOutlineIcon />
            </Tooltip>
        </Box>
    )
}

export interface PlayerAttributeDescriptionProps extends BoxProps {
    description: string
}