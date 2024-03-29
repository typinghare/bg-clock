import { Page, PageEnum } from '../Page'
import { Navigation } from '../Navigation'
import { Container, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react'
import { InstructionPanel } from './InstructionPanel'
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
                        <Tab>Instruction</Tab>
                        <Tab>Changelog</Tab>
                    </TabList>

                    <TabPanels>
                        <InstructionPanel />
                        <ChangelogPanel />
                    </TabPanels>
                </Tabs>
            </Container>
        </Page>
    )
}