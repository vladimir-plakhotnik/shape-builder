import { IDraw } from "./IDraw";
import Point from "./Point";

function drawingContext(context: CanvasRenderingContext2D, curve: Curve): void {
    context.save();

    if (curve.options?.fillColor) {
        context.fillStyle = curve.options.fillColor;
    }

    if (curve.options?.borderColor) {
        context.strokeStyle = curve.options.borderColor;
    }

    if (curve.options?.thickness) {
        context.lineWidth = curve.options.thickness;
    }
    if (curve.options?.dash) {
        context.setLineDash(curve.options.dash);
    }

    const start = new Point(curve.points[0].x, curve.points[0].y);


    context.beginPath();


    context.moveTo(start.x, start.y);

    for (let index = 1; index < curve.points.length; index++) {
        const point = new Point(curve.points[index].x, curve.points[index].y);
        context.lineTo(point.x, point.y);
    }

    if (curve.options?.fillColor) {
        context.fill();
    }

    if (curve.options?.borderColor) {
        context.stroke();
    }

    context.closePath();

    context.restore();
}

function svg(curve: Curve): string {
    let path = `M${curve.points[0].x} ${curve.points[0].y}`;

    for (let index = 1; index < curve.points.length; index++) {
        path += ` L${curve.points[index].x} ${curve.points[index].y}`;
    }

    path = `d="${path}"`;

    if (curve.options?.fillColor) {
        path += ` fill="${curve.options.fillColor}"`;
    } else {
        path += " fill=\"none\"";
    }

    if (curve.options?.borderColor) {
        path += ` stroke="${curve.options.borderColor}"`;
    }

    if (curve.options?.thickness) {
        path += ` stroke-width="${curve.options.thickness}"`;
    }

    if (curve.options?.dash) {
        path += ` stroke-dasharray="${curve.options.dash.join(",")}"`;
    }

    return `<path ${path} />`;
}

/**
 * Curve shape
 */
export default class Curve implements IDraw {
    /**
     * Creates an instance of a Curve shape
     * @param points Array of curve coordinate points
     * @param options Curve drawing options
     */
    constructor(
        public readonly points: Point[],
        public readonly options?: {
            readonly fillColor?: string,
            readonly borderColor?: string,
            readonly thickness?: number,
            readonly dash?: number[]
        }
    ) { }

    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
    draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this) : svg(this);
    }
}
