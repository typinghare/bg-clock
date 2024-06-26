import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_2_Beta extends Changelog {
    public constructor() {
        super('2024.2 Beta', moment('06-13-2024', 'MM-DD-YYYY').toDate())

        this.added(<span>Implemented the functionality to pause and resume the game.</span>)
        this.added(
            <span>Added customizable settings, including various game settings.</span>)
        this.added(<span>Introduced multiple new app settings items.</span>)
        this.added(<span>Allow users to enable the screen wake lock function.</span>)
        this.improved(<span>All audio files are now preloaded for better performance.</span>)
        this.improved(<span>Enhanced the quality of tap sound effects.</span>)
        this.improved(<span>Improved the changelog interface.</span>)
        this.fixed(<span>Resolved an issue where audios would sometimes not play.</span>)
    }
}
