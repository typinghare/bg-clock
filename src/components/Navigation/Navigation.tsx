import { Box, BoxProps, IconButton } from '@chakra-ui/react'
import { PageEnum } from '../Page'
import { changePage, useAppDispatch } from '../../redux'
import { StyleMap } from '../../common/style'
import { ArrowBackIcon } from '@chakra-ui/icons'

/**
 * Navigation bar.
 */
export function Navigation(props: NavigationProps) {
    const { previousPage, title } = props
    const dispatch = useAppDispatch()
    const styles: StyleMap = {
        root: {
            width: '100%',
        },
        inner: {
            display: 'flex',
            flex: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '36px',
            position: 'relative',
            width: '100%',
        },
        iconButton: {
            position: 'absolute',
            left: '0',
            background: 'none',
            height: '32px',
        },
        title: {
            marginLeft: 'auto',
            color: 'black',
            textAlign: 'center',
            fontSize: '1.15rem',
            fontWeight: 'bold',
            flexGrow: 1,
            centerContent: 'true',
        },
    }

    function handlePreviousButtonClick() {
        if (previousPage !== undefined) {
            dispatch(changePage(previousPage))
        }
    }

    function PreviousButton() {
        return (
            <IconButton
                sx={styles.iconButton}
                onClick={handlePreviousButtonClick}
                aria-label="Previous Page"
            >
                <ArrowBackIcon sx={styles.icon} />
            </IconButton>
        )
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.inner}>
                {previousPage !== undefined && <PreviousButton />}
                <Box sx={styles.title}>
                    {title}
                </Box>
            </Box>
        </Box>
    )
}

export interface NavigationProps extends BoxProps {
    previousPage?: PageEnum
    title: string
}