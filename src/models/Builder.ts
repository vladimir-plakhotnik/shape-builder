import { IDraw } from "./IDraw";

export interface IBuilder {
    draw(width: number, height: number): string;
    draw(context: CanvasRenderingContext2D): void;
}

/**
 * Shape builder
 */
export default class Builder implements IBuilder {

    private shapes: IDraw[] = [];

    /**
     * Creates an instance of a shape builder
     * @param shapes Shape array
     */
    constructor(shapes?: IDraw[]) {
        if (shapes) {
            this.shapes = shapes;
        }
    }

    /**
     * Adds a shape
     * @param shapes The shapes
     * @returns The shape builder
     */
    addShapes(...shapes: IDraw[]) {
        this.shapes.push(...shapes);
        return this;
    }

    /**
     * Remove shapes from a shape builder
     * @param quantity A quantity of shapes. Removes all shapes if the quantity is skipped
     * @returns The shape builder
     */
    removeShapes(quantity?: number) {
        if (quantity && this.shapes.length > quantity) {
            this.shapes = this.shapes.slice(0, this.shapes.length - quantity);
        } else {
            this.shapes = [];
        }
        return this;
    }

    /**
     * SVG image code 
     * @param width Image width
     * @param height Image height
     */
    draw(width: number, height: number): string;
    /**
     * Draws image in context
     * @param context Image context
     */
    draw(context: CanvasRenderingContext2D): void;
    draw(widthOrContext: number | CanvasRenderingContext2D, height?: number): string | void {

        if (typeof widthOrContext === "function" || typeof widthOrContext === "object") {
            return this.shapes.forEach(shape => shape.draw(widthOrContext));
        }

        if (typeof widthOrContext === "number" && typeof height === "number") {
            return `<svg width="${widthOrContext}" height="${height}">\n${this.shapes.map(item => item.draw()).join("\n")}\n</svg>`;
        }

        throw new TypeError("Wrong arguments.");
    }
}
