import { Page } from './Page'
import { PageEnum, switchPage } from '../redux/slice/PageSlice'
import bannerChess from '../assets/images/banner-chess.png'
import bannerGo from '../assets/images/banner-go.jpg'
import { MuiStyles } from '../common/interfaces'
import { Box } from '@mui/material'
import { useAppDispatch } from '../redux/hooks'
import { changeGameType } from '../redux/slice/GameSlice'
import { StandardGameType } from '@typinghare/board-game-clock-core'

export function GameSelectPage(): JSX.Element {
    const dispatch = useAppDispatch()

    function handleClickProvider(gameType: StandardGameType) {
        return function() {
            dispatch(changeGameType(gameType))
            dispatch(switchPage(PageEnum.GAME_SETTINGS))
        }
    }

    const styles: MuiStyles<'container' | 'bannerChess' | 'bannerGo'> = {
        container: {
            height: '100%',
            width: '100%',
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
        },
        bannerChess: {
            flex: 2,
            cursor: 'pointer',
            '& img': {
                maxWidth: 'calc(100% - 2em)',
                maxHeight: '100%',
            },
        },
        bannerGo: {
            flex: 2,
            cursor: 'pointer',
            '& img': {
                maxWidth: 'calc(100% - 2em)',
                maxHeight: '100%',
            },
        },
    }

    return (
        <Page pageIndex={PageEnum.GAME_SELECT}>
            <Box sx={styles.container}>
                <Box
                    sx={styles.bannerChess}
                    onClick={handleClickProvider('Chess')}
                >
                    <img src={bannerChess} alt={'Chess Banner'} />
                </Box>
                <Box
                    sx={styles.bannerGo}
                    onClick={handleClickProvider('Go')}
                >
                    <img src={bannerGo} alt={'Go Banner'} />
                </Box>
            </Box>
        </Page>
    )
}