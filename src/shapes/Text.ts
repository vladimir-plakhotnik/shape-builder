import { IFontStyle, IDraw } from "../interfaces";
import type Point from "./Point";

/**
 * Draws a text in a context
 * @param context Image context
 * @param textShape Text shape
 */
function drawingContext(context: CanvasRenderingContext2D, textShape: Text): void {
    context.save();

    if (textShape.options?.color) {
        context.fillStyle = textShape.options.color;
    }

    if (textShape.options?.font) {
        context.font = Text.fontStyleToString(textShape.options.font);
    }

    if (textShape.options?.text) {
        context.textAlign = textShape.options.text.align;
        context.textBaseline = textShape.options.text.baseline;
    }

    if (textShape.options?.rotate) {
        context.translate(
            textShape.coordinates.x,
            textShape.coordinates.y
        );
        context.rotate(textShape.options.rotate * Math.PI / 180);
        context.fillText(
            textShape.text,
            0,
            0
        );
    } else {
        context.fillText(
            textShape.text,
            textShape.coordinates.x,
            textShape.coordinates.y
        );
    }
    context.restore();
}

/**
 * Creates SVG image code of a text
 * @param textShape Text shape
 * @returns SVG image code of a text
 */
function svg(textShape: Text): string {
    let text;

    if (textShape.options?.rotate) {
        text = `x="0" y="0" transform="translate(${textShape.coordinates.x}, ${textShape.coordinates.y}) rotate(${textShape.options.rotate})"`;
    } else {
        text = `x="${textShape.coordinates.x}" y="${textShape.coordinates.y}"`;
    }

    if (textShape.options?.color) {
        text += ` fill="${textShape.options.color}"`;
    }

    if (textShape.options?.font?.family) {
        text += ` font-family="${textShape.options.font.family}"`;
    }

    if (textShape.options?.font?.size) {
        text += ` font-size="${textShape.options.font.size}"`;
    }

    if (textShape.options?.font?.style) {
        text += ` font-style="${textShape.options.font.style}"`;
    }

    if (textShape.options?.font?.weight) {
        text += ` font-weight="${textShape.options.font.weight}"`;
    }

    if (textShape.options?.font?.variant) {
        text += ` font-variant="${textShape.options.font.variant}"`;
    }

    if (textShape.options?.font?.stretch) {
        text += ` font-stretch="${textShape.options.font.stretch}"`;
    }

    if (textShape.options?.font?.kerning) {
        text += ` font-kerning="${textShape.options.font.kerning}"`;
    }

    // text align

    switch (textShape.options?.text?.align) {
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

    switch (textShape.options?.text?.baseline) {
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

    return `<text ${text}>${textShape.text}</text>`;
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

    /**
     * Creates SVG image code of a text
     */
    draw(): string;
    /**
     * Creates SVG image code of a text
     * @param context Image context
     */
    draw(context: CanvasRenderingContext2D): void;
    draw(context?: CanvasRenderingContext2D): string | void {
        return context ? drawingContext(context, this) : svg(this);
    }

    /**
     * Measures a text
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
            context.font = Text.fontStyleToString(font);
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
            context.font = Text.fontStyleToString(font);
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

    /**
     * Converts font style object to string
     * @param fontStyle Font style object
     * @returns Font style string
     */
    static fontStyleToString(fontStyle: IFontStyle): string {
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
}
