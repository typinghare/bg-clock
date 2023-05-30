import React from 'react'
import { Box, BoxProps } from '@mui/material'

export type SettingsSectionProps = BoxProps & {
    title?: string
}

export const SettingsSection: React.FC<SettingsSectionProps> = function(props): JSX.Element {
    const { title, children } = props

    const titleStyle: React.CSSProperties = {
        color: '#999999',
        fontSize: '0.9em',
        marginLeft: '0.8em',
        marginBottom: '0.4em',
    }

    const childrenContainerStyle: React.CSSProperties = {
        borderRadius: '0.5em',
        backgroundColor: '#FAFAFA',
    }

    return <Box sx={{ marginBottom: '1.25em' }}>
        <Box sx={titleStyle}>{title}</Box>
        <Box sx={childrenContainerStyle}>
            {children}
        </Box>
    </Box>
}