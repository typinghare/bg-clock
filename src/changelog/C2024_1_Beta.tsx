import { Changelog } from './Changelog'
import moment from 'moment'

export class C2024_1_Beta extends Changelog {
    public constructor() {
        super(
            '2024.1 Beta',
            moment('12-25-2023', 'MM-DD-YYYY').toDate(),
        )

        this.add('added', <span>Added an About page encompassing app instruction and changelog.</span>)
        this.add('added', <span>Added countdown audio to remind players.</span>)
        this.add('added', <span>Time control description is added.</span>)

        this.add('improved', <span>Refactored the app with Vite and Chakra.</span>)
        this.add('improved', <span>Redesigned a new UI.</span>)
        this.add('improved', <span>Used game core to refactor the clock system.</span>)

        this.add('fixed', <span>Fixed an issue where two clocks do not run independently.</span>)
    }
}