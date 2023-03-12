export class FullScreen {
    private readonly _element: HTMLElement;

    public constructor(element: HTMLElement | null) {
        if (element === null) {
            throw new Error('Fail to create fullscreen instance. Element given is null.');
        }

        this._element = element;
    }

    public start(): void {
        if (this._element.requestFullscreen) {
            this._element.requestFullscreen().then();
            // @ts-ignore
        } else if (this._element.webkitRequestFullscreen) {
            /* Safari */
            // @ts-ignore
            this._element.webkitRequestFullscreen().then();
            // @ts-ignore
        }
    }

    public close(): void {
        if (document.exitFullscreen) {
            document.exitFullscreen().then();
            // @ts-ignore
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            // @ts-ignore
            document.webkitExitFullscreen();
        }
    }
}