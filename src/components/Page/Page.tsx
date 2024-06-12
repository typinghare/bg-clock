import { BoxProps, Grid, GridItem, SystemStyleObject } from '@chakra-ui/react'
import { selectPage, useAppSelector } from '../../redux'

export function Page(props: PageProps) {
    const { children, page } = props
    const currentPage: PageEnum = useAppSelector(selectPage)

    return (
        <Grid
            flexDirection="column"
            display={currentPage === page ? 'flex' : 'none'}
            height="100vh"
            width="100vw"
            overflowX="hidden"
            overflowY="auto"
        >
            <GridItem
                flexDirection="column"
                height="100%"
                width="100%"
                maxWidth="75vh"
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
    // eslint-disable-next-line no-unused-vars
    PORTAL = 0,
    // eslint-disable-next-line no-unused-vars
    SETTINGS = 1,
    // eslint-disable-next-line no-unused-vars
    RESUME_GAME = 2,
    // eslint-disable-next-line no-unused-vars
    GAME_SELECTION = 3,
    // eslint-disable-next-line no-unused-vars
    GAME_SETTINGS = 4,
    // eslint-disable-next-line no-unused-vars
    CLOCK = 5,
    // eslint-disable-next-line no-unused-vars
    ABOUT = 6
}

/**
 * Default page.
 */
export const DEFAULT_PAGE = PageEnum.PORTAL
