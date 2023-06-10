import { Box, BoxProps } from '@mui/material'

export interface ScrollableProps extends BoxProps {

}

export const Scrollable = function(props: ScrollableProps): JSX.Element {
    const { children } = props
    const styles = {
        root: {
            display: 'block !important',
            overflowY: 'scroll !important',
            height: '2000px !important',
        },
        // content: {
        //     overflowY: 'scroll',
        //     height: '100%',
        // },
    }

    return <Box sx={styles.root}>
        {/*<Box sx={styles.content} className='content'>  </Box>*/}
        {children}
    </Box>
}