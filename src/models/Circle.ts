import type { IDraw } from "../interfaces";
import Point from "./Point";

/**
 * Draws a circle in a context
 * @param context Image context
 * @param circleShape Circle shape
 */
function drawingContext(context: CanvasRenderingContext2D, circleShape: Circle): void {
    context.save();

    if (circleShape.options?.fillColor) {
        context.fillStyle = circleShape.options.fillColor;
    }

    if (circleShape.options?.borderColor) {
        context.strokeStyle = circleShape.options.borderColor;
    }

    if (circleShape.options?.thickness) {
        context.lineWidth = circleShape.options.thickness;
    }

    if (circleShape.options?.dash) {
        context.setLineDash(circleShape.options.dash);
    }

    context.beginPath();

    context.arc(
        circleShape.center.x,
        circleShape.center.y,
        circleShape.radius,
        0,
        2 * Math.PI,
        false
    );

    context.closePath();

    if (circleShape.options?.fillColor) {
        context.fill();
    }

    context.stroke();

    context.restore();
}

/**
 * Creates SVG image code of a circle
 * @param circleShape Circle shape
 * @returns SVG image code of a circle
 */
function svg(circleShape: Circle): string {
    let circle = `cx="${circleShape.center.x}" cy="${circleShape.center.y}" r="${circleShape.radius}"`;

    if (circleShape.options?.fillColor) {
        circle += ` fill="${circleShape.options.fillColor}"`;
    } else {
        circle += " fill=\"none\"";
    }

    if (circleShape.options?.borderColor) {
        circle += ` stroke="${circleShape.options.borderColor}"`;
    }

    if (circleShape.options?.thickness) {
        circle += ` stroke-width="${circleShape.options.thickness}"`;
    }

    if (circleShape.options?.dash) {
        circle += ` stroke-dasharray="${circleShape.options.dash.join(",")}"`;
    }

    return `<circle ${circle} />`;
}

/**
 * Circle shape
 */
export default class Circle implements IDraw {
    /**
     * Creates an instance of a Circle shape
     * @param center Circle center coordinates
     * @param radius Circle radius in degrees 
     * @param options Circle drawing options
     */
    constructor(
        public readonly center: Point,
        public readonly radius: number,
        public readonly options?: {
            readonly fillColor?: string,
            readonly borderColor?: string,
            readonly thickness?: number,
            readonly dash?: number[],
        }
    ) { }
    /**
     * Creates SVG image code of a circle
     */
    draw(): string;
    /**
     * Draws a circle in a context
     * @param context Image context
     */
    draw(context: CanvasRenderingContext2D): void;
    draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this) : svg(this);
    }
}
