import {
    Point,
    Builder,
    Curve,
    Text,
    Line,
} from "../dist/shape-builder.min.js";

export default function sine(context, playground, code) {
    const width = context.canvas.clientWidth;

    const height = context.canvas.clientHeight;

    context.canvas.width = width;
    context.canvas.height = height;

    playground.style.width = `${width}px`;
    playground.style.height = `${height}px`;

    const xOffset = width / (4 * Math.PI);

    const yOffset = height / 2;

    const sine = (x) => Math.sin(x);

    const points = [];

    for (let x = -2 * Math.PI; x < 2 * Math.PI; x += 0.1) {
        points.push(
            new Point(
                width / 2 + x * xOffset,
                yOffset - (sine(x) * yOffset) / 2
            )
        );
    }

    const builder = new Builder();

    builder
        .addShape(
            new Line(new Point(width / 2, 0), new Point(width / 2, height), {
                color: "lightskyblue",
                dash: [5],
            })
        )
        .addShape(
            new Text(new Point(width / 2 + height / 20 / 2, 0), "Y", {
                font: {
                    family: "system-ui",
                    size: `${height / 20}px`,
                    weight: "bold",
                },
                text: {
                    align: "left",
                    baseline: "hanging",
                },
                color: "lightskyblue",
            })
        )
        .addShape(
            new Line(new Point(0, height / 2), new Point(width, height / 2), {
                color: "lightskyblue",
                dash: [5],
            })
        )
        .addShape(
            new Text(
                new Point(width - height / 20, height / 2 - height / 20),
                "X",
                {
                    font: {
                        family: "system-ui",
                        size: `${height / 20}px`,
                        weight: "bold",
                    },
                    text: {
                        align: "left",
                        baseline: "hanging",
                    },
                    color: "lightskyblue",
                }
            )
        )
        .addShape(
            new Curve(points, {
                borderColor: "red",
            })
        )
        .addShape(
            new Text(
                new Point(width * (1 / 2 + 1 / 4), height * (1 / 5)),
                "y = sin x",
                {
                    font: {
                        family: "system-ui",
                        size: `${height / 20}px`,
                    },
                    text: {
                        align: "left",
                        baseline: "hanging",
                    },
                    color: "red",
                }
            )
        )
        .draw(context);

    const svg = builder.draw(width, height);

    playground.innerHTML = svg;

    code.innerText = svg;
}

// eslint-disable-next-line no-undef
if (window) {
    // eslint-disable-next-line no-undef
    window.sine = sine;
}
