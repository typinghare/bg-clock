import { Changelog } from '../Changelog'
import moment from 'moment'

export class C2024_3 extends Changelog {
    public constructor() {
        super('2024.3', moment('07-20-2024', 'MM-DD-YYYY').toDate())

        this.fixed(<span>Fixed a Go Byoyomi time control issue where a period is consumed when it first enters Byoyomi.</span>)
    }
}
