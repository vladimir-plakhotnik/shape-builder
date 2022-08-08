import { IDraw } from "./IDraw";
export interface IBuilder {
    draw(width: number, height: number): string;
    draw(context: CanvasRenderingContext2D): void;
}
/**
 * Shape builder
 */
export default class Builder implements IBuilder {
    private shapes;
    /**
     * Creates an instance of a shape builder
     * @param shapes Shape array
     */
    constructor(shapes?: IDraw[]);
    /**
     * Adds a shape
     * @param shapes The shapes
     * @returns The shape builder
     */
    addShapes(...shapes: IDraw[]): this;
    /**
     * Remove shapes from a shape builder
     * @param quantity A quantity of shapes. Removes all shapes if the quantity is skipped
     * @returns The shape builder
     */
    removeShapes(quantity?: number): this;
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
}
