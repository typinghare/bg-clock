import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_1_Beta extends Changelog {
    public constructor() {
        super('2024.1 Beta', moment('12-25-2023', 'MM-DD-YYYY').toDate())

        this.added(<span>An <b>About</b> page encompassing app instruction and changelog.</span>)
        this.added(<span>Countdown audio to remind players.</span>)
        this.added(<span>Time controls' descriptions.</span>)
        this.improved(<span>Refactored the app with <b>Vite</b> and <b>Chakra</b>.</span>)
        this.improved(<span>Redesigned a novel UI.</span>)
        this.improved(<span><b>Game core</b> is introduced to refactor the clock system.</span>)
        this.fixed(<span>Fixed an issue where two clocks do not run independently.</span>)
    }
}
