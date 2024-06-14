import { DataCollection, Datum } from '@typinghare/extrum'
import { PlayerExtraData, PlayerExtraDataMetadata } from '../../game'
import { Box, BoxProps } from '@chakra-ui/react'
import { settings } from '../../common/settings'

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
    const colors = ['skyblue', 'pink']
    const clockBubbleSize = settings.getValue('bubbleSize')

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors[index % colors.length]}
            height={(clockBubbleSize / 6) + 'rem'}
            width={(clockBubbleSize / 6) * ((content.length + 1) / 2) + 'rem'}
            borderRadius={(clockBubbleSize / 12) + 'rem'}
        >
            <Box fontWeight="bold" fontSize={clockBubbleSize / 10 + 'rem'}>
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
