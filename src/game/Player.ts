import { DataCollection, DataMapping } from '@typinghare/extrum'

/**
 * Game player.
 */
export class Player<
    PS extends PlayerSettings = PlayerSettings
> extends DataCollection<PS, PlayerSettingsMetadata> {
    /**
     * Creates a player.
     * @param role The role of this player.
     * @param playerData Initial player data.
     */
    public constructor(
        private readonly role: Role,
        playerData: DataMapping<PS, PlayerSettingsMetadata>,
    ) {
        super(playerData)
    }
}

/**
 * Player settings.
 */
export type PlayerSettings = {
    [key: string]: unknown
};

/**
 * Player settings metadata.
 */
export interface PlayerSettingsMetadata {
    label: string
}

/**
 * Player role.
 */
export type Role = string