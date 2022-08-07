import Point from "./Point";
import { IDraw } from "./IDraw";

function drawingContext(context: CanvasRenderingContext2D, rectangle: Rectangle): void {
    context.save();

    if (rectangle.options?.fillColor) {
        context.fillStyle = rectangle.options.fillColor;
    }

    if (rectangle.options?.borderColor) {
        context.strokeStyle = rectangle.options.borderColor;
    }

    if (rectangle.options?.thickness) {
        context.lineWidth = rectangle.options.thickness;
    }

    if (rectangle.options?.dash) {
        context.setLineDash(rectangle.options.dash);
    }

    if (rectangle.options?.fillColor) {
        context.fillRect(rectangle.coordinates.x, rectangle.coordinates.y, rectangle.width, rectangle.height);
    }

    if (rectangle.options?.borderColor) {
        context.strokeRect(rectangle.coordinates.x, rectangle.coordinates.y, rectangle.width, rectangle.height);
    }

    context.restore();
}

function svg(rectangle: Rectangle): string {

    let x = rectangle.coordinates.x;
    let width = rectangle.width;

    if (width < 0) {
        x += rectangle.width;
        width = Math.abs(width);
    }

    let y = rectangle.coordinates.y;
    let height = rectangle.height;

    if (height < 0) {
        y += rectangle.height;
        height = Math.abs(height);
    }

    let rect = `x="${x}" y="${y}" width="${width}" height="${height}"`;

    if (rectangle.options?.fillColor) {
        rect += ` fill="${rectangle.options.fillColor}"`;
    } else {
        rect += " fill=\"none\"";
    }

    if (rectangle.options?.borderColor) {
        rect += ` stroke="${rectangle.options.borderColor}"`;
    }

    if (rectangle.options?.thickness) {
        rect += ` stroke-width="${rectangle.options.thickness}"`;
    }

    if (rectangle.options?.dash) {
        rect += ` stroke-dasharray="${rectangle.options.dash.join(",")}"`;
    }

    return `<rect ${rect} />`;
}

/**
 * Rectangle shape
 */
export default class Rectangle implements IDraw {
    /**
     * Creates an instance of a Rectangle shape
     * @param coordinates The coordinate of the upper left corner of Rectangle
     * @param width Rectangle width
     * @param height Rectangle height
     * @param options Rectangle drawing options
     */
    constructor(
        public readonly coordinates: Point,
        public readonly width: number,
        public readonly height: number,
        public readonly options?: {
            readonly fillColor?: string,
            readonly borderColor?: string,
            readonly thickness?: number,
            readonly dash?: number[],
        }
    ) { }

    public draw(): string;
    public draw(context: CanvasRenderingContext2D): void;
    public draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this) : svg(this);
    }
}