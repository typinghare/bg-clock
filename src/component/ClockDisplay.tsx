import { Game } from '@typinghare/board-game-clock-core'

export interface ClockDisplayProps {
   game: Game

   // The label of role of this clock display.
   role: 'A' | 'B'

   // Whether the clock is overturn.
   overturn?: boolean
}

export function ClockDisplay(props: ClockDisplayProps): JSX.Element {
   
}