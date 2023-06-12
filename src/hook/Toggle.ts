import { useState } from 'react'

/**
 * useToggle is a custom hook that provides a boolean value and functions
 * to toggle the value and set it explicitly.
 *
 * @param initialValue - The initial value of the toggle (default: true).
 * @returns {[boolean, () => void, (value: boolean) => void]} An array containing
 * the current value, toggle function, and setter function.
 * @example [on, toggle] = useToggle(false)
 */
export function useToggle(initialValue: boolean = true): [boolean, () => void, (value: boolean) => void] {
    const [on, setOn] = useState<boolean>(initialValue);

    /**
     * toggle is a callback function that toggles the current value
     * using the setOn function from useState.
     */
    const toggle = (): void => {
        setOn((prevOn) => !prevOn);
    };

    /**
     * setOnValue is a callback function that explicitly sets the value
     * of the toggle using the setOn function from useState.
     *
     * @param value - The new value to set.
     */
    const setOnValue = (value: boolean): void => {
        setOn(value);
    };

    return [on, toggle, setOnValue];
}