import { RefObject, useEffect, useRef } from 'react'

/**
 * Audio.
 */
export function Audio(props: AudioProps) {
    const { signal, src, volume = 1.0 } = props
    const ref = useRef() as RefObject<HTMLAudioElement>

    useEffect(() => {
        if (signal >= 0 && ref.current) {
            const audio = ref.current
            audio.volume = volume
            audio.currentTime = 0
            audio.play().then()
        }
    }, [signal])

    return (
        <audio ref={ref}>
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