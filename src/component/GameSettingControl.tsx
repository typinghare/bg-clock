import React, { ChangeEvent } from 'react'
import { Box, BoxProps, MenuItem, Select, Switch, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { convertStringToTime, convertTimeToString } from '../common/helper'
import { Setting } from '@typinghare/settings'

export type GameSettingControlProps = {
    setting: Setting<any, any>
    signal: boolean
    onValueChange?: (newValue: any) => void
}

export const GameSettingControl: React.FC<GameSettingControlProps> = function(props): JSX.Element {
    const { setting, onValueChange } = props

    const type = setting.getProperty('type')
    const label = setting.getProperty('label')
    const description = setting.getProperty('description')
    const options = setting.getProperty('options')

    const [value, setValue] = React.useState(setting.value)

    const InputControl: React.FC = function(): JSX.Element {
        function handleValueChange<T>(newValue: T): void {
            setValue(newValue)

            if (onValueChange) onValueChange(newValue)
        }

        if (type === 'time') {
            return <ExpandableTimeInputControl
                initValue={value}
                onValueChange={handleValueChange}
                options={options as HourMinuteSecond[]}
            />
        } else if (type === 'number') {
            return <ExpandableNumberInputControl
                initValue={value}
                onValueChange={handleValueChange}
                options={options as number[]}
            />
        } else if (type === 'text') {
        } else if (type === 'bool') {
            return <ExpandableBoolInputControl
                initValue={value as boolean}
                onValueChange={handleValueChange}
            />
        }

        return <Box></Box>
    }

    const style: React.CSSProperties = {
        padding: '0.25em 0.75em',
    }

    const formStyle: React.CSSProperties = {
        height: '2.5em',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.15em',
        justifyContent: 'space-between',
    }

    const descriptionStyle: React.CSSProperties = {
        color: '#999999',
        padding: '0 0.25em',
        fontSize: '0.9em',
    }

    return <Box sx={style}>
        <Box sx={formStyle}>
            <Box display='inline'>{label}</Box>
            <Box display='inline'><InputControl /></Box>
        </Box>
        <Typography sx={descriptionStyle}>{description}</Typography>
    </Box>
}

type ExpandableNumberInputControlProps = BoxProps & {
    initValue: number,
    onValueChange: (newValue: number) => void,
    options?: number[]
}

const ExpandableNumberInputControl: React.FC<ExpandableNumberInputControlProps> = function(props): JSX.Element {
    const { initValue, onValueChange, options, sx, ...otherProps } = props
    const [value, setValue] = React.useState(initValue)
    const [expanded, setExpanded] = React.useState(false)

    function handleOuterClick(): void {
        setExpanded(!expanded)
    }

    function handleChange(event: SelectChangeEvent): void {
        const newValue: number = parseFloat(event.target.value)
        setValue(newValue)

        // Invoke callback function.
        onValueChange(newValue)

        // Close expansion.
        setExpanded(false)
    }

    const style: React.CSSProperties = {
        height: '2.5em !important',
    }
    Object.assign(style, sx)

    const expandIconStyle: React.CSSProperties = {
        transform: expanded ? 'rotate(90deg)' : 'rotate(-90deg)',
        verticalAlign: 'middle',
        color: '#999999',
    }

    const selectStyle: React.CSSProperties = {
        marginLeft: '1em',
        height: '2em !important',
    }

    const menuItemArray: JSX.Element[] = []
    if (options !== undefined) {
        options.forEach((option, index) => {
            menuItemArray.push(<MenuItem key={index} value={option}>{option}</MenuItem>)
        })
    }

    return <Box display='inline' sx={style} {...otherProps}>
        <Box display='inline' onClick={handleOuterClick}>
            <Box display='inline' sx={{ alignItems: 'center', color: '#999999' }}>{value}</Box>
            <ExpandLessIcon sx={expandIconStyle} />
        </Box>
        <Box display={expanded ? 'inline' : 'none'}>
            <Select value={value.toString()} onChange={handleChange} sx={selectStyle}>
                {menuItemArray}
            </Select>
        </Box>
    </Box>
}

type ExpandableTimeInputControlProps = BoxProps & {
    initValue: HourMinuteSecond,
    onValueChange: (newValue: HourMinuteSecond) => void,
    options?: HourMinuteSecond[]
}

const ExpandableTimeInputControl: React.FC<ExpandableTimeInputControlProps> = function(props): JSX.Element {
    const { initValue, onValueChange, options, sx, ...otherProps } = props
    const [value, setValue] = React.useState(initValue)
    const [expanded, setExpanded] = React.useState(false)

    function handleOuterClick(): void {
        setExpanded(!expanded)
    }

    function handleChange(event: SelectChangeEvent): void {
        const newValue: HourMinuteSecond = convertStringToTime(event.target.value)
        setValue(newValue)

        // Invoke callback function.
        onValueChange(newValue)

        // Close.
        setExpanded(false)
    }

    const style: React.CSSProperties = {
        height: '2.5em !important',
    }
    Object.assign(style, sx)

    const expandIconStyle: React.CSSProperties = {
        transform: expanded ? 'rotate(90deg)' : 'rotate(-90deg)',
        verticalAlign: 'middle',
        color: '#999999',
    }

    const selectStyle: React.CSSProperties = {
        marginLeft: '1em',
        height: '2em !important',
    }

    const menuItemArray: JSX.Element[] = []
    if (options !== undefined) {
        options.forEach((option, index) => {
            const timeString: string = convertTimeToString(option)
            menuItemArray.push(<MenuItem key={index} value={timeString}>{timeString}</MenuItem>)
        })
    }

    return <Box display='inline' sx={style} {...otherProps}>
        <Box display='inline' onClick={handleOuterClick}>
            <Box display='inline' sx={{ alignItems: 'center', color: '#999999' }}>{convertTimeToString(value)}</Box>
            <ExpandLessIcon sx={expandIconStyle} />
        </Box>
        <Box display={expanded ? 'inline' : 'none'}>
            <Select value={convertTimeToString(value)} onChange={handleChange} sx={selectStyle} size={'small'}>
                {menuItemArray}
            </Select>
        </Box>
    </Box>
}

type ExpandableBoolInputControlProps = BoxProps & {
    initValue: boolean,
    onValueChange: (newValue: boolean) => void,
}

const ExpandableBoolInputControl: React.FC<ExpandableBoolInputControlProps> = function(props): JSX.Element {
    const { initValue, onValueChange, sx, ...otherProps } = props
    const [value, setValue] = React.useState(initValue)

    function handleChange(event: ChangeEvent, checked: boolean): void {
        setValue(checked)

        // Invoke callback function.
        onValueChange(checked)
    }

    const style: React.CSSProperties = {
        height: '3em !important',
    }
    Object.assign(style, sx)

    const switchStyle: React.CSSProperties = {
        marginLeft: '1em',
        height: '2.5em !important',
    }

    return <Box display='inline' sx={style} {...otherProps}>
        <Box display='inline' sx={{ alignItems: 'center', color: '#999999' }}>{value}</Box>
        <Box sx={switchStyle}>
            <Switch checked={value} onChange={handleChange} />
        </Box>
    </Box>
}