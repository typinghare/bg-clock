import { BoardGame } from '../BoardGame'

/**
 * Board game audio controller.
 */
export class BoardGameAudio {
    /**
     * Creates a board game audio controller.
     * @param boardGame The board game creating this controller.
     */
    public constructor(
        protected boardGame: BoardGame
    ) {
    }


}