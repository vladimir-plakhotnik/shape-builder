import Point from "./Point";
import { IDraw } from "./IDraw";
/**
 * Rectangle shape
 */
export default class Rectangle implements IDraw {
    readonly coordinates: Point;
    readonly width: number;
    readonly height: number;
    readonly options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    };
    /**
     * Creates an instance of a Rectangle shape
     * @param coordinates The coordinate of the upper left corner of Rectangle
     * @param width Rectangle width
     * @param height Rectangle height
     * @param options Rectangle drawing options
     */
    constructor(coordinates: Point, width: number, height: number, options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}
