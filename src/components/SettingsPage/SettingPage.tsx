import { Page, PageEnum } from '../Page'
import { SettingContainer } from '../SettingContainer'
import { Navigation } from '../Navigation'
import { Container } from '@chakra-ui/react'
import { saveSettingsToLocalStorage, settings } from '../../common/settings'
import { notifySettingsChanged, useAppDispatch } from '../../redux'

export function SettingsPage() {
    const dispatch = useAppDispatch()

    function handleSettingChange() {
        saveSettingsToLocalStorage()
        dispatch(notifySettingsChanged())
    }

    return (
        <Page page={PageEnum.SETTINGS}>
            <Navigation previousPage={PageEnum.PORTAL} title="Settings" />
            <Container paddingTop="1em">
                <SettingContainer
                    title="Settings"
                    dataCollection={settings}
                    defaultExpanded={true}
                    onSettingChange={handleSettingChange}
                />
            </Container>
        </Page>
    )
}
