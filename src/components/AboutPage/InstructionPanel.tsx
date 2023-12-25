import { Alert, Box, TabPanel } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

/**
 * Instruction.
 */
export function InstructionPanel() {
    return (
        <TabPanel>
            <Alert status="warning">
                <WarningIcon />
                <Box as="span" pl={3}> Will accomplish it when my procrastination is cured.</Box>
            </Alert>
        </TabPanel>
    )
}