import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2023_1 extends Changelog {
    public constructor() {
        super('2023.1', moment('07-20-2023', 'MM-DD-YYYY').toDate())

        this.added(<span>
            Introduced a game selection page that allows users to choose their preferred game.
        </span>)
        this.added(<span>
            Added a game settings page for users to customize various game options.
        </span>)
        this.added(<span>Implemented a clock page featuring two large time displays.</span>)
    }
}
