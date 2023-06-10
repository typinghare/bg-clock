import React from 'react'
import { Box, BoxProps, SxProps } from '@mui/material'

export type PanelProps = BoxProps & {
    // Whether this panel is shown.
    isDisplay: boolean
    sx?: SxProps;
}

/**
 * A full-screen panel component that utilizes the "flex" value for its "display" property when it is intended to be
 * displayed on the screen.
 * @constructor
 */
export const Panel: React.FC<PanelProps> = function(props): JSX.Element {
    const { isDisplay, sx } = props

    const style = {
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        overflowY: 'hidden',
        display: isDisplay ? 'flex' : 'none',
        flexDirection: 'column',
        margin: '0 !important',
        padding: '0 !important',
        ...sx,
    }

    return <Box sx={style} />
}