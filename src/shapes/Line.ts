import type { IDraw } from "../interfaces";
import type Point from "./Point";

/**
 * Draws a line in a context
 * @param context Image context
 * @param lineShape Line shape
 */
function drawingContext(context: CanvasRenderingContext2D, lineShape: Line): void {
    context.save();

    if (lineShape.options?.color) {
        context.strokeStyle = lineShape.options.color;
    }

    if (lineShape.options?.thickness) {
        context.lineWidth = lineShape.options.thickness;
    }

    if (lineShape.options?.dash) {
        context.setLineDash(lineShape.options.dash);
    }

    context.beginPath();

    context.moveTo(lineShape.start.x, lineShape.start.y);

    context.lineTo(lineShape.end.x, lineShape.end.y);

    context.stroke();

    context.closePath();

    context.restore();
}

/**
 * Creates SVG image code of a line
 * @param lineShape Line shape
 * @returns SVG image code of a line
 */
function svg(lineShape: Line): string {
    let line = `x1="${lineShape.start.x}" y1="${lineShape.start.y}" x2="${lineShape.end.x}" y2="${lineShape.end.y}"`;

    if (lineShape.options?.color) {
        line += ` stroke="${lineShape.options.color}"`;
    }

    if (lineShape.options?.thickness) {
        line += ` stroke-width="${lineShape.options.thickness}"`;
    }

    if (lineShape.options?.dash) {
        line += ` stroke-dasharray="${lineShape.options.dash.join(",")}"`;
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

    /**
     * Creates SVG image code of a line
     */
    draw(): string;
    /**
     * Draws a line in a context
     * @param context Image context
     */
    draw(context: CanvasRenderingContext2D): void;
    draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this) : svg(this);
    }
}
