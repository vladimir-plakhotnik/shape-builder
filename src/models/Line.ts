import Point from "./Point";
import { IDraw } from "./IDraw";

function drawingContext(context: CanvasRenderingContext2D, line: Line): void {
    context.save();

    if (line.options?.color) {
        context.strokeStyle = line.options.color;
    }

    if (line.options?.thickness) {
        context.lineWidth = line.options.thickness;
    }

    if (line.options?.dash) {
        context.setLineDash(line.options.dash);
    }

    context.beginPath();

    context.moveTo(line.start.x, line.start.y);

    context.lineTo(line.end.x, line.end.y);

    context.stroke();

    context.closePath();

    context.restore();
}

function svg(lineObject: Line): string {
    let line = `x1="${lineObject.start.x}" y1="${lineObject.start.y}" x2="${lineObject.end.x}" y2="${lineObject.end.y}"`;

    if (lineObject.options?.color) {
        line += ` stroke="${lineObject.options.color}"`;
    }

    if (lineObject.options?.thickness) {
        line += ` stroke-width="${lineObject.options.thickness}"`;
    }

    if (lineObject.options?.dash) {
        line += ` stroke-dasharray="${lineObject.options.dash.join(",")}"`;
    }

    return `<line ${line} />`;
}

/**
 * Line shape
 */
export default class Line implements IDraw {
    /**
     * Creates an instance of a Line shape
     * @param start Start point coordinate
     * @param end End point coordinate
     * @param options Line drawing options
     */
    constructor(
        public readonly start: Point,
        public readonly end: Point,
        public readonly options?: {
            readonly color?: string,
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
