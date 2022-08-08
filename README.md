# shape-builder.js

A library to draw shapes and text in JavaScript.

![Alt text](public/logo.png?raw=true "shape-builder.js")

## Install

```Bash
npm install shape-builder
# or
yarn add shape-builder
```

The `dist` folder of this package contains files:

- **shape-builder.min.js**. A minified JavaScript code for running in a browser.
- **shape-builder.node.js**. For running in Node.

## Usage

```JavaScript
import { Point, Rectangle, Builder } from "shape-builder";

// Get a context
const context = document.getElementById("canvas").getContext("2d");

// Create a shape builder
const builder = new Builder();

builder
    // Add the shapes
    .addShapes(
        new Rectangle(new Point(0, 0), 300, 300, {
            fillColor: "lightskyblue",
        })
    )
    .addShapes(
        new Rectangle(new Point(10, 10), 180, 180, {
            fillColor: "yellow",
            borderColor: "orange",
        })
    )
    // An alternative way to add the shapes
    // .addShapes(
    //     new Rectangle(new Point(0, 0), 300, 300, {
    //         fillColor: "lightskyblue",
    //     }),
    //     new Rectangle(new Point(10, 10), 180, 180, {
    //         fillColor: "yellow",
    //         borderColor: "orange",
    //     })
    // )

    // Remove last shape if needed
    // .removeShapes(1)
    // or remove all shapes
    // .removeShapes()

    // Draw the shapes in the image context
    .draw(context);

// or use svg
const playground = document.getElementById("playground");

playground.innerHTML = builder.draw(
    playground.getClientRects()[0].width, 
    playground.getClientRects()[0].height
);

```

You can draw a shape without creating the shape builder:

```JavaScript

new Rectangle(new Point(0, 0), 300, 300, {
    fillColor: "lightskyblue",
}).draw(context);

```

Another way to use the shape builder is to first create a shape array:

```JavaScript

// Add the shapes to a shape array
const shapes = [];

shapes.push(
    new Rectangle(new Point(0, 0), 300, 300, {
        fillColor: "lightskyblue",
    })
);

shapes.push(
    new Rectangle(new Point(10, 10), 180, 180, {
        fillColor: "yellow",
        borderColor: "orange",
    })
);

// Create a shape builder
const builder = new Builder(shapes);

// Draw the shapes
builder.draw(context);

```

The `Point` object is used to set a coordinate point. The image coordinates are counted from the top-left corner.

See more examples in [`logo.js`](public/logo.js) and [`sine.js`](public/sine.js). To view the page in a browser, please clone the repo and run a server:

```bash
npm start
```

## Running in Node.js

You need to install an additional package [`node-canvas`](https://github.com/Automattic/node-canvas) to run the `shape-builder` in Node.js.

```Bash
npm install canvas
```

The following code shows an example of usage the `node-canvas` and the `shape-builder` in Node.js.

```JavaScript
const { createCanvas } = require("canvas");
const { Point, Rectangle, Builder } = require("shape-builder");

const canvas = createCanvas(400, 400);
const context = canvas.getContext("2d");

// Create a shape builder
const builder = new Builder();


builder
    // Add the shapes
    .addShapes(
        new Rectangle(new Point(0, 0), 300, 300, {
            fillColor: "lightskyblue",
        })
    )
    .addShapes(
        new Rectangle(new Point(10, 10), 180, 180, {
            fillColor: "yellow",
            borderColor: "orange",
        })
    )
    // Draw the shapes in the image context
    .draw(context);

console.log('<img src="' + canvas.toDataURL() + '" />');

// or use svg
const svg = builder.draw(500, 500);

console.log(svg);

```

## Shapes

The current version includes the following shapes:

### Circle

```JavaScript
Circle (
    center: Point, 
    radius: number, 
    options?: {
        fillColor?: string,
        borderColor?: string,
        thickness?: number,
        dash?: number[]
    }
)
```

### Curve

```JavaScript
Curve(
    points: Point[], 
    options?: {
        fillColor?: string,
        borderColor?: string,
        thickness?: number,
        dash?: number[]
    }
)
```

### Line

```JavaScript
Line(
    start: Point, 
    end: Point, 
    options?: {
        color?: string,
        thickness?: number,
        dash?: number[]
    }
)
```

### Rectangle

```JavaScript
Rectangle(
    coordinates: Point, 
    width: number, 
    height: number, 
    options?: {
        fillColor?: string;
        borderColor?: string;
        thickness?: number;
        dash?: number[];
    }
)
```

### Text

```JavaScript
Text(
    coordinates: Point,
    text: string, 
    options?: {
        color?: string,
        font?: {
            family?: string,
            size?: string,
            weight?: string,
            style?: string,
            kerning?: CanvasFontKerning,
            stretch?: CanvasFontStretch,
            variant?: CanvasFontVariantCaps,
            lineHeight?: string
        },
        text?: {
            align: CanvasTextAlign,
            baseline: CanvasTextBaseline,
        },
        rotate?: number;
    }
)
```

To mesure a text you can use the `measure` method. This static method returns the [`TextMetrics`](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) interface.

```JavaScript
Text.measure(
    context: CanvasRenderingContext2D,
    text: string,
    font?: {
        family?: string,
        size?: string,
        weight?: string,
        style?: string,
        kerning?: CanvasFontKerning,
        stretch?: CanvasFontStretch,
        variant?: CanvasFontVariantCaps,
        lineHeight?: string
    }
);
```

To fit a text into a box use the `fitIntoBox` method. This static method returns a font size in pixels to fill the text in the box.

```JavaScript
Text.fitIntoBox(
    context: CanvasRenderingContext2D,
    text: string,
    boxSize: { width: number, height: number },
    font?: {
        family?: string,
        size?: string, // in px
        weight?: string,
        style?: string,
        kerning?: CanvasFontKerning,
        stretch?: CanvasFontStretch,
        variant?: CanvasFontVariantCaps,
        lineHeight?: string
    }
)
```

## License (MIT)

See [License File](LICENSE).
