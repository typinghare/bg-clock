import React, { FunctionComponent } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import './OptionPanel.css';
import { Panel, PanelProps } from '../panel/Panel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type OptionPanelProps = PanelProps & {};

export const OptionPanel: FunctionComponent<OptionPanelProps> = (props: OptionPanelProps) => {

    return <Panel className='SelectPanel' isShow={true}>
        <Accordion expanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id='panel1bh-header'
            >
                <Typography sx={{ width: '33%' }}> General Settings</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Box>
                    what
                </Box>
            </AccordionDetails>
        </Accordion>
    </Panel>;
    ;
};