export type BasicOptions = {
    [key: string]: any
}

/**
 * @generic <T> option template
 */
export class OptionContainer<T extends BasicOptions> {
    private readonly _options = {} as T;

    /**
     * Returns the value of an option.
     * @param key
     */
    public getOption<K extends keyof T>(key: K): T[K] {
        return this._options[key];
    }

    /**
     * Sets the value of an option.
     * @param key the key of the option to set
     * @param value the corresponding value
     */
    public setOption<K extends keyof T>(key: K, value: T[K]): void {
        this._options[key] = value;
    }
}