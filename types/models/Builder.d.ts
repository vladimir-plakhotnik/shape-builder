import { IDraw } from "./IDraw";
interface IBuilder {
    draw(width: number, height: number): string;
    draw(context: CanvasRenderingContext2D): void;
}
export default class Builder implements IBuilder {
    readonly shapes: IDraw[];
    constructor(shapes: IDraw[]);
    draw(width: number, height: number): string;
    draw(context: CanvasRenderingContext2D): void;
}
export {};
