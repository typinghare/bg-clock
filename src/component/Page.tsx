import React from 'react'
import { Box, BoxProps, SxProps } from '@mui/material'

export interface PageProps extends BoxProps {
    // Whether this page is displayed.
    isDisplay: boolean
}

/**
 * A full-screen page component that utilizes the "flex" value for its "display" property when it is intended to be
 * displayed on the screen.
 * @constructor
 */
export const Page = function(props: PageProps): JSX.Element {
    const { isDisplay, sx, children } = props
    const style: SxProps<any> = {
        height: '100vh',
        width: '100vw',
        margin: '0 !important',
        padding: '0 !important',
        display: isDisplay ? 'flex' : 'none',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'hidden',
        ...sx,
    }

    return <Box sx={style} children={children} />
}