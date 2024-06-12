import { ReactNode } from 'react'

/**
 * Changelog object.
 */
export abstract class Changelog {
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
    protected constructor(
        // eslint-disable-next-line no-unused-vars
        private readonly version: ChangelogVersion,
        // eslint-disable-next-line no-unused-vars
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

    public added(item: ReactNode): void {
        this.add('added', item)
    }

    public improved(item: ReactNode): void {
        this.add('improved', item)
    }

    public fixed(item: ReactNode): void {
        this.add('fixed', item)
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
