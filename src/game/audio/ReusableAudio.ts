export class ReusableAudio {
    private readonly audioContext: AudioContext = new AudioContext()
    private audioBuffer?: AudioBuffer

    public constructor() {
    }

    public async fetch(url: string): Promise<void> {
        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    }

    public play(): void {
        if (!this.audioBuffer) {
            console.error('Audio buffer is not loaded yet.')
            return
        }

        const source = this.audioContext.createBufferSource()
        source.buffer = this.audioBuffer
        source.connect(this.audioContext.destination)
        source.start()
    }
}
