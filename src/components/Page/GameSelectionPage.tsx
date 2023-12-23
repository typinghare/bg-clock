import { Page, PageEnum } from './Page'
import { Box } from '@chakra-ui/react'
import { StyleMap } from '../../common/style'
import { Navigation } from '../Navigation'
import { BoardGames, BoardGameType } from '../../game'
import { changePage, pulse, useAppDispatch } from '../../redux'
import bannerGo from '../../assets/img/banner-go.jpg'
import { useBoardGame } from '../../state/useBoardGame'

/**
 * Game selection page.
 */
export function GameSelectionPage() {
    const dispatch = useAppDispatch()
    const [, setGame] = useBoardGame()
    const styles: StyleMap = {
        container: {
            height: 'calc(100% - 4em)',
            width: '100%',
            padding: '2em 1.5em',
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
        },
        bannerGo: {
            flex: 2,
            cursor: 'pointer',
            '& img': {
                maxWidth: 'calc(100% - 3em)',
                maxHeight: '100%',
            },
        },
    }

    function provideClickHandler(boardGameType: BoardGameType) {
        return function() {
            setGame(BoardGames.get(boardGameType))
            dispatch(pulse())
            dispatch(changePage(PageEnum.GAME_SETTINGS))
        }
    }

    return (
        <Page page={PageEnum.GAME_SELECTION}>
            <Navigation previousPage={PageEnum.PORTAL} title="Game Selection" />
            <Box sx={styles.container}>
                <Box
                    sx={styles.bannerGo}
                    onClick={provideClickHandler(BoardGameType.Go)}
                >
                    <img src={bannerGo} alt={'Go Banner'} />
                </Box>
            </Box>
        </Page>
    )
}