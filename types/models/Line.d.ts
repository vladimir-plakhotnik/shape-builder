import Point from "./Point";
import { IDraw } from "./IDraw";
/**
 * Line shape
 */
export default class Line implements IDraw {
    readonly start: Point;
    readonly end: Point;
    readonly options?: {
        readonly color?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    };
    /**
     * Creates an instance of a Line shape
     * @param start Start point coordinate
     * @param end End point coordinate
     * @param options Line drawing options
     */
    constructor(start: Point, end: Point, options?: {
        readonly color?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}
