import { Page, PageEnum } from '../Page'
import { Navigation } from '../Navigation'
import { Alert, Box, Container } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

/**
 * Resume game page.
 */
export function ResumeGamePage() {
    return (
        <Page page={PageEnum.RESUME_GAME} title="Resume Game">
            <Navigation previousPage={PageEnum.PORTAL} title="Resume Game" />

            <Container paddingY={5}>
                <Alert status="warning">
                    <WarningIcon />
                    <Box as="span" ml={2}>
                        This feature is being implemented ...
                    </Box>
                </Alert>
            </Container>
        </Page>
    )
}