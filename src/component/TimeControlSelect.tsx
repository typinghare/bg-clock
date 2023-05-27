import React from 'react'
import { FormControl, FormControlProps, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

export type TimeControlSelectProps = FormControlProps & {
    initValue: string,
    timeControlOptions: string[],
    onTimeControlSelect: (timeControl: string) => void
}

export const TIME_CONTROL_LABEL = 'Time Control'

export const TimeControlSelect: React.FC<TimeControlSelectProps> = function(props): JSX.Element {
    const { initValue, timeControlOptions, onTimeControlSelect, ...otherProps } = props
    const [value, setValue] = React.useState(initValue)

    function handleChange(event: SelectChangeEvent) {
        const newValue = event.target.value as string
        setValue(newValue)
        onTimeControlSelect(newValue)
    }

    const itemArray: JSX.Element[] = []
    timeControlOptions.forEach(timeControlOption => {
        itemArray.push(<MenuItem key={timeControlOption} value={timeControlOption}>{timeControlOption}</MenuItem>)
    })

    return <FormControl size='small' {...otherProps}>
        <InputLabel id='TimeControlSelectLabel'>{TIME_CONTROL_LABEL}</InputLabel>
        <Select
            sx={{ width: '100%' }}
            labelId={TIME_CONTROL_LABEL}
            value={value}
            label='Time Control'
            onChange={handleChange}
            children={itemArray}
        />
    </FormControl>
}