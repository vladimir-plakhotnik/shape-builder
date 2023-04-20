import type { IBuilder, IDraw } from "./interfaces";
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
     * @param shape A shape
     * @returns The shape builder
     */
    addShape(shape: IDraw): this;
    /**
     * Adds a lot of shapes
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
     * Creates SVG image code
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
