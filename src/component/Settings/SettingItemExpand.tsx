import { Box, Button, Collapse, Grid, Stack, TextField } from '@mui/material'
import { SettingItemType } from './SettingItem'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { convertTimeToString } from '../../common/helper'
import { MuiStyles } from '../../common/interfaces'
import { useState } from 'react'

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

    const styles: MuiStyles<'inner'> = {
        inner: {
            marginBottom: '1em',
            padding: '0 1em',
            width: 'calc(100% - 2em)',
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
    const [expandValueInput, setExpandValueInput] = useState(false)
    const [customValue, setCustomValue] = useState<string>(currentValue.toString())

    function handleClickProvider(value: number) {
        return function() {
            onValueSelect(value)
        }
    }

    function handleCustomClick() {
        setExpandValueInput((expandValueInput) => !expandValueInput)
    }

    function handleCustomOkButtonClick() {
        const val = parseInt(customValue)
        if (!isNaN(val)) {
            onValueSelect(val)
        }

        setExpandValueInput(false)
    }

    const styles: MuiStyles<'stack' | 'button'> = {
        stack: {
            width: '100%',
        },
        button: {
            width: '100px',
        },
    }

    let hasSelectedValue: boolean = false
    const buttonList: JSX.Element[] = optionList.map(value => {
        if (currentValue === value) {
            hasSelectedValue = true
        }

        return (
            <Button
                key={value.toString()}
                sx={styles.button}
                variant={currentValue === value ? 'contained' : 'outlined'}
                onClick={handleClickProvider(value)}
                children={value}
            />
        )
    })

    buttonList.push(
        <Button
            key={'$custom'}
            sx={styles.button}
            variant={!hasSelectedValue ? 'contained' : 'outlined'}
            onClick={handleCustomClick}
            children={'CUSTOM'}
        />,
    )

    return (
        <>
            <Stack
                spacing={2}
                direction='row'
                useFlexGap
                flexWrap='wrap'
                sx={styles.stack}
            >
                {buttonList}
            </Stack>
            <Collapse in={expandValueInput}>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={10}>
                        <TextField
                            sx={{ width: '100%' }}
                            value={customValue}
                            onChange={(event) => {
                                setCustomValue(event.target.value)
                            }}
                            type='number'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Button
                            sx={{ width: '100%' }}
                            variant='contained'
                            color='success'
                            children='OK'
                            onClick={handleCustomOkButtonClick}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </>
    )
}

interface TimeSettingItemExpandProps {
    currentValue: HourMinuteSecond
    optionList: HourMinuteSecond[]
    onValueSelect: (newTime: HourMinuteSecond) => void
}

function TimeSettingItemExpand(props: TimeSettingItemExpandProps): JSX.Element {
    const { currentValue, optionList, onValueSelect } = props
    const [expandValueInput, setExpandValueInput] = useState(false)

    function handleClickProvider(value: HourMinuteSecond) {
        return function() {
            onValueSelect(value)
        }
    }

    function handleCustomClick() {
        setExpandValueInput((expandValueInput) => !expandValueInput)
    }

    function handleCustomOkButtonClick() {
        setExpandValueInput(false)
    }

    const styles: MuiStyles<'stack' | 'button'> = {
        stack: {
            width: '100%',
        },
        button: {
            width: '100px',
        },
    }

    let hasSelectedValue: boolean = false
    const buttonList: JSX.Element[] = optionList.map(value => {
        const equalToCurrentValue: boolean = currentValue.ms === value.ms
        if (equalToCurrentValue) hasSelectedValue = true

        return (
            <Button
                key={value.toString()}
                sx={styles.button}
                variant={equalToCurrentValue ? 'contained' : 'outlined'}
                onClick={handleClickProvider(value)}
                children={convertTimeToString(value)}
            />
        )
    })

    buttonList.push(
        <Button
            key={'$custom'}
            sx={styles.button}
            variant={!hasSelectedValue ? 'contained' : 'outlined'}
            onClick={handleCustomClick}
            children={'CUSTOM'}
        />,
    )

    return (
        <>
            <Stack
                spacing={2}
                direction='row'
                useFlexGap
                flexWrap='wrap'
                sx={styles.stack}
            >
                {buttonList}
            </Stack>
            <Collapse in={expandValueInput}>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={10} sx={{
                        display: 'flex',
                        flexDirection: 'colum',
                        alignItems: 'center',
                    }}>
                        <Box sx={{ fontSize: '0.75em', paddingLeft: '0.5em' }}>
                            This feature will be implemented later!
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Button
                            sx={{ width: '100%' }}
                            variant='contained'
                            color='success'
                            children='OK'
                            onClick={handleCustomOkButtonClick}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </>
    )
}