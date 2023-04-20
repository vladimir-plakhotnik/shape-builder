/**
 * Point object is used to set a coordinate point
 */
export default class Point {
    /**
     * Creates an instance of a Point
     * @param x X coordinate
     * @param y Y coordinate
     */
    constructor(public readonly x: number, public readonly y: number) { }

    /**
     * Adds a point to the current one and returns a new point
     * @param point A point object
     * @returns New point
     */
    add(point: Point): Point {
        return new Point(this.x + point.x, this.y + point.y);
    }

    /**
     * Subtracts a point from the current one and returns a new point
     * @param point A point object
     * @returns New point
     */
    subtract(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }
}
