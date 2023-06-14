import { useToggle } from '../hook/Toggle'
import { GameSettingsHeader } from './GameSettingsHeader'
import { PlayerSettingsSection } from './PlayerSettingsSection'
import { AdvancedSettingsSection } from './AdvancedSettingsSection'
import {
    Game,
    GameHolder,
    GameSettingProperties,
    StandardGameSettings,
} from '@typinghare/board-game-clock-core'
import { SettingContainer } from '@typinghare/settings'

export interface GameSettingsContentProps {
    gameHolder: GameHolder<any>
}

export function GameSettingsContent(props: GameSettingsContentProps): JSX.Element {
    const { gameHolder } = props
    const [signal, toggleSignal] = useToggle()
    const game: Game = gameHolder.game

    const playerSynchronized: boolean = (game.settings as SettingContainer<StandardGameSettings, GameSettingProperties>)
        .getSetting('synchronizePlayerSettings').value

    return (
        <>
            <GameSettingsHeader
                gameHolder={gameHolder}
            />

            <PlayerSettingsSection
                gameHolder={gameHolder}
                player={game.getPlayer('A')}
                signal={signal}
                onSettingChange={toggleSignal}
                playerSynchronized={playerSynchronized}
            />

            <PlayerSettingsSection
                gameHolder={gameHolder}
                player={game.getPlayer('B')}
                signal={signal}
                onSettingChange={toggleSignal}
                playerSynchronized={playerSynchronized}
                display={playerSynchronized ? 'none' : 'block'}
            />

            <AdvancedSettingsSection
                game={game}
                signal={signal}
                onSettingChange={toggleSignal}
            />
        </>
    )
}