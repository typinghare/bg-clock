import { Box, BoxProps } from '@chakra-ui/react'
import { useState } from 'react'
import { Holder } from '@typinghare/holder'

const LEFT_MOUSE_BUTTON = 0

export function LongPressBox(props: LongPressBoxProps) {
    const {
        intervalMs = 100,
        intervalCallback,
        timeoutMs = 500,
        timeoutCallback,
        mouseUpCallback,
        children,
        ...otherProps
    } = props
    const [isPressing, setIsPressing] = useState<boolean>(false)
    const [intervalHandle, setIntervalHandle] = useState<number | null>(null)
    const durationMsHolder = Holder.of<number>(0)

    function handlePressDown() {
        setIsPressing(true)

        if (intervalHandle == null) {
            setIntervalHandle(setInterval(() => {
                const durationMs = durationMsHolder.getOrDefault(0)
                if (durationMs > timeoutMs) {
                    // Invoke timeout callback function
                    timeoutCallback(durationMs, timeoutMs)

                    // Clear interval handle and release the isPressing flag
                    setIntervalHandle((intervalHandle) => {
                        if (intervalHandle) clearInterval(intervalHandle)
                        return null
                    })
                } else {
                    if (intervalCallback) {
                        intervalCallback(durationMs, timeoutMs)
                    }
                }

                durationMsHolder.assign(durationMs + intervalMs)
            }, intervalMs))
        }
    }

    function handlePressUp() {
        if (mouseUpCallback) mouseUpCallback(durationMsHolder.getOrDefault(0), timeoutMs)

        // Clear interval handle and release the isPressing flag
        setIntervalHandle(intervalHandle => {
            if (intervalHandle) clearInterval(intervalHandle)
            return null
        })
        setIsPressing(false)

        // Reset the durationMs
        durationMsHolder.assign(0)
    }

    function handleMouseDown(event: MouseEvent) {
        if (event.button !== LEFT_MOUSE_BUTTON || isPressing) return
        handlePressDown()
    }

    function handleMouseUp(event: MouseEvent) {
        if (event.button !== LEFT_MOUSE_BUTTON || !isPressing) return
        handlePressUp()
    }

    return (
        <Box
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handlePressDown}
            onTouchEnd={handlePressUp}
            onTouchCancel={handlePressUp}
            {...otherProps}
        >
            {children}
        </Box>
    )
}

export interface LongPressBoxProps extends BoxProps {
    intervalMs?: number,
    intervalCallback?: (duration: number, timeout: number) => void
    timeoutMs?: number,
    timeoutCallback: (duration: number, timeout: number) => void
    mouseUpCallback?: (duration: number, timeout: number) => void
}
