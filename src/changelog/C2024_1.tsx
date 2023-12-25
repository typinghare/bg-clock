import { Changelog } from './Changelog'
import moment from 'moment'

export class C2024_1 extends Changelog {
    public constructor() {
        super(
            '2024.1 Beta',
            moment('12-25-2023', 'MM-DD-YYYY').toDate(),
        )

        this.add('added', 'What the fuck')
    }
}