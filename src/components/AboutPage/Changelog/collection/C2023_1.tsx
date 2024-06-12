import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2023_1 extends Changelog {
    public constructor() {
        super('2023.1', moment('07-20-2023', 'MM-DD-YYYY').toDate())

        this.added(<span>A game selection page allowing users to select a game.</span>)
        this.added(<span>A game settings page allowing users to customize game settings.</span>)
        this.added(<span>A clock page containing two big time displays.</span>)
    }
}
