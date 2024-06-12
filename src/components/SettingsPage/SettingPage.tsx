import { Page, PageEnum } from '../Page'
import { SettingContainer } from '../SettingContainer'
import { Navigation } from '../Navigation'
import { Container } from '@chakra-ui/react'
import { saveSettingsToLocalStorage, settings } from '../../common/settings'

export function SettingsPage() {
    function handleSettingChange() {
        saveSettingsToLocalStorage()
    }

    return (
        <Page page={PageEnum.SETTINGS}>
            <Navigation previousPage={PageEnum.PORTAL} title="Settings" />
            <Container paddingTop={5}>
                <SettingContainer
                    title="Settings"
                    dataCollection={settings}
                    expanded={true}
                    onSettingChange={handleSettingChange}
                />
            </Container>
        </Page>
    )
}
