import { RefObject, useEffect, useRef } from 'react'

/**
 * Audio.
 */
export function Audio(props: AudioProps) {
    const { signal, src, volume = 1.0 } = props
    const ref = useRef() as RefObject<HTMLAudioElement>

    useEffect(() => {
        const playAudio = async () => {
            if (signal >= 0 && ref.current) {
                const audio = ref.current
                audio.volume = volume
                audio.currentTime = 0

                try {
                    await audio.play()
                } catch (error) {
                    console.error('Error playing audio:', error)
                }
            }
        }

        playAudio().then()
    }, [signal])

    return (
        <audio ref={ref} preload="auto">
            <source src={src} type="audio/mpeg" />
        </audio>
    )
}

/**
 * Audio properties.
 */
export interface AudioProps {
    // The audio will play when the signal changes
    signal: number

    // The file path of the source file.
    src: string

    // Range from 0 to 1
    volume?: number
}