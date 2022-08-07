import { IDraw } from "./IDraw";
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
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}
