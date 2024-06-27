import screenfull from 'screenfull'
import NoSleep from '@zakj/no-sleep'

/**
 * Enables full screen.
 */
export function enableFullScreen(): void {
    screenfull.request().then().catch(console.log)
}

export const noSleep = new NoSleep()
