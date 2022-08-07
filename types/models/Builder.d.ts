import { IDraw } from "./IDraw";
export interface IBuilder {
    draw(width: number, height: number): string;
    draw(context: CanvasRenderingContext2D): void;
}
/**
 * Shape Builder
 */
export default class Builder implements IBuilder {
    readonly shapes: IDraw[];
    /**
     * Creates an instance of a Shape Builder
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
