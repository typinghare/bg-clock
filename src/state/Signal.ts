import { useState } from 'react'

export function useSignal(): [boolean, () => void] {
    const [signal, setSignal] = useState<boolean>(true)

    return [signal, (): void => {
        setSignal(signal => !signal)
    }]
}