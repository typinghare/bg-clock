import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export type BasicSelectChangeHandler = (event: SelectChangeEvent<number>) => void;

export type BasicSelectProps = {
    label: string
    itemList: string[]
    defaultValue?: number
    handleChange: BasicSelectChangeHandler
}

/**
 * @component Basic select.
 */
export const BasicSelect: FunctionComponent<BasicSelectProps> = (props: BasicSelectProps) => {
    const labelId = '1234';
    const selectId = '';
    const { label, itemList, defaultValue, handleChange } = props;
    const [value, setValue] = React.useState(defaultValue);

    const selectHandleChange = (event: SelectChangeEvent<number>) => {
        setValue(event.target.value as number);
        handleChange(event);
    };

    return <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
            labelId={labelId}
            id={selectId}
            label={label}
            value={value}
            onChange={selectHandleChange}
        >
            {itemList.map((item, value) => {
                return <MenuItem key={value} value={value}>{item}</MenuItem>;
            })}
        </Select>
    </FormControl>;
};