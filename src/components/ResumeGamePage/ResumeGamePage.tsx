import { Page, PageEnum } from '../Page'
import { Navigation } from '../Navigation'
import { Container } from '@chakra-ui/react'
import { BoardGameSaveCard } from './BoardGameSaveCard'
import { BoardGameSave, BoardGameSaveObject } from '../../game'
import { LocalStorageKey } from '../../common/constants'
import { changePage } from '../../redux'
import { boardGameHolder } from '../../common/holder'
import { useDispatch } from 'react-redux'

/**
 * Resume game page.
 */
export function ResumeGamePage() {
    const dispatch = useDispatch()
    const gameSaveObjectList: BoardGameSaveObject[] = []
    const gameSaveString: string | null = localStorage.getItem(LocalStorageKey.GAME_SAVE)
    if (gameSaveString) {
        gameSaveObjectList.push(JSON.parse(gameSaveString))
    }

    function loadGame(gameSaveObject: BoardGameSaveObject): void {
        const gameSave = new BoardGameSave(gameSaveObject)
        boardGameHolder.assign(gameSave.toBoardGame())

        dispatch(changePage(PageEnum.CLOCK))
    }

    return (
        <Page page={PageEnum.RESUME_GAME}>
            <Navigation previousPage={PageEnum.PORTAL} title="Resume Game" />
            <Container padding="1em 2em">
                {gameSaveObjectList.map(((gameSaveObject, index) => {
                    return <BoardGameSaveCard
                        key={index}
                        saveObject={gameSaveObject}
                        paddingTop={5}
                        cursor="pointer"
                        onClick={() => loadGame(gameSaveObject)}
                    />
                }))}
            </Container>
        </Page>
    )
}
