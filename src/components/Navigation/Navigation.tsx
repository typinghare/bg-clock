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
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            height: '2.75rem',
            padding: '0.25rem 0',
        },
        iconButton: {
            position: 'absolute',
            left: 0,
            background: 'none',
        },
        title: {
            marginLeft: 'auto',
            color: 'black',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            flexGrow: 1,
            flexShrink: 1,
        },
    }

    function handlePreviousButtonClick() {
        if (previousPage) {
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
            <Box sx={styles.title}>
                {previousPage !== undefined && <PreviousButton />}
                {title}
            </Box>
        </Box>
    )
}

export interface NavigationProps extends BoxProps {
    previousPage?: PageEnum
    title: string
}