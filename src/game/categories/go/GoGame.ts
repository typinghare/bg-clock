import { TwoPlayerBoardGame } from '../../TwoPlayerBoardGame'
import { GoByoyomiTimeControl } from './GoByoyomiTimeControl'
import { TimeControl } from '../../TimeControl'
import { GoYingshiTimeControl } from './GoYingshiTimeControl'

/**
 * Game of Go.
 * @link https://en.wikipedia.org/wiki/Go_(game)
 */
export class GoGame extends TwoPlayerBoardGame {
    public constructor() {
        super([
            new TimeControl(),
            new GoByoyomiTimeControl(),
            new GoYingshiTimeControl(),
        ])

        this.selectTimeControl(this.timeControlList[1])
    }
}