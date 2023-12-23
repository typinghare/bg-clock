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
            justifyContent: 'center',
            height: '32px',
        },
        iconButton: {
            position: 'absolute',
            left: '0',
            background: 'none',
            width: '32px !important',
            height: '32px',
        },
        title: {
            marginLeft: 'auto',
            marginTop: 'auto',
            color: 'black',
            textAlign: 'center',
            fontSize: '1.15rem',
            fontWeight: 'bold',
            flexGrow: 1,
            flexShrink: 1,
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