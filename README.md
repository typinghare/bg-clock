# Board Game Clock

https://en.wikipedia.org/wiki/Time_control

## Style Guide

### TypeScript

See [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).

### ReactJS in TypeScript

See [react.dev](https://github.com/reactjs/react.dev)

A complete React component is coded as follows.

~~~tsx
import { Box, BoxProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { MuiStyles } from './interfaces'

// Define the properties of a component above it.
// The name of the properties interface should follow the Pascal naming convention.
// Using `interface` instead of `type` for readability.
// Propeties interface extends BoxProps if you want to expose Box properties for users to customize.
export interface MyComponentProps extends BoxProps {
    myProp: string
}

// The component's name should follow the Pascal naming convention.
// Using functional components instead of outdated class components.
// Using `export function` instead of `export cost = function()` for conciseness.
// Every function should be explicitly assigned a return type, and components are no exception.
// The return type of a component is `JSX.Element`.
export function MyComponent(props: MyComponentProps): JSX.Element {
    // Appying destructing assignment to retrieve properties.
    // For readability, this should be at the very beginning of the function.
    const { myProp, children, ...otherProps } = props

    // Hooks are defined following by properties assignment.
    const [myState, setMyState] = useState(myProp)

    // Then, effects are given.
    useEffect(() => {
        // Effect content...
    }, [])

    // You can define some custom variables and functions in-between.
    function handleSomething(): void {
    }

    // Define styles.
    const styles: MuiStyles<'root' | 'inner'> = {
        root: {
            padding: '1em',
        },
        inner: {
            border: '1px solid #999999',
            borderRadius: '6px',
        },
    }

    // Returns the JSX element.
    return (
        // Using parentheses to align elements.
        <Box {...otherProps} sx={styles.root}>
            <Box sx={styles.inner}> {children} </Box>
        </Box>
    )
}
~~~

