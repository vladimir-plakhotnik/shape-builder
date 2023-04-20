/**
 * Transform Record Object
 */
export default class Transform {

    constructor(public readonly object: Record<string, unknown>) { }

    /**
     * Filters properties
     * @param properties Array of excluded properties
     * @returns Filtered object
     */
    exclude(properties: string[]): Record<string, unknown> {
        return Object.keys(this.object)
            .filter((property) => !properties.includes(property))
            .reduce((result, property) => {
                result[property] = this.object[property];
                return result;
            }, {} as Record<string, unknown>);
    }

    /**
     * Filters properties
     * @param properties List of allowed properties
     * @returns Filtered object
     */
    include(properties: string[]): Record<string, unknown> {
        return Object.keys(this.object)
            .filter((property) => properties.includes(property))
            .reduce((result, property) => {
                result[property] = this.object[property];
                return result;
            }, {} as Record<string, unknown>);
    }

    /**
     * Stringify object
     * @returns Text
     */
    stringify(): string {
        let result = "";
        for (const property in this.object) {
            result += `${property}:${this.object[property]}; `;
        }
        return result.trim();
    }

    /**
     * Stringify object values
     * @returns Text
     */
    values(): string {
        let result = "";
        for (const property in this.object) {
            result += `${this.object[property]} `;
        }
        return result.trim();
    }

    /**
     * Parses text
     * @param text Source text
     * @returns Parsed object
     */
    static parse(text: string): Record<string, unknown> {
        const pairs = text.trim().split(";").map(item => item.trim());
        const object: Record<string, unknown> = {};
        for (const pair of pairs) {
            const [key, value] = pair.split(":").map(item => item.trim());
            object[key] = value;
        }
        return object;
    }
}
