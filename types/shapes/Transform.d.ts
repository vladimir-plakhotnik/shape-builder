/**
 * Transform Record Object
 */
export default class Transform {
    readonly object: Record<string, unknown>;
    constructor(object: Record<string, unknown>);
    /**
     * Filters properties
     * @param properties Array of excluded properties
     * @returns Filtered object
     */
    exclude(properties: string[]): Record<string, unknown>;
    /**
     * Filters properties
     * @param properties List of allowed properties
     * @returns Filtered object
     */
    include(properties: string[]): Record<string, unknown>;
    /**
     * Stringify object
     * @returns Text
     */
    stringify(): string;
    /**
     * Stringify object values
     * @returns Text
     */
    values(): string;
    /**
     * Parses text
     * @param text Source text
     * @returns Parsed object
     */
    static parse(text: string): Record<string, unknown>;
}
