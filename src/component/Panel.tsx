import React from 'react'
import { Box, BoxProps } from '@mui/material'

export type PanelProps = BoxProps & { readonly isShow: boolean }

/**
 * A full-screen panel.
 * @param props
 * @constructor
 */
export const Panel: React.FC<PanelProps> = function(props): JSX.Element {
    const { isShow, sx, ...otherProps } = props

    const panelStyle: React.CSSProperties = {
        height: '100vh',
        display: isShow ? 'flex' : 'none',
        flexDirection: 'column',
        margin: '0 !important',
        padding: '0 !important',
    } as React.CSSProperties

    Object.assign(panelStyle, sx)

    return <Box sx={panelStyle} {...otherProps} />
}