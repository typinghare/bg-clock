import { StandardGameContainer, StandardGameHolder } from '@typinghare/board-game-clock-core'


export const standardGameContainer = new StandardGameContainer()

export const globalGameHolder: { content: StandardGameHolder | undefined } = {
    content: undefined,
}