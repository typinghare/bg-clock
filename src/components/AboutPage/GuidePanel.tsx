import { Heading, TabPanel, Text } from '@chakra-ui/react'

/**
 * Instruction panel.
 */
export function GuidePanel() {

    return (
        <TabPanel>
            <Heading as="h2" size="md" marginBottom="0.5em">Introduction</Heading>
            <Text marginBottom="0.5em">
                BG Clock is a board game clock simulator designed for touch screen devices such as
                mobile phones and tablets. Users can create a board game, select a time control,
                configure game settings, and start the game. Currently, it supports two games: Go
                and Chess.
            </Text>
            <Text marginBottom="0.5em">
                After clicking the start button, the Clock Page appears with both players' clocks
                paused. When one player taps their clock, the other player's clock starts running.
                Upon completing their moves, a player taps their clock to pause it, causing the
                other player's clock to resume.
            </Text>
            <Text marginBottom="0.5em">
                The text color indicates the clock's status: black when running, gray when paused,
                and red when time runs out.
            </Text>
            <br />

            <Heading as="h2" size="md" marginBottom="0.5em">Create a New Game</Heading>
            <Text marginBottom="0.5em">
                On the portal page, click "New Game" to navigate to the Game Selection Page. Click
                on the image of a game to proceed. You will then arrive at the Game Settings Page,
                where you can choose a time control. Note that the time control list is collapsed by
                default.
            </Text>
            <Text marginBottom="0.5em">
                Player settings pertain to individual players. Typically, both players have
                identical settings for fairness. However, you can disable <b>Synchronize Player
                Settings</b> in <b>Advanced Settings</b> to configure different settings for each
                player.
            </Text>
            <Text marginBottom="0.5em">
                To change a setting, click on the setting bar to expand it. Select a value or tap
                the Custom button to enter a custom value. Once a value is selected or entered, the
                expanded card will automatically collapse.
            </Text>
            <br />

            <Heading as="h2" size="md" marginBottom="0.5em">Clock Page</Heading>
            <Text marginBottom="0.5em">
                Players can pause or resume the game at any time by tapping the Ribbon, the black
                area between the two clock regions. This action brings up a symmetrical modal where
                you can pause or resume the game. The game's status is also displayed on the Ribbon.
            </Text>
            <br />
        </TabPanel>
    )
}
