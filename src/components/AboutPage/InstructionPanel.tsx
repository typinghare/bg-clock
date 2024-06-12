import { Alert, Box, TabPanel } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

/**
 * Instruction panel.
 */
export function InstructionPanel() {
    return (
        <TabPanel>
            <Alert status="warning">
                <WarningIcon />
                <Box as="span" paddingLeft={3}> Will accomplish it when my procrastination is cured.</Box>
            </Alert>
        </TabPanel>
    )
}
