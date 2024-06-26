import screenfull from 'screenfull'
import NoSleep from '@zakj/no-sleep'

/**
 * Enables full screen.
 */
export function enableFullScreen(): void {
    screenfull.request().then().catch(e => {
        console.log(e)
    })
}

export const noSleep = new NoSleep()
