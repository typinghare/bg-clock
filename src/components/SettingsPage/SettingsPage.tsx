import { Page, PageEnum } from '../Page'
import { SettingContainer } from '../SettingContainer'
import { useSettings } from '../../state/useSettings'
import { Navigation } from '../Navigation'
import { Container } from '@chakra-ui/react'

export function SettingsPage() {
    const settings = useSettings()

    return (
        <Page page={PageEnum.SETTINGS}>
            <Navigation previousPage={PageEnum.PORTAL} title={'Settings'} />
            <Container paddingY={5}>
                <SettingContainer
                    title={'Settings'}
                    dataCollection={settings}
                    expanded={true}
                />
            </Container>
        </Page>
    )
}