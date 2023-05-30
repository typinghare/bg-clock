import { GameType } from '../redux/slice/GameSlice'
import {
    ChessGameSupplierMap,
    ChessGameTimeControl,
    GameSupplierMap,
    GameTimeControl,
    GoGameSupplierMap,
    GoGameTimeControl,
} from '@typinghare/board-game-clock-core'

export const GameTimeControls: { [K in GameType]: GameTimeControl<any> } = {
    GoGame: GoGameTimeControl,
    ChessGame: ChessGameTimeControl,
}

export const GameSupplierMaps: { [K in GameType]: GameSupplierMap<any> } = {
    GoGame: GoGameSupplierMap,
    ChessGame: ChessGameSupplierMap,
}

