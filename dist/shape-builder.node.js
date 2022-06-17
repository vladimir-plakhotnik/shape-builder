'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());

function drawingContext$5(context, line) {
    var _a, _b, _c;
    context.save();
    if ((_a = line.options) === null || _a === void 0 ? void 0 : _a.color) {
        context.strokeStyle = line.options.color;
    }
    if ((_b = line.options) === null || _b === void 0 ? void 0 : _b.thickness) {
        context.lineWidth = line.options.thickness;
    }
    if ((_c = line.options) === null || _c === void 0 ? void 0 : _c.dash) {
        context.setLineDash(line.options.dash);
    }
    context.beginPath();
    context.moveTo(line.start.x, line.start.y);
    context.lineTo(line.end.x, line.end.y);
    context.stroke();
    context.closePath();
    context.restore();
}
function svg$5(lineObject) {
    var _a, _b, _c;
    var line = "x1=\"".concat(lineObject.start.x, "\" y1=\"").concat(lineObject.start.y, "\" x2=\"").concat(lineObject.end.x, "\" y2=\"").concat(lineObject.end.y, "\"");
    if ((_a = lineObject.options) === null || _a === void 0 ? void 0 : _a.color) {
        line += " stroke=\"".concat(lineObject.options.color, "\"");
    }
    if ((_b = lineObject.options) === null || _b === void 0 ? void 0 : _b.thickness) {
        line += " stroke-width=\"".concat(lineObject.options.thickness, "\"");
    }
    if ((_c = lineObject.options) === null || _c === void 0 ? void 0 : _c.dash) {
        line += " stroke-dasharray=\"".concat(lineObject.options.dash.join(","), "\"");
    }
    return "<line ".concat(line, " />");
}
var Line = /** @class */ (function () {
    function Line(start, end, options) {
        this.start = start;
        this.end = end;
        this.options = options;
    }
    Line.prototype.draw = function (context) {
        return context ? drawingContext$5(context, this) : svg$5(this);
    };
    return Line;
}());

