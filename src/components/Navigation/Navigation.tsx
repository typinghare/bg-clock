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
            height: '2.5rem',
            alignItems: 'center',
            padding: '0.25rem 0',
        },
        iconButton: {
            display: 'inline-block',
            float: 'left',
        },
        title: {
            display: 'inline',
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
            {previousPage !== undefined && <PreviousButton />}
            <Box sx={styles.title}>
                {title}
            </Box>
        </Box>
    )
}

export interface NavigationProps extends BoxProps {
    previousPage?: PageEnum
    title: string
}