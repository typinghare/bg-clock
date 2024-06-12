import { Changelog } from './Changelog'
import { C2024_1_Beta } from './collection/C2024_1_Beta'
import { C2023_1 } from './collection/C2023_1'
import { C2024_2_Beta } from './collection/C2024_2_Beta'

/**
 * Changelog collection.
 */
export class Changelogs {
    /**
     * Changelog list.
     * @private
     */
    private static changelogList: Changelog[] = []

    /**
     * Returns all changelogs.
     */
    public static getChangelogList(): Changelog[] {
        return [...this.changelogList]
    }

    /**
     * Adds a changelog.
     * @param changelog The changelog to add.
     */
    public static addChangelog(changelog: Changelog): void {
        this.changelogList.push(changelog)
    }
}

// Register all changelog objects here
[
    new C2023_1(),
    new C2024_1_Beta(),
    new C2024_2_Beta(),
].forEach(changelog => {
    Changelogs.addChangelog(changelog)
})
