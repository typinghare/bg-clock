import { BoxProps, Grid, GridItem, SystemStyleObject } from '@chakra-ui/react'
import { selectPage, useAppSelector } from '../../redux'

export function Page(props: PageProps) {
    const { children, page } = props
    const currentPage: PageEnum = useAppSelector(selectPage)

    return (
        <Grid
            display={currentPage === page ? 'flex' : 'none'}
            flexDirection="column"
            margin="0 auto"
            height="100vh"
            width="100vw"
            maxWidth="75vh"
            overflowX="hidden"
            overflowY="auto"
            backgroundColor="white"
        >
            <GridItem
                display="flex"
                flexDirection="column"
                height="100%"
                width="100%"
                margin="0 auto"
            >
                {children}
            </GridItem>
        </Grid>
    )
}

/**
 * Page properties.
 */
export interface PageProps extends BoxProps {
    page: PageEnum
    innerStyle?: SystemStyleObject
}

/**
 * Page enumeration.
 */
export enum PageEnum {
    PORTAL = 0,
    SETTINGS = 1,
    RESUME_GAME = 2,
    GAME_SELECTION = 3,
    GAME_SETTINGS = 4,
    CLOCK = 5,
    ABOUT = 6
}

/**
 * Default page.
 */
export const DEFAULT_PAGE = PageEnum.PORTAL
