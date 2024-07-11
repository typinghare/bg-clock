import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_3 extends Changelog {
    public constructor() {
        super('2024.3', moment('07-20-2024', 'MM-DD-YYYY').toDate())

        this.added(<span>Long pressing either clocks can enable full screen.</span>)
        this.added(<span>Long pressing ribbon can pause/resume the game.</span>)
        this.improved(<span>Now clicking the ribbon does not display a modal.</span>)
        this.improved(<span>Now Ribbon label displays the state of each player.</span>)
        this.fixed(<span>Fixed a Go Byoyomi time control issue where a period is consumed when
            it first enters Byoyomi.</span>)
    }
}
