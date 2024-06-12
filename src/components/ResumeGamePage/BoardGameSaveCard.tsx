import { BoardGameSaveObject } from '../../game'
import { Card, CardBody, Heading } from '@chakra-ui/react'
import moment from 'moment'

export function BoardGameSaveCard(props: BoardGameSaveCardProps) {
    const { saveObject } = props

    return (
        <Card>
            <CardBody>
                <Heading>
                    Go Game
                </Heading>
                {moment(saveObject.timestamp).format('MMo DD, YYYY')}
            </CardBody>
        </Card>
    )
}

export interface BoardGameSaveCardProps {
    saveObject: BoardGameSaveObject
}
