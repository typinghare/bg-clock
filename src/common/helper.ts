import { settings } from './settings'
import screenfull from 'screenfull'

/**
 * Enables full screen.
 */
export function enableFullScreen(): void {
    if (settings.getValue('fullScreen') && screenfull.isEnabled) {
        screenfull.request().then().catch(e => {
            console.log(e)
        })
    }
}
