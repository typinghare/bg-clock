import { Box, BoxProps } from '@chakra-ui/react'
import { DataCollection, Datum } from '@typinghare/extrum'
import { PlayerExtraData, PlayerExtraDataMetadata } from '../../game'
import { StyleMap } from '../../common/style'

/**
 * Clock bubble container.
 */
export function ClockBubbleContainer(props: ClockBubbleContainerProps) {
    const { playerExtraData, ...boxProps } = props
    const playerExtraDatumList = playerExtraData.getDatumList() as Datum<unknown, PlayerExtraDataMetadata>[]

    function ClockBubbles() {
        const displayedExtraDatumList: Datum<unknown, PlayerExtraDataMetadata>[]
            = playerExtraDatumList.filter(datum => datum.getMeta('isDisplayed'))

        return (displayedExtraDatumList.map((datum, index) => {
            const getDisplayedContent = datum.getMeta('getDisplayedContent')
            if (!getDisplayedContent) {
                throw new Error('getDisplayedContent() function should not be undefined!')
            }

            return (<ClockBubble
                key={index}
                index={index}
                content={getDisplayedContent(datum.getValue())}
            />)
        }))
    }

    return (
        <Box {...boxProps}>
            <ClockBubbles />
        </Box>
    )
}

export function ClockBubble(props: ClockBubbleProps) {
    const { index, content } = props
    const colors = ['skyblue']
    const clockBubbleSize = 15
    const styles: StyleMap = {
        root: {
            backgroundColor: colors[index % colors.length],
            height: (clockBubbleSize / 6) + 'rem',
            width: (clockBubbleSize / 6) * (1 + (content.length - 1) / 2) + 'rem',
            borderRadius: (clockBubbleSize / 12) + 'rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inner: {
            fontWeight: 'bold',
            fontSize: clockBubbleSize / 10 + 'rem',
        },
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.inner}>
                {content}
            </Box>
        </Box>
    )
}

export interface ClockBubbleContainerProps extends BoxProps {
    playerExtraData: DataCollection<PlayerExtraData, PlayerExtraDataMetadata>
}

export interface ClockBubbleProps {
    index: number
    content: string
}