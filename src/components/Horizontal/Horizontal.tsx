import { CSSProperties } from 'react'
import { Box } from '@chakra-ui/react'

/**
 * Horizontal rule.
 */
export function Horizontal(props: HorizontalProps) {
    const { margin, width = '100%', floatRight = false } = props

    return (
        <Box
            display="flex"
            justifyContent={floatRight ? 'flex-end' : 'flex-start'}
            margin={margin}
        >
            <hr style={{ width }} />
        </Box>
    )
}

/**
 * Horizontal rule properties.
 */
export interface HorizontalProps {
    margin?: CSSProperties['margin']
    width?: CSSProperties['width']
    floatRight?: boolean
}
