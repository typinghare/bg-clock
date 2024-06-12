import { Page, PageEnum } from '../Page'
import { Navigation } from '../Navigation'
import { Container } from '@chakra-ui/react'
import { BoardGameSaveCard } from './BoardGameSaveCard'

/**
 * Resume game page.
 */
export function ResumeGamePage() {
    const gameSave: string | null = localStorage.getItem('boardGame')

    return (
        <Page page={PageEnum.RESUME_GAME}>
            <Navigation previousPage={PageEnum.PORTAL} title="Resume Game" />
            <Container paddingTop={5}>
                {gameSave && <BoardGameSaveCard saveObject={JSON.parse(gameSave)} />}
            </Container>
        </Page>
    )
}
