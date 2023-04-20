'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Shape builder
 */
var Builder = /** @class */ (function () {
    /**
     * Creates an instance of a shape builder
     * @param shapes Shape array
     */
    function Builder(shapes) {
        this.shapes = [];
        if (shapes) {
            this.shapes = shapes;
        }
    }
    /**
     * Adds a shape
     * @param shape A shape
     * @returns The shape builder
     */
    Builder.prototype.addShape = function (shape) {
        this.shapes.push(shape);
        return this;
    };
    /**
     * Adds a lot of shapes
     * @param shapes The shapes
     * @returns The shape builder
     */
    Builder.prototype.addShapes = function () {
        var _a;
        var shapes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            shapes[_i] = arguments[_i];
        }
        (_a = this.shapes).push.apply(_a, shapes);
        return this;
    };
    /**
     * Remove shapes from a shape builder
     * @param quantity A quantity of shapes. Removes all shapes if the quantity is skipped
     * @returns The shape builder
     */
    Builder.prototype.removeShapes = function (quantity) {
        if (quantity && this.shapes.length > quantity) {
            this.shapes = this.shapes.slice(0, this.shapes.length - quantity);
        }
        else {
            this.shapes = [];
        }
        return this;
    };
    Builder.prototype.draw = function (widthOrContext, height) {
        if (typeof widthOrContext === "function" || typeof widthOrContext === "object") {
            return this.shapes.forEach(function (shape) { return shape.draw(widthOrContext); });
        }
        if (typeof widthOrContext === "number" && typeof height === "number") {
            return "<svg width=\"".concat(widthOrContext, "\" height=\"").concat(height, "\">\n").concat(this.shapes.map(function (item) { return item.draw(); }).join("\n"), "\n</svg>");
        }
        throw new TypeError("Wrong arguments.");
    };
    return Builder;
}());

/**
 * Draws a circle in a context
 * @param context Image context
 * @param circleShape Circle shape
 */
