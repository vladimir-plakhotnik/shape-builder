import { IDraw } from "./IDraw";
import Point from "./Point";
export default class Curve implements IDraw {
    readonly points: Point[];
    readonly options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    };
    constructor(points: Point[], options?: {
        readonly fillColor?: string;
        readonly borderColor?: string;
        readonly thickness?: number;
        readonly dash?: number[];
    });
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}
