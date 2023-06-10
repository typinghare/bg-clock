import { Box } from '@mui/material'
import { PageProps } from './Page'

export interface GameSelectPageProps extends PageProps {

}

export const GameSelectPage = function(props: GameSelectPageProps): JSX.Element {
    const { isDisplay } = props
    const style = {
        display: isDisplay ? 'block' : 'none',
        backgroundColor: '#999999',
        overflowY: 'scroll',
        height: '100%', // Set the height of the parent container to 100% of its parent
        // minHeight: 0,
    }

    const array = []
    for (let i = 0; i < 50; i++) {
        array.push(i)
    }

    return <Box sx={style}>
        {array.map(number => <Box key={number} sx={{ height: '2em' }}>{number}</Box>)}
    </Box>
}