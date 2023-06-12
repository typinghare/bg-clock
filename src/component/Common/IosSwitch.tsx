import { styled, Switch, SwitchProps } from '@mui/material'
import { ChangeEvent, useState } from 'react'

export interface IosSwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

const StyledIosSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}))

/**
 * An iOS-style switch component.
 * @link https://www.npmjs.com/package/ios-switch-material-ui
 */
export function IosSwitch(props: IosSwitchProps): JSX.Element {
    const { checked: initialChecked, onChange } = props
    const [checked, setChecked] = useState(initialChecked)

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newChecked: boolean = event.target.checked
        setChecked(newChecked)
        onChange(newChecked)
    }

    return (
        <StyledIosSwitch
            checked={checked}
            onChange={handleChange}
        />
    )
}