import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './PeriodDisplay.css';

export type PeriodsDisplayProps = {
    // the periods left
    periods: number

    // whether overturn
    overturn?: boolean
}

const periodsDisplayStyle = (props: PeriodsDisplayProps): React.CSSProperties => {
    const toOverturn: boolean = props.overturn === true;
    const style: React.CSSProperties = toOverturn ?
        { bottom: '3vw', right: '3vw' } :
        { top: '3vw', left: '3vw' };

    if (toOverturn) style['transform'] = 'rotate(180deg)';

    return style;
};

export const PeriodDisplay: FunctionComponent<PeriodsDisplayProps> = (props: PeriodsDisplayProps) => {
    return <Box className='PeriodsDisplay' style={periodsDisplayStyle(props)}>
        <Box className='PeriodsDisplayInner'>{props.periods}</Box>
    </Box>;
};