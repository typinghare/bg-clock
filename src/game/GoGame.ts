import { GoBoardGame, GoByoyomiPlayer, GoYingshiPlayer } from '@typinghare/board-game-clock-common'
import { Player, PlayerExtraProperties, PlayerSettings } from '@typinghare/board-game-clock-core'
import { CommonPlayerExtraPropertyProperties } from '@typinghare/board-game-clock-common/src/global'
import { GameSettings } from './games'

export type GoGameSettings = GameSettings & {}

export class GoGame<
    P extends Player<S, PlayerExtraProperties, CommonPlayerExtraPropertyProperties>,
    S extends PlayerSettings = PlayerSettings,
> extends GoBoardGame<GoGameSettings, P, S> {
    override initialize(): void {
        super.initialize()
        this.addSetting('timeControlMap', {
            Byoyomi: GoByoyomiPlayer,
            Yingshi: GoYingshiPlayer,
        })
    }
}