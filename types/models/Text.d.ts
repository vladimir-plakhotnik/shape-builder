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
/**
 * Text shape
 */
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
    /**
     * Creates an instance of a Text shape
     * @param coordinates Text coordinates in a image
     * @param text Text to draw in an image
     * @param options Text drawing options
     */
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
    /**
     * Mesures a text
     * @param context The image context
     * @param text Text to draw in the image
     * @param font Font description
     * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics TextMetrics} object
     */
    static measure(context: CanvasRenderingContext2D, text: string, font?: IFontStyle): TextMetrics;
    /**
     * Fits a text into a box
     * @param context The image context
     * @param text Text to draw in a box
     * @param boxSize Size of box in image
     * @param font Font description
     * @returns Font size to fit a text into a box
     */
    static fitIntoBox(context: CanvasRenderingContext2D, text: string, boxSize: {
        width: number;
        height: number;
    }, font?: IFontStyle): number;
}
