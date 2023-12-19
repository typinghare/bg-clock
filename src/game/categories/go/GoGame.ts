import { TwoPlayerBoardGame } from '../../BoardGame'
import { ByoyomiTimeControl } from './ByoyomiTimeControl'

/**
 * Game of Go.
 * @link https://en.wikipedia.org/wiki/Go_(game)
 */
export class GoGame extends TwoPlayerBoardGame {
    public constructor() {
        super([
            new ByoyomiTimeControl(),
        ])
    }
}