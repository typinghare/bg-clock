import { Box, BoxProps, Grid, IconButton } from '@chakra-ui/react'
import { PageEnum } from '../Page'
import { changePage, useAppDispatch } from '../../redux'
import { ArrowBackIcon } from '@chakra-ui/icons'

/**
 * Navigation bar.
 */
export function Navigation(props: NavigationProps) {
    const { previousPage, title } = props
    const dispatch = useAppDispatch()

    function handlePreviousButtonClick() {
        if (previousPage === undefined) {
            return
        }

        dispatch(changePage(previousPage))
    }

    function PreviousButton() {
        return (
            <IconButton
                position="absolute"
                left="0"
                height="32px"
                background=""
                onClick={handlePreviousButtonClick}
                aria-label="Previous Page"
            >
                <ArrowBackIcon />
            </IconButton>
        )
    }

    return (
        <Box width="100%">
            <Grid
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="36px"
                width="100%"
                position="relative"
            >
                {previousPage !== undefined && <PreviousButton />}
                <Box
                    marginLeft="auto"
                    color="black"
                    textAlign="center"
                    fontSize="1.15rem"
                    fontWeight="bold"
                    flexGrow={1}
                >
                    {title}
                </Box>
            </Grid>
        </Box>
    )
}

export interface NavigationProps extends BoxProps {
    previousPage?: PageEnum
    title: string
}
