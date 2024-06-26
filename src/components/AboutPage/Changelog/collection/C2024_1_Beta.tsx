import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_1_Beta extends Changelog {
    public constructor() {
        super('2024.1 Beta', moment('12-25-2023', 'MM-DD-YYYY').toDate())

        this.added(<span>
            Introduced an <b>About</b> page that includes app instructions and changelog details.
        </span>)
        this.added(<span>Added countdown audio cues to remind players.</span>)
        this.added(<span>
            Users can now view descriptions of time controls by clicking a question mark icon.
        </span>)
        this.improved(<span>
            Refactored the app using <b>Vite</b> and <b>Chakra</b> frameworks.
        </span>)
        this.improved(<span>Redesigned the user interface with a fresh, new look.</span>)
        this.improved(
            <span>Introduced a <b>game core</b> module to overhaul the clock system.</span>)
        this.fixed(<span>Resolved an issue where the two clocks did not run independently.</span>)
    }
}
