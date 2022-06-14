import Point from "./Point";
import { IDraw } from "./IDraw";
export default class Line implements IDraw {
    readonly start: Point;
    readonly end: Point;
    readonly options?: {
        readonly color?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    };
    constructor(start: Point, end: Point, options?: {
        readonly color?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}
