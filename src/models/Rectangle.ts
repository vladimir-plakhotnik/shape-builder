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
    let rect = `x="${rectangle.coordinates.x}" y="${rectangle.coordinates.y}" width="${rectangle.width}" height="${rectangle.height}"`;

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

export default class Rectangle implements IDraw {
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
    ) {}

    public draw(): string;
    public draw(context: CanvasRenderingContext2D): void;
    public draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this): svg(this);
    }
}