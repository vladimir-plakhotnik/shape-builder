import { IDraw } from "./IDraw";
import Point from "./Point";
export interface IFontStyle {
    family?: string;
    size?: string;
    weight?: string;
    style?: string;
    kerning?: CanvasFontKerning;
    stretch?: CanvasFontStretch;
    variant?: CanvasFontVariantCaps;
    lineHeight?: string;
}
export default class Text implements IDraw {
    readonly coordinates: Point;
    readonly text: string;
    readonly options?: {
        readonly color?: string;
        readonly font?: IFontStyle;
        readonly text?: {
            align: CanvasTextAlign;
            baseline: CanvasTextBaseline;
        };
        readonly rotate?: number;
    };
    constructor(coordinates: Point, text: string, options?: {
        readonly color?: string;
        readonly font?: IFontStyle;
        readonly text?: {
            align: CanvasTextAlign;
            baseline: CanvasTextBaseline;
        };
        readonly rotate?: number;
    });
    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
}