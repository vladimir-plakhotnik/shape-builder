export interface IDraw {
    /**
     * Returns SVG image code
     */
    draw(): string;
    /**
     * Draws image in context
     * @param context Image context
     */
    draw(context: CanvasRenderingContext2D): void;
}
