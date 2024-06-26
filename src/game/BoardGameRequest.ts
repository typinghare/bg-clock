/**
 * An abstract class of board game request.
 */
export abstract class BoardGameRequest {
}

/**
 * This request is send to the game event manage when a player taps their section.
 */
export class PlayerTapRequest extends BoardGameRequest {

}

export class PlayerPauseRequest extends BoardGameRequest {

}

export class PlayerResumeRequest extends BoardGameRequest {
}

export class PlayerRunOutTimeRequest extends BoardGameRequest {
}
