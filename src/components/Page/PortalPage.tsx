import { Page, PageEnum } from './Page'
import { changePage, useAppDispatch } from '../../redux'
import { StyleMap } from '../../common/style'
import { Box, Button } from '@chakra-ui/react'
import { Navigation } from '../Navigation'

/**
 * Portal Page.
 */
export function PortalPage() {
    const styles: StyleMap = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            gap: '3rem',
            padding: '1rem',
            justifyContent: 'center',
            height: '100%',

            '& > button': {
                fontSize: '1.5em',
            },
        },
    }

    return (
        <Page page={PageEnum.PORTAL}>
            <Navigation title={'BG Clock'} />

            <Box sx={styles.container}>
                <PortalButton text={'New Game'} page={PageEnum.GAME_SELECTION} />
                <PortalButton text={'Resume Game'} page={PageEnum.RESUME_GAME} />
                <PortalButton text={'Settings'} page={PageEnum.SETTINGS} />
                <PortalButton text={'About'} page={PageEnum.ABOUT} />
            </Box>
        </Page>
    )
}

function PortalButton(props: PortalButtonProps) {
    const { text, page } = props
    const dispatch = useAppDispatch()

    function handleClick() {
        dispatch(changePage(page))
    }

    return (
        <Button
            variant="solid"
            colorScheme="green"
            onClick={handleClick}
        >
            {text}
        </Button>
    )
}

interface PortalButtonProps {
    text: string
    page: PageEnum
}