import type { IDraw } from "../interfaces";
import Point from "./Point";
/**
 * Circle shape
 */
export default class Circle implements IDraw {
    readonly center: Point;
    readonly radius: number;
    readonly options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    };
    /**
     * Creates an instance of a Circle shape
     * @param center Circle center coordinates
     * @param radius Circle radius in degrees
     * @param options Circle drawing options
     */
    constructor(center: Point, radius: number, options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    /**
     * Creates SVG image code of a circle
     */
    draw(): string;
    /**
     * Draws a circle in a context
     * @param context Image context
     */
    draw(context: CanvasRenderingContext2D): void;
}
