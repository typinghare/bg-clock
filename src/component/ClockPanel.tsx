import React from 'react'
import { Panel, PanelProps } from './Panel'
import { Box } from '@mui/material'
import { ClockDisplay } from './ClockDisplay'

export type ClockPanelProps = PanelProps & {}

export const ClockPanel: React.FC<ClockPanelProps> = function(props): JSX.Element {
    const { isShow } = props
    
    const sectionStyle: React.CSSProperties = {
        flex: 12,
    }

    const ribbonStyle: React.CSSProperties = {
        flex: 1,
        backgroundColor: '#333333',
    }

    return <Panel isShow={isShow}>
        <Box sx={sectionStyle}><ClockDisplay overturn role={'A'} /></Box>
        <Box sx={ribbonStyle} />
        <Box sx={sectionStyle}><ClockDisplay role={'B'} /></Box>
    </Panel>
}

