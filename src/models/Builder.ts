import { IDraw } from "./IDraw";

function drawingContext(context: CanvasRenderingContext2D, builder: Builder): void {
    builder.shapes.forEach(shape => shape.draw(context));
}

function svg(width: number, height: number, builder: Builder): string {
    return `<svg width="${width}" height="${height}">\n${builder.shapes.map(item => item.draw()).join("\n")}\n</svg>`;
}

export interface IBuilder {
    draw(width: number, height: number): string;
    draw(context: CanvasRenderingContext2D): void;
}

/**
 * Shape Builder
 */
export default class Builder implements IBuilder {

    readonly shapes: IDraw[] = [];

    /**
     * Creates an instance of a Shape Builder
     * @param shapes Shape array
     */
    constructor(shapes?: IDraw[]) {
        if (shapes) {
            this.shapes = shapes;
        }
    }

    /**
     * Adds a shape
     * @param shape A shape
     * @returns The shape builder
     */
    addShape(shape: IDraw) {
        this.shapes.push(shape);
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
            return drawingContext(widthOrContext, this);
        }

        if (typeof widthOrContext === "number" && typeof height === "number") {
            return svg(widthOrContext, height, this);
        }

        throw new TypeError("Wrong arguments.");
    }
}
