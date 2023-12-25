import { Changelog } from './Changelog'
import moment from 'moment'

export class C2023_1 extends Changelog {
    public constructor() {
        super(
            '2023.1',
            moment('07-20-2023', 'MM-DD-YYYY').toDate(),
        )

        this.add('added', 'A game selection page that allows users to select a game.')
        this.add('added', 'A game settings page that allows users to customize game settings.')
        this.add('added', 'A clock page that contains two big time displays.')
    }
}