import { Page } from './Page'
import { PageEnum, switchPage } from '../redux/slice/PageSlice'
import bannerChess from '../assets/images/banner-chess.png'
import bannerGo from '../assets/images/banner-go.jpg'
import bannerXiangqi from '../assets/images/banner-xiangqi.webp'
import { MuiStyles } from '../common/interfaces'
import { Box, IconButton, Snackbar } from '@mui/material'
import { useAppDispatch } from '../redux/hooks'
import { changeGameType } from '../redux/slice/GameSlice'
import { StandardGameType } from '@typinghare/board-game-clock-core'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import { AppNavigation } from './Common/AppNavigation'

export function GameSelectPage(): JSX.Element {
    const dispatch = useAppDispatch()
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    function handleClickProvider(gameType: StandardGameType | 'Xiangqi') {
        return function() {
            if (gameType === 'Xiangqi') {
                setSnackbarOpen(true)
                return
            }

            dispatch(changeGameType(gameType))
            dispatch(switchPage(PageEnum.GAME_SETTINGS))
        }
    }

    const styles: MuiStyles<'container' | 'bannerChess' | 'bannerGo' | 'bannerXiangqi'> = {
        container: {
            height: 'calc(100% - 4em)',
            width: '100%',
            padding: '2em 1.5em',
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
        },
        bannerChess: {
            flex: 2,
            cursor: 'pointer',
            '& img': {
                maxWidth: 'calc(100% - 3em)',
                maxHeight: '100%',
            },
        },
        bannerGo: {
            flex: 2,
            cursor: 'pointer',
            '& img': {
                maxWidth: 'calc(100% - 3em)',
                maxHeight: '100%',
            },
        },
        bannerXiangqi: {
            flex: 2,
            cursor: 'pointer',
            '& img': {
                maxWidth: 'calc(100% - 3em)',
                maxHeight: '100%',
            },
        },
    }

    function handleSnackbarClose() {
        setSnackbarOpen(false)
    }

    return (
        <Page pageIndex={PageEnum.GAME_SELECT}>
            <AppNavigation
                previousPage={PageEnum.PORTAL}
                title='Game Select'
            />
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

                {/*<Box*/}
                {/*    sx={styles.bannerXiangqi}*/}
                {/*    onClick={handleClickProvider('Xiangqi')}*/}
                {/*>*/}
                {/*    <img src={bannerXiangqi} alt={'Xiangqi Banner'} />*/}
                {/*</Box>*/}

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                    message='Xiangqi clock has not yet been developed.'
                    action={<IconButton
                        size='small'
                        aria-label='close'
                        color='inherit'
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize='small' />
                    </IconButton>}
                />
            </Box>
        </Page>
    )
}