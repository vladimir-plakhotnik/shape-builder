import Point from "./Point";
import { IDraw } from "./IDraw";
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
    constructor(coordinates: Point, width: number, height: number, options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}
