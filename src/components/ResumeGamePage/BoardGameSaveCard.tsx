import { BoardGameSaveObject } from '../../game'
import { Card, CardBody, CardProps, Heading } from '@chakra-ui/react'
import moment from 'moment'

export function BoardGameSaveCard(props: BoardGameSaveCardProps) {
    const { saveObject, ...otherProps } = props

    return (
        <Card {...otherProps}>
            <CardBody>
                <Heading>
                    Go Game
                </Heading>
                {moment(saveObject.timestamp).format('MMo DD, YYYY')}
            </CardBody>
        </Card>
    )
}

export interface BoardGameSaveCardProps extends CardProps {
    saveObject: BoardGameSaveObject
}
