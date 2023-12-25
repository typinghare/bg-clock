import { TimeControl } from '../../TimeControl'
import { TwoPlayerBoardGame } from '../../TwoPlayerBoardGame'
import { ChessStandardTimeControl } from './ChessStandardTimeControl'

export class ChessGame extends TwoPlayerBoardGame {
    public constructor() {
        super([
            new ChessStandardTimeControl(),
            new TimeControl(),
        ])
    }
}