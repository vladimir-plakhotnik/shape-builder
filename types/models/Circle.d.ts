import { IDraw } from "./IDraw";
import Point from "./Point";
export default class Circle implements IDraw {
    readonly center: Point;
    readonly radius: number;
    readonly options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    };
    constructor(center: Point, radius: number, options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}
