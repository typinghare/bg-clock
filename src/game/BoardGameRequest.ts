/**
 * Board game request.
 */
export abstract class BoardGameRequest {
}

/**
 * Player Tap Request.
 */
export class PlayerTapRequest extends BoardGameRequest {
}

/**
 * Player pause request.
 */
export class PlayerPauseRequest extends BoardGameRequest {
}

export class PlayerResumeRequest extends BoardGameRequest {
}

export class PlayerRunOutTimeRequest extends BoardGameRequest {
}