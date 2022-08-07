import { IDraw } from "./IDraw";
import Point from "./Point";

export interface IFontStyle {
    family?: string,
    size?: string,
    weight?: string,
    style?: string,
    kerning?: CanvasFontKerning
    stretch?: CanvasFontStretch,
    variant?: CanvasFontVariantCaps,
    lineHeight?: string
}

function fontStyleToString(fontStyle: IFontStyle): string {
    let font = "";
    if (fontStyle.style) {
        font = `${fontStyle.style} `;
    }
    if (fontStyle.variant) {
        font += `${fontStyle.variant} `;
    }
    if (fontStyle.weight) {
        font += `${fontStyle.weight} `;
    }
    if (fontStyle.stretch) {
        font += `${fontStyle.stretch} `;
    }
    if (fontStyle.size) {
        font += `${fontStyle.size} `;
    }
    if (fontStyle.lineHeight) {
        font += `${fontStyle.lineHeight} `;
    }
    if (fontStyle.family) {
        font += `${fontStyle.family}`;
    }
    return font.trim();
}

function drawingContext(context: CanvasRenderingContext2D, text: Text): void {
    context.save();

    if (text.options?.color) {
        context.fillStyle = text.options.color;
    }

    if (text.options?.font) {
        context.font = fontStyleToString(text.options.font);
    }

    if (text.options?.text) {
        context.textAlign = text.options.text.align;
        context.textBaseline = text.options.text.baseline;
    }

    if (text.options?.rotate) {
        context.translate(
            text.coordinates.x,
            text.coordinates.y
        );
        context.rotate(text.options.rotate * Math.PI / 180);
        context.fillText(
            text.text,
            0,
            0
        );
    } else {
        context.fillText(
            text.text,
            text.coordinates.x,
            text.coordinates.y
        );
    }
    context.restore();
}

function svg(textObject: Text): string {
    let text;

    if (textObject.options?.rotate) {
        text = `x="0" y="0" transform="translate(${textObject.coordinates.x}, ${textObject.coordinates.y}) rotate(${textObject.options.rotate})"`;
    } else {
        text = `x="${textObject.coordinates.x}" y="${textObject.coordinates.y}"`;
    }

    if (textObject.options?.color) {
        text += ` fill="${textObject.options.color}"`;
    }

    if (textObject.options?.font?.family) {
        text += ` font-family="${textObject.options.font.family}"`;
    }

    if (textObject.options?.font?.size) {
        text += ` font-size="${textObject.options.font.size}"`;
    }

    if (textObject.options?.font?.style) {
        text += ` font-style="${textObject.options.font.style}"`;
    }

    if (textObject.options?.font?.weight) {
        text += ` font-weight="${textObject.options.font.weight}"`;
    }

    if (textObject.options?.font?.variant) {
        text += ` font-variant="${textObject.options.font.variant}"`;
    }

    if (textObject.options?.font?.stretch) {
        text += ` font-stretch="${textObject.options.font.stretch}"`;
    }

    if (textObject.options?.font?.kerning) {
        text += ` font-kerning="${textObject.options.font.kerning}"`;
    }

    // text align

    switch (textObject.options?.text?.align) {
    case "center":
        text += " text-anchor=\"middle\"";
        break;
    case "right":
    case "end":
        text += " text-anchor=\"end\"";
        break;
    default:
        text += " text-anchor=\"start\"";
    }

    // text baseline

    switch (textObject.options?.text?.baseline) {
    case "top":
    case "hanging":
        text += " dominant-baseline=\"hanging\"";
        break;
    case "alphabetic":
        text += " dominant-baseline=\"alphabetic\"";
        break;
    case "ideographic":
        text += " dominant-baseline=\"ideographic\"";
        break;
    case "middle":
        text += " dominant-baseline=\"middle\"";
        break;
    default:
        text += " dominant-baseline=\"auto\"";
    }

    return `<text ${text}>${textObject.text}</text>`;
}

/**
 * Text shape
 */
export default class Text implements IDraw {
    /**
     * Creates an instance of a Text shape
     * @param coordinates Text coordinates in a image
     * @param text Text to draw in an image
     * @param options Text drawing options
     */
    constructor(
        public readonly coordinates: Point,
        public readonly text: string,
        public readonly options?: {
            readonly color?: string,
            readonly font?: IFontStyle,
            readonly text?: {
                align: CanvasTextAlign,
                baseline: CanvasTextBaseline,
            },
            readonly rotate?: number
        }
    ) { }

    draw(): string;
    draw(context: CanvasRenderingContext2D): void;
    draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this) : svg(this);
    }

    /**
     * Mesures a text
     * @param context The image context
     * @param text Text to draw in the image
     * @param font Font description
     * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics TextMetrics} object 
     */
    static measure(
        context: CanvasRenderingContext2D,
        text: string,
        font?: IFontStyle
    ): TextMetrics {
        if (font) {
            context.save();
            context.font = fontStyleToString(font);
        }

        const result = context.measureText(text);

        if (font) {
            context.restore();
        }

        return result;
    }

    /**
     * Fits a text into a box 
     * @param context The image context
     * @param text Text to draw in a box
     * @param boxSize Size of box in image
     * @param font Font description
     * @returns Font size to fit a text into a box
     */
    static fitIntoBox(
        context: CanvasRenderingContext2D,
        text: string,
        boxSize: { width: number, height: number },
        font?: IFontStyle
    ): number {
        context.save();

        if (font) {
            context.font = fontStyleToString(font);
        }

        const fontString = context.font.split(" ");

        const index = fontString.findIndex(item => /\d+px/.test(item.trim()));

        if (index === -1) {
            throw new Error("Font size does not found in an image context");
        }

        let number = parseInt(fontString[index]);

        if (!number) {
            throw new Error("Font size does not found in an image context");
        }

        const updateFont = () => {
            fontString[index] = `${number}px`;
            context.font = fontString.join(" ");
        };

        const getTextWidth = (text: string) => context.measureText(text).width;

        const getTextHeight = (text: string) => context.measureText(text).actualBoundingBoxAscent + context.measureText(text).actualBoundingBoxDescent;

        if (getTextWidth(text) > boxSize.width || getTextHeight(text) > boxSize.height) {
            // decrease            
            while (getTextWidth(text) > boxSize.width || getTextHeight(text) > boxSize.height) {
                number--;
                updateFont();
            }
        } else {
            // increase
            while (getTextWidth(text) < boxSize.width && getTextHeight(text) < boxSize.height) {
                number++;
                updateFont();
            }
            if (getTextWidth(text) > boxSize.width || getTextHeight(text) > boxSize.height) {
                number--;
            }
        }

        context.restore();

        return number;
    }
}
