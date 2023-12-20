import { Page, PageEnum } from './Page'
import { changePage, useAppDispatch } from '../../redux'
import { StyleMap } from '../../common/style'
import { Box, Button } from '@chakra-ui/react'
import { Navigation } from '../Navigation'

/**
 * Portal Page.
 */
export function PortalPage() {
    const dispatch = useAppDispatch()
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

    function handleSettingsButtonClick() {
        dispatch(changePage(PageEnum.APP_SETTINGS))
    }

    function handleNewGameButtonClick() {
        dispatch(changePage(PageEnum.GAME_SELECTION))
    }

    function handleResumeGameButtonClick() {
        dispatch(changePage(PageEnum.GAME_SELECTION))
    }

    function PortalButton(props: { text: string, clickHandler: () => void }) {
        const { text, clickHandler } = props
        return (
            <Button variant="solid" colorScheme="telegram" onClick={clickHandler}>
                {text}
            </Button>
        )
    }

    return (
        <Page page={PageEnum.PORTAL}>
            <Navigation title={'BG Clock'} />

            <Box sx={styles.container}>
                <PortalButton text={'Settings'} clickHandler={handleSettingsButtonClick} />
                <PortalButton text={'New Game'} clickHandler={handleNewGameButtonClick} />
                <PortalButton text={'Resume Game'} clickHandler={handleResumeGameButtonClick} />
            </Box>
        </Page>
    )
}