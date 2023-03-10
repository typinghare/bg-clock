import { FunctionComponent } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, BoxProps, Typography } from '@mui/material';

export type OptionAccordionProps = BoxProps & {}

/**
 * @component
 */
export const OptionAccordion: FunctionComponent<OptionAccordionProps> = (props: OptionAccordionProps) => {

    const { children } = props;

    return <Accordion>
        <AccordionSummary>
            <Typography>

            </Typography>
        </AccordionSummary>
        <AccordionDetails children={children} />
    </Accordion>;
};