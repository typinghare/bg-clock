import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_2_Beta extends Changelog {
    public constructor() {
        super('2024.2 Beta', moment('06-13-2024', 'MM-DD-YYYY').toDate())

        this.added(<span>The functionality of pausing and resuming the game.</span>)
        this.added(
            <span>The functionality of customizing settings (including game settings) values.</span>)
        this.improved(<span>Now all audios are loaded once.</span>)
        this.improved(<span>Better the tap audio.</span>)
        this.fixed(<span>Fixed an issue where audios were not played sometimes.</span>)
    }
}
