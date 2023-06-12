import { useToggle } from '../../hook/Toggle'
import { Box } from '@mui/material'
import { GameSettingsHeader } from '../GameSettingsHeader'
import { PlayerSettingsSection } from '../PlayerSettingsSection'
import { AdvancedSettingsSection } from '../AdvancedSettingsSection'
import { MuiStyles } from '../../common/interfaces'
import { Game, GameHolder, TimeControlType } from '@typinghare/board-game-clock-core'

export interface GameSettingsContentProps {
    gameHolder: GameHolder<any>
    onTimeControlChange: (newTimeControlType: TimeControlType) => void
}

export function GameSettingsContent(props: GameSettingsContentProps): JSX.Element {
    const { gameHolder, onTimeControlChange } = props
    const [signal, toggleSignal] = useToggle()

    function handleTimeControlChange(newTimeControlType: TimeControlType): void {
        onTimeControlChange(newTimeControlType)
    }

    const game: Game = gameHolder.game

    const styles: MuiStyles<'container' | 'title'> = {
        container: {
            height: '100%',
            padding: '1em',
            backgroundColor: '#E5E5E5',
        },
        title: {
            fontSize: '2em',
            marginBottom: '1em',
        },
    }

    return (
        <>
            <Box sx={styles.title}>
                Game Settings
            </Box>
            <GameSettingsHeader
                gameHolder={gameHolder}
                onTimeControlChange={handleTimeControlChange}
            />

            <PlayerSettingsSection
                gameHolder={gameHolder}
                player={game.getPlayer('A')}
                signal={signal}
                onSettingChange={toggleSignal} />

            <PlayerSettingsSection
                gameHolder={gameHolder}
                player={game.getPlayer('B')}
                signal={signal}
                onSettingChange={toggleSignal} />

            <AdvancedSettingsSection
                game={game}
                signal={signal}
                onSettingChange={toggleSignal}
            />
        </>
    )
}