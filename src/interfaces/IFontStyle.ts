/**
 * Font Style Interface
 */
export interface IFontStyle {
    /**
     * Font family
     */
    family?: string;
    /**
     * Font size
     */
    size?: string;
    /**
     * Font weight
     */
    weight?: string;
    /**
     * Font style
     */
    style?: string;
    /**
     * Font kerning
     */
    kerning?: CanvasFontKerning;
    /**
     * Font stretch
     */
    stretch?: CanvasFontStretch;
    /**
     * Font variant
     */
    variant?: CanvasFontVariantCaps;
    /**
     * Font line height
     */
    lineHeight?: string;
}
