import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

/**
 * Expandable container.
 */
export function ExpandableContainer(props: ExpandableContainerProps) {
    const { expanded, title, onExpandButtonClick, children } = props

    return (
        <Accordion index={expanded ? [0] : []}>
            <AccordionItem>
                <h2>
                    <AccordionButton onClick={onExpandButtonClick}>
                        <Box as="b" flex="1" textAlign="left">
                            {title}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel padding="0.5em">
                    {children}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export interface ExpandableContainerProps {
    expanded: boolean
    title: ReactNode
    onExpandButtonClick: () => void
    children: ReactNode
}
