import { ReactNode } from 'react'

/**
 * Changelog object.
 */
export class Changelog {
    /**
     * Sections.
     * @private
     */
    private readonly sections: ChangelogSections = {
        added: [],
        improved: [],
        fixed: [],
    }

    /**
     * Creates a changelog.
     * @param version The version label.
     * @param date The release date.
     */
    public constructor(
        private readonly version: ChangelogVersion,
        private readonly date: Date,
    ) {
    }

    /**
     * Adds an item.
     * @param sectionName The section that the item belongs to.
     * @param item The item to add.
     */
    public add<K extends keyof ChangelogSections>(sectionName: K, item: ReactNode): void {
        this.sections[sectionName].push(item)
    }

    /**
     * Gets a section.
     * @param sectionName The name of the section.
     */
    public getSection<K extends keyof ChangelogSections>(sectionName: K): ChangelogSections[K] {
        return this.sections[sectionName]
    }

    /**
     * Returns the version.
     */
    public getVersion(): ChangelogVersion {
        return this.version
    }

    /**
     * Returns the date.
     */
    public getDate(): Date {
        return this.date
    }
}

/**
 * Changelog sections type.
 */
export interface ChangelogSections {
    added: ReactNode[]
    improved: ReactNode[]
    fixed: ReactNode[]
}

export type ChangelogVersion = string