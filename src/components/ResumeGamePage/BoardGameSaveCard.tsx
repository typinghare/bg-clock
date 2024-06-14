import { BoardGameSaveObject } from '../../game'
import { Box, Card, CardBody, CardProps, Image } from '@chakra-ui/react'
import bannerGo from '../../assets/img/banner-go.jpg'
import moment from 'moment'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

export function BoardGameSaveCard(props: BoardGameSaveCardProps) {
    const { saveObject, ...otherProps } = props

    return (
        <Card
            padding="0 !important"
            direction="column"
            {...otherProps}
        >
            <Image
                maxWidth="100%"
                src={bannerGo}
                alt="Go Banner"
            />
            <CardBody padding="0.5em !important" fontSize="0.875rem">
                <Box fontWeight="bold">
                    {moment(saveObject.timestamp).format('MMMo DD, YYYY')}
                </Box>
                {saveObject.players.map(player => (
                    <div>
                        &lt;{player.role}&gt;&nbsp;
                        {HourMinuteSecond.of(player.remainingTime).toString()}
                    </div>
                ))}
            </CardBody>
        </Card>
    )
}

export interface BoardGameSaveCardProps extends CardProps {
    saveObject: BoardGameSaveObject
}
