import { Page } from './Page'
import { PageEnum } from '../redux/slice/PageSlice'
import { AppSettingsSection } from './AppSettingsSection'
import { AppNavigation } from './Common/AppNavigation'
import { Box } from '@mui/material'
import { MuiStyles } from '../common/interfaces'

export function AppSettingsPage(): JSX.Element {
    const styles: MuiStyles<'content'> = {
        content: {
            height: '100%',
            padding: '2em 1em',
            backgroundColor: '#EAEAEA',
        },
    }

    return (
        <Page pageIndex={PageEnum.APP_SETTINGS}>
            <AppNavigation
                previousPage={PageEnum.PORTAL}
                title='Settings'
            />

            <Box sx={styles.content}>
                <AppSettingsSection />
            </Box>
        </Page>
    )
}