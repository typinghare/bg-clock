import { Page, PageEnum } from '../Page'
import { Navigation } from '../Navigation'
import { Container, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react'
import { GuidePanel } from './GuidePanel'
import { ChangelogPanel } from './ChangelogPanel'

/**
 * About page.
 */
export function AboutPage() {
    return (
        <Page page={PageEnum.ABOUT}>
            <Navigation title={'About'} previousPage={PageEnum.PORTAL} />
            <Container paddingY={5}>
                <Tabs>
                    <TabList>
                        <Tab>Guide</Tab>
                        <Tab>Changelog</Tab>
                    </TabList>

                    <TabPanels>
                        <GuidePanel />
                        <ChangelogPanel />
                    </TabPanels>
                </Tabs>
            </Container>
        </Page>
    )
}
