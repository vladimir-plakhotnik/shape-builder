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

export default class Builder implements IBuilder {
    constructor(public readonly shapes: IDraw[]) {}

    draw(width: number, height: number): string;
    draw(context: CanvasRenderingContext2D): void;
    draw(width: number | CanvasRenderingContext2D, height?: number): string | void {
        
        if (typeof width === "function" ||  typeof width === "object") {
            return drawingContext(width, this);
        }

        if (typeof width === "number" && typeof height === "number") {
            return svg(width, height, this);
        }

        throw new TypeError("Wrong arguments.");
    }
}
