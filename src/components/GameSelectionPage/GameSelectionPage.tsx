import { Page, PageEnum } from '../Page'
import { Box, Container, Image, Progress } from '@chakra-ui/react'
import { Navigation } from '../Navigation'
import { BoardGames, BoardGameType } from '../../game'
import { changePage, notifyBoardGameChanged, useAppDispatch } from '../../redux'
import bannerChess from '../../assets/img/banner-chess.png'
import bannerGo from '../../assets/img/banner-go.jpg'
import { boardGameHolder } from '../../common/holder'
import { useState } from 'react'

/**
 * Game selection page.
 */
export function GameSelectionPage() {
    const dispatch = useAppDispatch()
    const [progressValue, setProgressValue] = useState(0)

    function clickHandlerProvider(boardGameType: BoardGameType) {
        // Simulate a 200ms loading
        const loadingTime = 200
        const dt = 20
        const dp = 100 / (loadingTime / dt)
        return function() {
            const interval = setInterval(() => {
                setProgressValue(progressValue => progressValue + dp)
            }, dt)

            boardGameHolder.assign(BoardGames.get(boardGameType))
            dispatch(notifyBoardGameChanged())

            setTimeout(() => {
                dispatch(changePage(PageEnum.GAME_SETTINGS))
                clearInterval(interval)
                setProgressValue(0)
            }, loadingTime * 1.5)
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

            <Container
                display="flex"
                gap="1rem"
                flexDirection="column"
                padding="1em 2em"
            >
                <Box
                    flex={2}
                    cursor="pointer"
                    onClick={clickHandlerProvider(BoardGameType.Go)}
                >
                    <Image
                        maxWidth="100%"
                        src={bannerGo}
                        alt="Go Banner"
                    />
                </Box>

                <Box
                    flex={2}
                    cursor="pointer"
                    onClick={clickHandlerProvider(BoardGameType.Chess)}
                >
                    <Image
                        maxWidth="100%"
                        src={bannerChess}
                        alt="Chess Banner"
                    />
                </Box>
            </Container>
        </Page>
    )
}
