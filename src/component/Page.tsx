import React from 'react'
import { Box, BoxProps } from '@mui/material'
import { PageEnum, selectPage } from '../redux/slice/PageSlice'
import { useAppSelector } from '../redux/hooks'
import { MuiStyles } from '../common/interfaces'

export interface PageProps extends BoxProps {
    pageIndex: PageEnum
}

/**
 * A full-screen page component that utilizes the "flex" value for its "display" property when it is intended to be
 * displayed on the screen.
 * @constructor
 */
export const Page = function(props: PageProps): JSX.Element {
    const { pageIndex, sx, children } = props
    const page: PageEnum = useAppSelector(selectPage)

    const styles: MuiStyles = {
        root: {
            display: page === pageIndex ? 'flex' : 'none',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            margin: '0 !important',
            padding: '0 !important',
            overflowX: 'hidden',
            overflowY: 'hidden',
            ...sx,
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '75vh',
            height: '100%',
            margin: '0 auto',
        },
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.container}>
                {children}
            </Box>
        </Box>
    )
}