function drawingContext$4(context, circleShape) {
    var _a, _b, _c, _d, _e;
    context.save();
    if ((_a = circleShape.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        context.fillStyle = circleShape.options.fillColor;
    }
    if ((_b = circleShape.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        context.strokeStyle = circleShape.options.borderColor;
    }
    if ((_c = circleShape.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        context.lineWidth = circleShape.options.thickness;
    }
    if ((_d = circleShape.options) === null || _d === void 0 ? void 0 : _d.dash) {
        context.setLineDash(circleShape.options.dash);
    }
    context.beginPath();
    context.arc(circleShape.center.x, circleShape.center.y, circleShape.radius, 0, 2 * Math.PI, false);
    context.closePath();
    if ((_e = circleShape.options) === null || _e === void 0 ? void 0 : _e.fillColor) {
        context.fill();
    }
    context.stroke();
    context.restore();
}
/**
 * Creates SVG image code of a circle
 * @param circleShape Circle shape
 * @returns SVG image code of a circle
 */
function svg$4(circleShape) {
    var _a, _b, _c, _d;
    var circle = "cx=\"".concat(circleShape.center.x, "\" cy=\"").concat(circleShape.center.y, "\" r=\"").concat(circleShape.radius, "\"");
    if ((_a = circleShape.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        circle += " fill=\"".concat(circleShape.options.fillColor, "\"");
    }
    else {
        circle += " fill=\"none\"";
    }
    if ((_b = circleShape.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        circle += " stroke=\"".concat(circleShape.options.borderColor, "\"");
    }
    if ((_c = circleShape.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        circle += " stroke-width=\"".concat(circleShape.options.thickness, "\"");
    }
    if ((_d = circleShape.options) === null || _d === void 0 ? void 0 : _d.dash) {
        circle += " stroke-dasharray=\"".concat(circleShape.options.dash.join(","), "\"");
    }
    return "<circle ".concat(circle, " />");
}
/**
 * Circle shape
 */
var Circle = /** @class */ (function () {
    /**
     * Creates an instance of a Circle shape
     * @param center Circle center coordinates
     * @param radius Circle radius in degrees
     * @param options Circle drawing options
     */
    function Circle(center, radius, options) {
        this.center = center;
        this.radius = radius;
        this.options = options;
    }
    Circle.prototype.draw = function (context) {
        return context ? drawingContext$4(context, this) : svg$4(this);
    };
    return Circle;
}());

/**
 * Point object is used to set a coordinate point
 */
var Point = /** @class */ (function () {
    /**
     * Creates an instance of a Point
     * @param x X coordinate
     * @param y Y coordinate
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Adds a point to the current one and returns a new point
     * @param point A point object
     * @returns New point
     */
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    /**
     * Subtracts a point from the current one and returns a new point
     * @param point A point object
     * @returns New point
     */
    Point.prototype.subtract = function (point) {
        return new Point(this.x - point.x, this.y - point.y);
    };
    return Point;
}());

/**
 * Draws a curve in a context
 * @param context Image context
 * @param curve Curve shape
 */
function drawingContext$3(context, curve) {
    var _a, _b, _c, _d, _e, _f;
    context.save();
    if ((_a = curve.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        context.fillStyle = curve.options.fillColor;
    }
    if ((_b = curve.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        context.strokeStyle = curve.options.borderColor;
    }
    if ((_c = curve.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        context.lineWidth = curve.options.thickness;
    }
    if ((_d = curve.options) === null || _d === void 0 ? void 0 : _d.dash) {
        context.setLineDash(curve.options.dash);
    }
    var start = new Point(curve.points[0].x, curve.points[0].y);
    context.beginPath();
    context.moveTo(start.x, start.y);
    for (var index = 1; index < curve.points.length; index++) {
        var point = new Point(curve.points[index].x, curve.points[index].y);
        context.lineTo(point.x, point.y);
    }
    if ((_e = curve.options) === null || _e === void 0 ? void 0 : _e.fillColor) {
        context.fill();
    }
    if ((_f = curve.options) === null || _f === void 0 ? void 0 : _f.borderColor) {
        context.stroke();
    }
    context.closePath();
    context.restore();
}
/**
 * Creates SVG image code of a curve
 * @param curve Curve shape
 * @returns SVG image code of a curve
 */
function svg$3(curve) {
    var _a, _b, _c, _d;
    var path = "M".concat(curve.points[0].x, " ").concat(curve.points[0].y);
    for (var index = 1; index < curve.points.length; index++) {
        path += " L".concat(curve.points[index].x, " ").concat(curve.points[index].y);
    }
    path = "d=\"".concat(path, "\"");
    if ((_a = curve.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        path += " fill=\"".concat(curve.options.fillColor, "\"");
    }
    else {
        path += " fill=\"none\"";
    }
    if ((_b = curve.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        path += " stroke=\"".concat(curve.options.borderColor, "\"");
    }
    if ((_c = curve.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        path += " stroke-width=\"".concat(curve.options.thickness, "\"");
    }
    if ((_d = curve.options) === null || _d === void 0 ? void 0 : _d.dash) {
        path += " stroke-dasharray=\"".concat(curve.options.dash.join(","), "\"");
    }
    return "<path ".concat(path, " />");
}
/**
 * Curve shape
 */
var Curve = /** @class */ (function () {
    /**
     * Creates an instance of a Curve shape
     * @param points Array of curve coordinate points
     * @param options Curve drawing options
     */
    function Curve(points, options) {
        this.points = points;
        this.options = options;
    }
    Curve.prototype.draw = function (context) {
        return context ? drawingContext$3(context, this) : svg$3(this);
    };
    return Curve;
}());

/**
 * Draws a line in a context
 * @param context Image context
 * @param lineShape Line shape
 */
function drawingContext$2(context, lineShape) {
    var _a, _b, _c;
    context.save();
    if ((_a = lineShape.options) === null || _a === void 0 ? void 0 : _a.color) {
        context.strokeStyle = lineShape.options.color;
    }
    if ((_b = lineShape.options) === null || _b === void 0 ? void 0 : _b.thickness) {
        context.lineWidth = lineShape.options.thickness;
    }
    if ((_c = lineShape.options) === null || _c === void 0 ? void 0 : _c.dash) {
        context.setLineDash(lineShape.options.dash);
    }
    context.beginPath();
    context.moveTo(lineShape.start.x, lineShape.start.y);
    context.lineTo(lineShape.end.x, lineShape.end.y);
    context.stroke();
    context.closePath();
    context.restore();
}
/**
 * Creates SVG image code of a line
 * @param lineShape Line shape
 * @returns SVG image code of a line
 */
function svg$2(lineShape) {
    var _a, _b, _c;
    var line = "x1=\"".concat(lineShape.start.x, "\" y1=\"").concat(lineShape.start.y, "\" x2=\"").concat(lineShape.end.x, "\" y2=\"").concat(lineShape.end.y, "\"");
    if ((_a = lineShape.options) === null || _a === void 0 ? void 0 : _a.color) {
        line += " stroke=\"".concat(lineShape.options.color, "\"");
    }
    if ((_b = lineShape.options) === null || _b === void 0 ? void 0 : _b.thickness) {
        line += " stroke-width=\"".concat(lineShape.options.thickness, "\"");
    }
    if ((_c = lineShape.options) === null || _c === void 0 ? void 0 : _c.dash) {
        line += " stroke-dasharray=\"".concat(lineShape.options.dash.join(","), "\"");
    }
    return "<line ".concat(line, " />");
}
/**
 * Line shape
 */
var Line = /** @class */ (function () {
    /**
     * Creates an instance of a Line shape
     * @param start Start point coordinate
     * @param end End point coordinate
     * @param options Line drawing options
     */
    function Line(start, end, options) {
        this.start = start;
        this.end = end;
        this.options = options;
    }
    Line.prototype.draw = function (context) {
        return context ? drawingContext$2(context, this) : svg$2(this);
    };
    return Line;
}());

/**
 * Draws a rectangle in a context
 * @param context Image context
 * @param rectangle Rectangle shape
 */
function drawingContext$1(context, rectangle) {
    var _a, _b, _c, _d, _e, _f;
    context.save();
    if ((_a = rectangle.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        context.fillStyle = rectangle.options.fillColor;
    }
    if ((_b = rectangle.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        context.strokeStyle = rectangle.options.borderColor;
    }
    if ((_c = rectangle.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        context.lineWidth = rectangle.options.thickness;
    }
    if ((_d = rectangle.options) === null || _d === void 0 ? void 0 : _d.dash) {
        context.setLineDash(rectangle.options.dash);
    }
    if ((_e = rectangle.options) === null || _e === void 0 ? void 0 : _e.fillColor) {
        context.fillRect(rectangle.coordinates.x, rectangle.coordinates.y, rectangle.width, rectangle.height);
    }
    if ((_f = rectangle.options) === null || _f === void 0 ? void 0 : _f.borderColor) {
        context.strokeRect(rectangle.coordinates.x, rectangle.coordinates.y, rectangle.width, rectangle.height);
    }
    context.restore();
}
/**
 * Creates SVG image code of a rectangle
 * @param rectangle Rectangle shape
 * @returns SVG image code of a rectangle
 */
function svg$1(rectangle) {
    var _a, _b, _c, _d;
    var x = rectangle.coordinates.x;
    var width = rectangle.width;
    if (width < 0) {
        x += rectangle.width;
        width = Math.abs(width);
    }
    var y = rectangle.coordinates.y;
    var height = rectangle.height;
    if (height < 0) {
        y += rectangle.height;
        height = Math.abs(height);
    }
    var rect = "x=\"".concat(x, "\" y=\"").concat(y, "\" width=\"").concat(width, "\" height=\"").concat(height, "\"");
    if ((_a = rectangle.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        rect += " fill=\"".concat(rectangle.options.fillColor, "\"");
    }
    else {
        rect += " fill=\"none\"";
    }
    if ((_b = rectangle.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        rect += " stroke=\"".concat(rectangle.options.borderColor, "\"");
    }
    if ((_c = rectangle.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        rect += " stroke-width=\"".concat(rectangle.options.thickness, "\"");
    }
    if ((_d = rectangle.options) === null || _d === void 0 ? void 0 : _d.dash) {
        rect += " stroke-dasharray=\"".concat(rectangle.options.dash.join(","), "\"");
    }
    return "<rect ".concat(rect, " />");
}
/**
 * Rectangle shape
 */
var Rectangle = /** @class */ (function () {
    /**
     * Creates an instance of a Rectangle shape
     * @param coordinates The coordinate of the upper left corner of Rectangle
     * @param width Rectangle width
     * @param height Rectangle height
     * @param options Rectangle drawing options
     */
    function Rectangle(coordinates, width, height, options) {
        this.coordinates = coordinates;
        this.width = width;
        this.height = height;
        this.options = options;
    }
    Rectangle.prototype.draw = function (context) {
        return context ? drawingContext$1(context, this) : svg$1(this);
    };
    return Rectangle;
}());

/**
 * Converts font style object to string
 * @param fontStyle Font style object
 * @returns Font style string
 */
function fontStyleToString(fontStyle) {
    var font = "";
    if (fontStyle.style) {
        font = "".concat(fontStyle.style, " ");
    }
    if (fontStyle.variant) {
        font += "".concat(fontStyle.variant, " ");
    }
    if (fontStyle.weight) {
        font += "".concat(fontStyle.weight, " ");
    }
    if (fontStyle.stretch) {
        font += "".concat(fontStyle.stretch, " ");
    }
    if (fontStyle.size) {
        font += "".concat(fontStyle.size, " ");
    }
    if (fontStyle.lineHeight) {
        font += "".concat(fontStyle.lineHeight, " ");
    }
    if (fontStyle.family) {
        font += "".concat(fontStyle.family);
    }
    return font.trim();
}
/**
 * Draws a text in a context
 * @param context Image context
 * @param textShape Text shape
 */
function drawingContext(context, textShape) {
    var _a, _b, _c, _d;
    context.save();
    if ((_a = textShape.options) === null || _a === void 0 ? void 0 : _a.color) {
        context.fillStyle = textShape.options.color;
    }
    if ((_b = textShape.options) === null || _b === void 0 ? void 0 : _b.font) {
        context.font = fontStyleToString(textShape.options.font);
    }
    if ((_c = textShape.options) === null || _c === void 0 ? void 0 : _c.text) {
        context.textAlign = textShape.options.text.align;
        context.textBaseline = textShape.options.text.baseline;
    }
    if ((_d = textShape.options) === null || _d === void 0 ? void 0 : _d.rotate) {
        context.translate(textShape.coordinates.x, textShape.coordinates.y);
        context.rotate(textShape.options.rotate * Math.PI / 180);
        context.fillText(textShape.text, 0, 0);
    }
    else {
        context.fillText(textShape.text, textShape.coordinates.x, textShape.coordinates.y);
    }
    context.restore();
}
/**
 * Creates SVG image code of a text
 * @param textShape Text shape
 * @returns SVG image code of a text
 */
function svg(textShape) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    var text;
    if ((_a = textShape.options) === null || _a === void 0 ? void 0 : _a.rotate) {
        text = "x=\"0\" y=\"0\" transform=\"translate(".concat(textShape.coordinates.x, ", ").concat(textShape.coordinates.y, ") rotate(").concat(textShape.options.rotate, ")\"");
    }
    else {
        text = "x=\"".concat(textShape.coordinates.x, "\" y=\"").concat(textShape.coordinates.y, "\"");
    }
    if ((_b = textShape.options) === null || _b === void 0 ? void 0 : _b.color) {
        text += " fill=\"".concat(textShape.options.color, "\"");
    }
    if ((_d = (_c = textShape.options) === null || _c === void 0 ? void 0 : _c.font) === null || _d === void 0 ? void 0 : _d.family) {
        text += " font-family=\"".concat(textShape.options.font.family, "\"");
    }
    if ((_f = (_e = textShape.options) === null || _e === void 0 ? void 0 : _e.font) === null || _f === void 0 ? void 0 : _f.size) {
        text += " font-size=\"".concat(textShape.options.font.size, "\"");
    }
    if ((_h = (_g = textShape.options) === null || _g === void 0 ? void 0 : _g.font) === null || _h === void 0 ? void 0 : _h.style) {
        text += " font-style=\"".concat(textShape.options.font.style, "\"");
    }
    if ((_k = (_j = textShape.options) === null || _j === void 0 ? void 0 : _j.font) === null || _k === void 0 ? void 0 : _k.weight) {
        text += " font-weight=\"".concat(textShape.options.font.weight, "\"");
    }
    if ((_m = (_l = textShape.options) === null || _l === void 0 ? void 0 : _l.font) === null || _m === void 0 ? void 0 : _m.variant) {
        text += " font-variant=\"".concat(textShape.options.font.variant, "\"");
    }
    if ((_p = (_o = textShape.options) === null || _o === void 0 ? void 0 : _o.font) === null || _p === void 0 ? void 0 : _p.stretch) {
        text += " font-stretch=\"".concat(textShape.options.font.stretch, "\"");
    }
    if ((_r = (_q = textShape.options) === null || _q === void 0 ? void 0 : _q.font) === null || _r === void 0 ? void 0 : _r.kerning) {
        text += " font-kerning=\"".concat(textShape.options.font.kerning, "\"");
    }
    // text align
    switch ((_t = (_s = textShape.options) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.align) {
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
    switch ((_v = (_u = textShape.options) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.baseline) {
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
    return "<text ".concat(text, ">").concat(textShape.text, "</text>");
}
/**
 * Text shape
 */
var Text = /** @class */ (function () {
    /**
     * Creates an instance of a Text shape
     * @param coordinates Text coordinates in a image
     * @param text Text to draw in an image
     * @param options Text drawing options
     */
    function Text(coordinates, text, options) {
        this.coordinates = coordinates;
        this.text = text;
        this.options = options;
    }
    Text.prototype.draw = function (context) {
        return context ? drawingContext(context, this) : svg(this);
    };
    /**
     * Measures a text
     * @param context The image context
     * @param text Text to draw in the image
     * @param font Font description
     * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics TextMetrics} object
     */
    Text.measure = function (context, text, font) {
        if (font) {
            context.save();
            context.font = fontStyleToString(font);
        }
        var result = context.measureText(text);
        if (font) {
            context.restore();
        }
        return result;
    };
    /**
     * Fits a text into a box
     * @param context The image context
     * @param text Text to draw in a box
     * @param boxSize Size of box in image
     * @param font Font description
     * @returns Font size to fit a text into a box
     */
    Text.fitIntoBox = function (context, text, boxSize, font) {
        context.save();
        if (font) {
            context.font = fontStyleToString(font);
        }
        var fontString = context.font.split(" ");
        var index = fontString.findIndex(function (item) { return /\d+px/.test(item.trim()); });
        if (index === -1) {
            throw new Error("Font size does not found in an image context");
        }
        var number = parseInt(fontString[index]);
        if (!number) {
            throw new Error("Font size does not found in an image context");
        }
        var updateFont = function () {
            fontString[index] = "".concat(number, "px");
            context.font = fontString.join(" ");
        };
        var getTextWidth = function (text) { return context.measureText(text).width; };
        var getTextHeight = function (text) { return context.measureText(text).actualBoundingBoxAscent + context.measureText(text).actualBoundingBoxDescent; };
        if (getTextWidth(text) > boxSize.width || getTextHeight(text) > boxSize.height) {
            // decrease            
            while (getTextWidth(text) > boxSize.width || getTextHeight(text) > boxSize.height) {
                number--;
                updateFont();
            }
        }
        else {
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
    };
    return Text;
}());

/**
 * Transform Record Object
 */
var Transform = /** @class */ (function () {
    function Transform(object) {
        this.object = object;
    }
    /**
     * Filters properties
     * @param properties Array of excluded properties
     * @returns Filtered object
     */
    Transform.prototype.exclude = function (properties) {
        var _this = this;
        return Object.keys(this.object)
            .filter(function (property) { return !properties.includes(property); })
            .reduce(function (result, property) {
            result[property] = _this.object[property];
            return result;
        }, {});
    };
    /**
     * Filters properties
     * @param properties List of allowed properties
     * @returns Filtered object
     */
    Transform.prototype.include = function (properties) {
        var _this = this;
        return Object.keys(this.object)
            .filter(function (property) { return properties.includes(property); })
            .reduce(function (result, property) {
            result[property] = _this.object[property];
            return result;
        }, {});
    };
    /**
     * Stringify object
     * @returns Text
     */
    Transform.prototype.stringify = function () {
        var result = "";
        for (var property in this.object) {
            result += "".concat(property, ":").concat(this.object[property], "; ");
        }
        return result.trim();
    };
    /**
     * Stringify object values
     * @returns Text
     */
    Transform.prototype.values = function () {
        var result = "";
        for (var property in this.object) {
            result += "".concat(this.object[property], " ");
        }
        return result.trim();
    };
    /**
     * Parses text
     * @param text Source text
     * @returns Parsed object
     */
    Transform.parse = function (text) {
        var pairs = text.trim().split(";").map(function (item) { return item.trim(); });
        var object = {};
        for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
            var pair = pairs_1[_i];
            var _a = pair.split(":").map(function (item) { return item.trim(); }), key = _a[0], value = _a[1];
            object[key] = value;
        }
        return object;
    };
    return Transform;
}());

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Builder: Builder,
    Circle: Circle,
    Curve: Curve,
    Line: Line,
    Point: Point,
    Rectangle: Rectangle,
    Text: Text,
    Transform: Transform
});

var index = /*#__PURE__*/Object.freeze({
    __proto__: null
});

exports.interfaces = index;
exports.models = index$1;
//# sourceMappingURL=shape-builder.node.js.map
