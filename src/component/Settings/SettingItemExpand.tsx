import { Box, Button, Collapse, Stack } from '@mui/material'
import { SettingItemType } from './SettingItem'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { convertTimeToString } from '../../common/helper'

export interface SettingItemExpandProps {
    type: SettingItemType,
    expand: boolean,
    currentValue: any,
    optionList?: any[]
    onValueSelect?: (newValue: any) => void
}

export function SettingItemExpand(props: SettingItemExpandProps): JSX.Element {
    const { type, expand, currentValue, optionList, onValueSelect } = props

    function Content(): JSX.Element {
        if (type === 'time') {
            return (
                <TimeSettingItemExpand
                    currentValue={currentValue as HourMinuteSecond}
                    optionList={optionList as HourMinuteSecond[]}
                    onValueSelect={onValueSelect!}
                />
            )
        } else if (type === 'number') {
            return (
                <NumberSettingItemExpand
                    currentValue={currentValue as number}
                    optionList={optionList as number[]}
                    onValueSelect={onValueSelect!}
                />
            )
        }

        return <Box>Unknown type: [ {type} ].</Box>
    }

    const styles = {
        inner: {
            marginBottom: '1em',
        },
    }

    return (
        <Collapse in={expand} timeout={300} unmountOnExit>
            <Box sx={styles.inner}>
                <Content />
            </Box>
        </Collapse>
    )
}

interface NumberSettingItemExpandProps {
    currentValue: number
    optionList: number[]
    onValueSelect: (newValue: number) => void
}

function NumberSettingItemExpand(props: NumberSettingItemExpandProps): JSX.Element {
    const { currentValue, optionList, onValueSelect } = props

    function handleClickProvider(value: number) {
        return function() {
            onValueSelect(value)
        }
    }

    const buttonList: JSX.Element[] = optionList.map(value => {
        return (
            <Button
                variant={currentValue === value ? 'contained' : 'outlined'}
                key={value.toString()}
                onClick={handleClickProvider(value)}
                children={value}
            />
        )
    })

    return (
        <Stack spacing={2} direction='row'>
            {buttonList}
        </Stack>
    )
}

interface TimeSettingItemExpandProps {
    currentValue: HourMinuteSecond
    optionList: HourMinuteSecond[]
    onValueSelect: (newTime: HourMinuteSecond) => void
}

function TimeSettingItemExpand(props: TimeSettingItemExpandProps): JSX.Element {
    const { currentValue, optionList, onValueSelect } = props

    function handleClickProvider(value: HourMinuteSecond) {
        return function() {
            onValueSelect(value)
        }
    }

    const buttonList: JSX.Element[] = optionList.map(value => {
        return (
            <Button
                variant={currentValue === value ? 'contained' : 'outlined'}
                key={value.toString()}
                onClick={handleClickProvider(value)}
                children={convertTimeToString(value)}
            />
        )
    })

    return (
        <Stack spacing={2} direction='row'>
            {buttonList}
        </Stack>
    )
}