function drawingContext$4(context, curve) {
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
function svg$4(curve) {
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
var Curve = /** @class */ (function () {
    function Curve(points, options) {
        this.points = points;
        this.options = options;
    }
    Curve.prototype.draw = function (context) {
        return context ? drawingContext$4(context, this) : svg$4(this);
    };
    return Curve;
}());

function drawingContext$3(context, rectangle) {
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
function svg$3(rectangle) {
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
var Rectangle = /** @class */ (function () {
    function Rectangle(coordinates, width, height, options) {
        this.coordinates = coordinates;
        this.width = width;
        this.height = height;
        this.options = options;
    }
    Rectangle.prototype.draw = function (context) {
        return context ? drawingContext$3(context, this) : svg$3(this);
    };
    return Rectangle;
}());

function drawingContext$2(context, circle) {
    var _a, _b, _c, _d, _e;
    context.save();
    if ((_a = circle.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        context.fillStyle = circle.options.fillColor;
    }
    if ((_b = circle.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        context.strokeStyle = circle.options.borderColor;
    }
    if ((_c = circle.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        context.lineWidth = circle.options.thickness;
    }
    if ((_d = circle.options) === null || _d === void 0 ? void 0 : _d.dash) {
        context.setLineDash(circle.options.dash);
    }
    context.beginPath();
    context.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI, false);
    context.closePath();
    if ((_e = circle.options) === null || _e === void 0 ? void 0 : _e.fillColor) {
        context.fill();
    }
    context.stroke();
    context.restore();
}
function svg$2(circleObject) {
    var _a, _b, _c, _d;
    var circle = "cx=\"".concat(circleObject.center.x, "\" cy=\"").concat(circleObject.center.y, "\" r=\"").concat(circleObject.radius, "\"");
    if ((_a = circleObject.options) === null || _a === void 0 ? void 0 : _a.fillColor) {
        circle += " fill=\"".concat(circleObject.options.fillColor, "\"");
    }
    else {
        circle += " fill=\"none\"";
    }
    if ((_b = circleObject.options) === null || _b === void 0 ? void 0 : _b.borderColor) {
        circle += " stroke=\"".concat(circleObject.options.borderColor, "\"");
    }
    if ((_c = circleObject.options) === null || _c === void 0 ? void 0 : _c.thickness) {
        circle += " stroke-width=\"".concat(circleObject.options.thickness, "\"");
    }
    if ((_d = circleObject.options) === null || _d === void 0 ? void 0 : _d.dash) {
        circle += " stroke-dasharray=\"".concat(circleObject.options.dash.join(","), "\"");
    }
    return "<circle ".concat(circle, " />");
}
var Circle = /** @class */ (function () {
    function Circle(center, radius, options) {
        this.center = center;
        this.radius = radius;
        this.options = options;
    }
    Circle.prototype.draw = function (context) {
        return context ? drawingContext$2(context, this) : svg$2(this);
    };
    return Circle;
}());

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
function drawingContext$1(context, text) {
    var _a, _b, _c, _d;
    context.save();
    if ((_a = text.options) === null || _a === void 0 ? void 0 : _a.color) {
        context.fillStyle = text.options.color;
    }
    if ((_b = text.options) === null || _b === void 0 ? void 0 : _b.font) {
        context.font = fontStyleToString(text.options.font);
    }
    if ((_c = text.options) === null || _c === void 0 ? void 0 : _c.text) {
        context.textAlign = text.options.text.align;
        context.textBaseline = text.options.text.baseline;
    }
    if ((_d = text.options) === null || _d === void 0 ? void 0 : _d.rotate) {
        context.translate(text.coordinates.x, text.coordinates.y);
        context.rotate(text.options.rotate * Math.PI / 180);
        context.fillText(text.text, 0, 0);
    }
    else {
        context.fillText(text.text, text.coordinates.x, text.coordinates.y);
    }
    context.restore();
}
function svg$1(textObject) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    var text;
    if ((_a = textObject.options) === null || _a === void 0 ? void 0 : _a.rotate) {
        text = "x=\"0\" y=\"0\" transform=\"translate(".concat(textObject.coordinates.x, ", ").concat(textObject.coordinates.y, ") rotate(").concat(textObject.options.rotate, ")\"");
    }
    else {
        text = "x=\"".concat(textObject.coordinates.x, "\" y=\"").concat(textObject.coordinates.y, "\"");
    }
    if ((_b = textObject.options) === null || _b === void 0 ? void 0 : _b.color) {
        text += " fill=\"".concat(textObject.options.color, "\"");
    }
    if ((_d = (_c = textObject.options) === null || _c === void 0 ? void 0 : _c.font) === null || _d === void 0 ? void 0 : _d.family) {
        text += " font-family=\"".concat(textObject.options.font.family, "\"");
    }
    if ((_f = (_e = textObject.options) === null || _e === void 0 ? void 0 : _e.font) === null || _f === void 0 ? void 0 : _f.size) {
        text += " font-size=\"".concat(textObject.options.font.size, "\"");
    }
    if ((_h = (_g = textObject.options) === null || _g === void 0 ? void 0 : _g.font) === null || _h === void 0 ? void 0 : _h.style) {
        text += " font-style=\"".concat(textObject.options.font.style, "\"");
    }
    if ((_k = (_j = textObject.options) === null || _j === void 0 ? void 0 : _j.font) === null || _k === void 0 ? void 0 : _k.weight) {
        text += " font-weight=\"".concat(textObject.options.font.weight, "\"");
    }
    if ((_m = (_l = textObject.options) === null || _l === void 0 ? void 0 : _l.font) === null || _m === void 0 ? void 0 : _m.variant) {
        text += " font-variant=\"".concat(textObject.options.font.variant, "\"");
    }
    if ((_p = (_o = textObject.options) === null || _o === void 0 ? void 0 : _o.font) === null || _p === void 0 ? void 0 : _p.stretch) {
        text += " font-stretch=\"".concat(textObject.options.font.stretch, "\"");
    }
    if ((_r = (_q = textObject.options) === null || _q === void 0 ? void 0 : _q.font) === null || _r === void 0 ? void 0 : _r.kerning) {
        text += " font-kerning=\"".concat(textObject.options.font.kerning, "\"");
    }
    // text align
    switch ((_t = (_s = textObject.options) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.align) {
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
    switch ((_v = (_u = textObject.options) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.baseline) {
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
    return "<text ".concat(text, ">").concat(textObject.text, "</text>");
}
var Text = /** @class */ (function () {
    function Text(coordinates, text, options) {
        this.coordinates = coordinates;
        this.text = text;
        this.options = options;
    }
    Text.prototype.draw = function (context) {
        return context ? drawingContext$1(context, this) : svg$1(this);
    };
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

function drawingContext(context, builder) {
    builder.shapes.forEach(function (shape) { return shape.draw(context); });
}
function svg(width, height, builder) {
    return "<svg width=\"".concat(width, "\" height=\"").concat(height, "\">\n").concat(builder.shapes.map(function (item) { return item.draw(); }).join("\n"), "\n</svg>");
}
var Builder = /** @class */ (function () {
    function Builder(shapes) {
        this.shapes = shapes;
    }
    Builder.prototype.draw = function (width, height) {
        if (typeof width === "function" || typeof width === "object") {
            return drawingContext(width, this);
        }
        if (typeof width === "number" && typeof height === "number") {
            return svg(width, height, this);
        }
        throw new TypeError("Wrong arguments.");
    };
    return Builder;
}());

exports.Builder = Builder;
exports.Circle = Circle;
exports.Curve = Curve;
exports.Line = Line;
exports.Point = Point;
exports.Rectangle = Rectangle;
exports.Text = Text;
//# sourceMappingURL=shape-builder.node.js.map
