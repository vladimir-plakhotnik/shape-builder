import { shapes, Builder } from "../dist/shape-builder.min.js";

const { Point, Rectangle, Circle, Curve, Text } = shapes;

export default function logo(context, playground, code) {
    const width = context.canvas.clientWidth;

    const height = context.canvas.clientHeight;

    context.canvas.width = width;
    context.canvas.height = height;

    playground.style.width = `${width}px`;
    playground.style.height = `${height}px`;

    const builder = new Builder();

    builder
        .addShapes(
            new Rectangle(new Point(0, 0), width, height, {
                fillColor: "lightskyblue",
            }),
            new Circle(new Point(width / 2, height / 2), width / 2, {
                fillColor: "yellow",
                borderColor: "orange",
            }),
            new Curve(
                [
                    new Point(width / 2, height),
                    new Point(0, 0),
                    new Point(width, height / 3),
                    new Point(width / 2, height),
                    new Point(0, height),
                    new Point(width / 2, 0),
                    new Point(width, height),
                    new Point(0, height / 2),
                    new Point(width, 0),
                    new Point(0, height),
                ],
                {
                    fillColor: "orange",
                }
            ),
            new Circle(new Point(width / 1.8, height / 1.8), width / 6, {
                borderColor: "lightgreen",
                thickness: 10,
            }),
            new Rectangle(new Point(width / 4, height / 5), width / 4, height / 6, {
                borderColor: "lightpink",
                thickness: 10,
            }),
            new Text(new Point(width / 2.2, height / 2.1), "shape-builder.js", {
                font: {
                    family: "monospace",
                    size: `${width / 7.5}px`,
                },
                text: {
                    align: "center",
                    baseline: "middle",
                },
                color: "white",
                rotate: -45,
            })
        )
        .draw(context);

    const svg = builder.draw(width, height);

    playground.innerHTML = svg;

    code.innerText = svg;
}

// eslint-disable-next-line no-undef
if (window) {
    // eslint-disable-next-line no-undef
    window.logo = logo;
}
