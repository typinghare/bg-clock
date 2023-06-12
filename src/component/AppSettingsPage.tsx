import { Page } from './Page'
import { PageEnum } from '../redux/slice/PageSlice'
import { Box } from '@mui/material'

export function AppSettingsPage(): JSX.Element {
    return (
        <Page pageIndex={PageEnum.APP_SETTINGS}>
            <Box> App Settings </Box>
        </Page>
    )
}