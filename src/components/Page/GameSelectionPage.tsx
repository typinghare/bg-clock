import { Page, PageEnum } from './Page'
import { Box, Container, Progress } from '@chakra-ui/react'
import { StyleMap } from '../../common/style'
import { Navigation } from '../Navigation'
import { BoardGames, BoardGameType } from '../../game'
import { changePage, notifyBoardGameChanged, useAppDispatch } from '../../redux'
import bannerGo from '../../assets/img/banner-go.jpg'
import bannerChess from '../../assets/img/banner-chess.png'
import { boardGameHolder } from '../../common/holder'
import { useState } from 'react'

/**
 * Game selection page.
 */
export function GameSelectionPage() {
    const dispatch = useAppDispatch()
    const [progressValue, setProgressValue] = useState(0)
    const styles: StyleMap = {
        container: {
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

    function clickHandlerProvider(boardGameType: BoardGameType) {
        return function() {
            boardGameHolder.assign(BoardGames.get(boardGameType))
            dispatch(notifyBoardGameChanged())

            const interval = setInterval(() => {
                setProgressValue(progressValue => progressValue + 5)
            }, 10)

            setTimeout(() => {
                dispatch(changePage(PageEnum.GAME_SETTINGS))

                clearInterval(interval)
                setProgressValue(0)
            }, 300)
        }
    }

    return (
        <Page page={PageEnum.GAME_SELECTION}>
            <Navigation previousPage={PageEnum.PORTAL} title="Game Selection" />

            <Progress
                value={progressValue}
                size="xs"
                colorScheme="green"
                visibility={progressValue === 0 ? 'hidden' : 'visible'}
            />

            <Container paddingY={5} sx={styles.container}>
                <Box
                    sx={styles.bannerGo}
                    onClick={clickHandlerProvider(BoardGameType.Go)}
                >
                    <img src={bannerGo} alt={'Go Banner'} />
                </Box>

                <Box
                    sx={styles.bannerGo}
                    onClick={clickHandlerProvider(BoardGameType.Chess)}
                >
                    <img src={bannerChess} alt={'Chess Banner'} />
                </Box>
            </Container>
        </Page>
    )
}