import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_2_Beta extends Changelog {
    public constructor() {
        super('2024.2 Beta', moment('1206-13-2024', 'MM-DD-YYYY').toDate())

        this.added(<span>Resume functionality</span>)
        this.improved(<span>Now all audios are loaded once.</span>)
        this.improved(<span>Better the tap audio.</span>)
    }
}
