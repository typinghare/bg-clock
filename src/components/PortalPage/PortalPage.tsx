import { Page, PageEnum } from '../Page'
import { Box, Button, SystemStyleObject } from '@chakra-ui/react'
import { changePage, useAppDispatch } from '../../redux'

export function PortalPage() {
    return (
        <Page page={PageEnum.PORTAL}>
            <Box sx={portalPageContainerStyles}>
                <PortalButton text={'New Game'} page={PageEnum.GAME_SELECTION} />
                <PortalButton text={'Resume Game'} page={PageEnum.RESUME_GAME} />
                <PortalButton text={'Settings'} page={PageEnum.SETTINGS} />
                <PortalButton text={'About'} page={PageEnum.ABOUT} />
            </Box>
        </Page>
    )
}

const portalPageContainerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    gap: '3rem',
    padding: '1rem',
    justifyContent: 'center',
    height: '100%',

    '& > button': {
        fontSize: '1.5em',
    },
}

function PortalButton(props: PortalButtonProps) {
    const { text, page } = props
    const dispatch = useAppDispatch()

    function handleClick() {
        dispatch(changePage(page))
    }

    return (
        <Button
            variant="solid"
            colorScheme="green"
            onClick={handleClick}
        >
            {text}
        </Button>
    )
}

interface PortalButtonProps {
    text: string
    page: PageEnum
}
