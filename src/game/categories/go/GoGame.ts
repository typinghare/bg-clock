import { TwoPlayerBoardGame } from '../../TwoPlayerBoardGame'
import { ByoyomiTimeControl } from './ByoyomiTimeControl'
import { TimeControl } from '../../TimeControl'
import { YingshiTimeControl } from './YingshiTimeControl'

/**
 * Game of Go.
 * @link https://en.wikipedia.org/wiki/Go_(game)
 */
export class GoGame extends TwoPlayerBoardGame {
    public constructor() {
        super([
            new ByoyomiTimeControl(),
            new TimeControl(),
            //  new ByoyomiTimeControl(),
            new YingshiTimeControl(),
        ])
    }
}