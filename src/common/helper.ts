import screenfull from 'screenfull'

/**
 * Enables full screen.
 */
export function enableFullScreen(): void {
    screenfull.request().then().catch(e => {
        console.log(e)
    })
}
