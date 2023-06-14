import { Page } from './Page'
import { PageEnum, switchPage } from '../redux/slice/PageSlice'
import { MuiStyles } from '../common/interfaces'
import { Box, Button } from '@mui/material'
import { useAppDispatch } from '../redux/hooks'
import { Navigation } from './Common/Navigation'

export function PortalPage(): JSX.Element {
    const dispatch = useAppDispatch()

    const styles: MuiStyles<'container'> = {
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
        dispatch(switchPage(PageEnum.APP_SETTINGS))
    }

    function handleStartNewGameButtonClick() {
        dispatch(switchPage(PageEnum.GAME_SELECT))
    }

    function handleResumeGameButtonClick() {
        dispatch(switchPage(PageEnum.GAME_SELECT))
    }

    return (
        <Page pageIndex={PageEnum.PORTAL}>
            <Navigation
                title='Board Game Clock'
                titleCenter
            />

            <Box sx={styles.container}>
                <Button
                    variant='outlined'
                    children='Settings'
                    onClick={handleSettingsButtonClick}
                />

                <Button
                    variant='outlined'
                    children='Start New Game'
                    onClick={handleStartNewGameButtonClick}
                />

                <Button
                    variant='outlined'
                    children='Resume Game'
                    onClick={handleResumeGameButtonClick}
                />
            </Box>
        </Page>
    )
}