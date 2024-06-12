import { Box, BoxProps, Divider } from '@chakra-ui/react'

/**
 * Horizontal rule.
 */
export function Horizontal(props: HorizontalProps) {
    const { width = '100%', floatRight = false, ...otherProps } = props

    return (
        <Box
            display="flex"
            justifyContent={floatRight ? 'flex-end' : 'flex-start'}
            {...otherProps}
        >
            <Divider width={width} />
        </Box>
    )
}

/**
 * Horizontal rule properties.
 */
export interface HorizontalProps extends BoxProps {
    floatRight?: boolean
}
