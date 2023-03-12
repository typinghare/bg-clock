import React, { FunctionComponent } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, BoxProps, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type OptionAccordionProps = BoxProps & {
    summaryId: string,
    title: string,
    expanded?: boolean
}

/**
 * @component A brief encapsulation for accordion.
 */
export const OptionAccordion: FunctionComponent<OptionAccordionProps> = (props: OptionAccordionProps) => {
    const { summaryId, title, children } = props;

    const [expanded, setExpanded] = React.useState(props.expanded);

    const summaryOnClickEvent = () => {
        setExpanded(!expanded);
    };

    return <Accordion expanded={expanded} sx={{ width: '100%' }}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={summaryId}
            onClick={summaryOnClickEvent}
            sx={{ fontSize: '1.25em', fontWeight: 'bold' }}
        >
            <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails children={children} />
    </Accordion>;
};