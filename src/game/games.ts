import { PlayerClass } from '@typinghare/board-game-clock-core'
import { CommonBoardGameSettings } from '@typinghare/board-game-clock-common'

export type GameSettings = CommonBoardGameSettings & {
    timeControlMap: Record<string, PlayerClass>
}