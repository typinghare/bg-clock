import { useState } from 'react'

/**
 * useSignal is a custom hook that provides a boolean value and a function
 * to toggle the signal.
 * @returns {[boolean, () => void]} An array containing the signal value and
 * the toggle function.
 * @example [signal, toggleSignal] = useSignal()
 */
export function useSignal(): [boolean, () => void] {
    const [signal, setSignal] = useState<boolean>(true)

    /**
     * toggleSignal is a callback function that toggles the signal value
     * using the setSignal function from useState.
     */
    const toggleSignal = (): void => {
        setSignal((prevSignal) => !prevSignal)
    }

    return [signal, toggleSignal]
}