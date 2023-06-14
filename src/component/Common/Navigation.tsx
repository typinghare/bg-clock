import { PageEnum, switchPage } from '../../redux/slice/PageSlice'
import { Box, BoxProps, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useAppDispatch } from '../../redux/hooks'
import { MuiStyles } from '../../common/interfaces'

export interface AppNavigationProps extends BoxProps {
    previousPage?: PageEnum
    title: string
    titleCenter?: boolean
}

export function Navigation(props: AppNavigationProps): JSX.Element {
    const { previousPage, title, titleCenter = false } = props
    const dispatch = useAppDispatch()

    function handlePreviousButtonClick() {
        dispatch(switchPage(previousPage))
    }

    const styles: MuiStyles<'root' | 'iconButton' | 'icon' | 'title'> = {
        root: {
            backgroundColor: '#1565c0',
            display: 'flex',
            height: '2.5rem',
            alignItems: 'center',
            padding: '0.25rem 0',
            paddingLeft: '1rem',
        },
        iconButton: {
            display: 'inline',
            color: 'whitesmoke',
        },
        icon: {
            fontSize: '75%',
        },
        title: {
            display: 'inline',
            color: 'whitesmoke',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: titleCenter ? 'center' : 'left',
            flexGrow: 1,
            flexShrink: 1,
        },
    }

    return (
        <Box sx={styles.root}>
            {previousPage !== undefined && <IconButton sx={styles.iconButton} onClick={handlePreviousButtonClick}>
                <ArrowBackIosIcon sx={styles.icon} />
            </IconButton>}

            <Box sx={styles.title}>
                {title}
            </Box>
        </Box>
    )
}