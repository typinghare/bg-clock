import { Changelog } from './Changelog'
import { C2024_1_Beta } from './C2024_1_Beta'
import { C2023_1 } from './C2023_1'

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
].forEach(changelog => {
    Changelogs.addChangelog(changelog)
})
