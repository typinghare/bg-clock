import { Box, ClickAwayListener, Fade, IconButton, Tooltip } from '@mui/material'
import { SettingItemExpand } from './SettingItemExpand'
import { SettingValue } from './SettingValue'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useToggle } from '../../hook/Toggle'
import { MouseEvent, useState } from 'react'
import { MuiStyles } from '../../common/interfaces'

export type SettingItemType = 'bool' | 'time' | 'number'

export interface GeneralSettingItemProps {
    type: SettingItemType
    label: string
    value: boolean | HourMinuteSecond | number
    description: string,
    onChange: (...args: any[]) => void
    optionList?: any[]
}

export interface BoolSettingItemProps extends GeneralSettingItemProps {
    type: 'bool'
    value: boolean
    onChange: (checked: boolean) => void
}

export interface TimeSettingItemProps extends GeneralSettingItemProps {
    type: 'time'
    value: HourMinuteSecond
    onChange: (newTime: HourMinuteSecond) => void
    optionList?: HourMinuteSecond[]
}

export interface NumberSettingItemProps extends GeneralSettingItemProps {
    type: 'number'
    value: number
    onChange: (newValue: number) => void
    optionList?: number[]
}

export type SettingItemProps =
    BoolSettingItemProps |
    TimeSettingItemProps |
    NumberSettingItemProps

export function SettingItem(props: SettingItemProps): JSX.Element {
    const { type, label, value, onChange, optionList, description } = props
    const [expand, setExpand] = useState(false)

    function handleClick(): void {
        setExpand((expand) => !expand)
    }

    function handleChange(newValue: HourMinuteSecond | number): void {
        setExpand(false)
        onChange(newValue as never)
    }

    const styles: MuiStyles = {
        line: {
            display: 'flex',
            alignItems: 'center',
            height: '2.5em',
        },
        label: {
            display: 'inline',
            fontWeight: 'bold',
        },
        value: {
            marginLeft: 'auto',
            marginRight: '0.25em',
        },
    }

    return (
        <>
            <Box sx={styles.line} onClick={handleClick}>
                <Box sx={styles.label}> {label} </Box>
                <Description content={description} />
                <SettingValue
                    {...{ type, value, onChange } as SettingItemProps}
                    sx={styles.value}
                />
            </Box>
            {type === 'time' && <SettingItemExpand
                type='time'
                expand={expand}
                currentValue={value}
                optionList={optionList}
                onValueSelect={handleChange}
            />}
            {type === 'number' && <SettingItemExpand
                type='number'
                expand={expand}
                currentValue={value}
                optionList={optionList}
                onValueSelect={handleChange}
            />}
        </>
    )
}

interface DescriptionProps {
    content?: string
}

function Description(props: DescriptionProps): JSX.Element {
    const { content } = props
    const [open, toggleOpen, setOpen] = useToggle(false)

    if (!content || content.length === 0) {
        return <></>
    }

    function Content(): JSX.Element {
        const style = {
            fontSize: '1rem',
        }
        return <Box sx={style}> {content} </Box>
    }

    function handleOpen(event: MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation()
        toggleOpen()
    }

    function handleClose(): void {
        setOpen(false)
    }

    const styles = {
        icon: {
            fontSize: '1rem',
        },
    }

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Tooltip
                arrow
                title={<Content />}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                disableFocusListener
                disableHoverListener
                disableTouchListener
            >
                <IconButton onClick={handleOpen}>
                    <HelpOutlineIcon sx={styles.icon} />
                </IconButton>
            </Tooltip>
        </ClickAwayListener>
    )
}