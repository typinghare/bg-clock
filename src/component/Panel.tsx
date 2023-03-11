import React, { FunctionComponent } from 'react';
import { Box, BoxProps } from '@mui/material';

export type PanelProps = BoxProps & {
    readonly isShow: boolean
}

const SHOW_DISPLAY_PROPERTY: string = 'flex';
const HIDDEN_DISPLAY_PROPERTY: string = 'none';

const panelStyle = (isShow: boolean): React.CSSProperties => ({
    height: '100%',
    display: isShow ? SHOW_DISPLAY_PROPERTY : HIDDEN_DISPLAY_PROPERTY,
    flexDirection: 'column',
});

/**
 * @component General Panel.
 */
export const Panel: FunctionComponent<PanelProps> = (props: PanelProps) => {
    const { isShow, ...boxProps } = props;
    return <Box style={panelStyle(isShow)} {...boxProps}></Box>;
};