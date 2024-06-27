import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_2 extends Changelog {
    public constructor() {
        super('2024.2', moment('06-27-2024', 'MM-DD-YYYY').toDate())

        this.added(<span>Added game status label on the Clock Page Ribbon.</span>)
        this.added(<span>Application guide.</span>)
        this.improved(<span>Align center the Clock Page Pause/Resume modal.</span>)
        this.fixed(<span>
            The buttons in Clock Page Pause/Resume modal are disabled based on the game state.
        </span>)
    }
}
