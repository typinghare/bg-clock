import { Box, BoxProps } from '@mui/material'
import { SettingItemType } from './SettingItem'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { IosSwitch } from '../Common/IosSwitch'
import { convertTimeToString } from '../../common/helper'
import { MuiStyle } from '../../common/interfaces'


export interface GeneralSettingValueProps extends BoxProps {
    type: SettingItemType
    value: boolean | HourMinuteSecond | number
    onChange: (...args: any[]) => void
    optionList?: any[]
}

export interface BoolSettingValueProps extends GeneralSettingValueProps {
    type: 'bool'
    value: boolean,
    onChange: (checked: boolean) => void
}

export interface TimeSettingValueProps extends GeneralSettingValueProps {
    type: 'time'
    value: HourMinuteSecond,
    onChange: (newTime: HourMinuteSecond) => void
    optionList?: HourMinuteSecond[]
}

export interface NumberSettingValueProps extends GeneralSettingValueProps {
    type: 'number'
    value: number,
    onChange: (newValue: number) => void
    optionList?: number[]
}

export type SettingValueProps =
    BoolSettingValueProps |
    TimeSettingValueProps |
    NumberSettingValueProps

export function SettingValue(props: SettingValueProps): JSX.Element {
    const { type, value, onChange, ...otherProps } = props

    function InnerElement(): JSX.Element {
        if (type === 'bool') {
            return <IosSwitch
                checked={value as BoolSettingValueProps['value']}
                onChange={onChange as BoolSettingValueProps['onChange']}
            />
        } else if (type === 'time') {
            const style: MuiStyle = {
                fontFamily: 'Digital-7',
                fontSize: '1.25em',
            }

            return (
                <Box sx={style}>
                    {convertTimeToString(value)}
                </Box>
            )
        } else if (type === 'number') {
            const style: MuiStyle = {
                color: 'green',
            }
            return (
                <Box sx={style}>
                    {value.toString()}
                </Box>
            )
        }

        return <Box />
    }

    return (
        <Box display='inline' {...otherProps}>
            <InnerElement />
        </Box>
    )
}