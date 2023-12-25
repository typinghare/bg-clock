import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import { StyleMap } from '../../common/style'
import { ReactNode } from 'react'

/**
 * Expandable container.
 */
export function ExpandableContainer(props: ExpandableContainerProps) {
    const { expanded, title, onExpandButtonClick, children } = props
    const styles: StyleMap = {
        panel: {
            padding: '0.5rem',
        },
    }

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
                <AccordionPanel sx={styles.panel}>
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