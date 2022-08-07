import { IDraw } from "./IDraw";
import Point from "./Point";

function drawingContext(context: CanvasRenderingContext2D, circle: Circle): void {
    context.save();

    if (circle.options?.fillColor) {
        context.fillStyle = circle.options.fillColor;
    }

    if (circle.options?.borderColor) {
        context.strokeStyle = circle.options.borderColor;
    }

    if (circle.options?.thickness) {
        context.lineWidth = circle.options.thickness;
    }

    if (circle.options?.dash) {
        context.setLineDash(circle.options.dash);
    }

    context.beginPath();

    context.arc(
        circle.center.x,
        circle.center.y,
        circle.radius,
        0,
        2 * Math.PI,
        false
    );

    context.closePath();

    if (circle.options?.fillColor) {
        context.fill();
    }

    context.stroke();

    context.restore();
}

function svg(circleObject: Circle): string {
    let circle = `cx="${circleObject.center.x}" cy="${circleObject.center.y}" r="${circleObject.radius}"`;

    if (circleObject.options?.fillColor) {
        circle += ` fill="${circleObject.options.fillColor}"`;
    } else {
        circle += " fill=\"none\"";
    }

    if (circleObject.options?.borderColor) {
        circle += ` stroke="${circleObject.options.borderColor}"`;
    }

    if (circleObject.options?.thickness) {
        circle += ` stroke-width="${circleObject.options.thickness}"`;
    }

    if (circleObject.options?.dash) {
        circle += ` stroke-dasharray="${circleObject.options.dash.join(",")}"`;
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
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
    draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this) : svg(this);
    }

}