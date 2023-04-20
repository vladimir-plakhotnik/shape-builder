import type { IDraw } from "../interfaces";
import Point from "./Point";
/**
 * Curve shape
 */
export default class Curve implements IDraw {
    readonly points: Point[];
    readonly options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    };
    /**
     * Creates an instance of a Curve shape
     * @param points Array of curve coordinate points
     * @param options Curve drawing options
     */
    constructor(points: Point[], options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    /**
     * Creates SVG image code of a curve
     */
    draw(): string;
    /**
     * Draws a curve in a context
     * @param context Image context
     */
    draw(context: CanvasRenderingContext2D): void;
}
