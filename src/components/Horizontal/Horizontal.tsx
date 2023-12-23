import { CSSProperties } from 'react'

/**
 * Horizontal rule.
 */
export function Horizontal(props: HorizontalProps) {
    const { margin, width, floatRight = false } = props

    return (
        <div style={{
            margin,
            display: 'flex',
            justifyContent: floatRight ? 'flex-end' : 'flex-start',
        }}>
            <hr style={{ width }} />
        </div>
    )
}

/**
 * Horizontal rule properties.
 */
export interface HorizontalProps {
    margin?: CSSProperties['margin']
    width?: CSSProperties['width']
    floatRight?: boolean
}