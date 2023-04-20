/**
 * Point object is used to set a coordinate point
 */
export default class Point {
    readonly x: number;
    readonly y: number;
    /**
     * Creates an instance of a Point
     * @param x X coordinate
     * @param y Y coordinate
     */
    constructor(x: number, y: number);
    /**
     * Adds a point to the current one and returns a new point
     * @param point A point object
     * @returns New point
     */
    add(point: Point): Point;
    /**
     * Subtracts a point from the current one and returns a new point
     * @param point A point object
     * @returns New point
     */
    subtract(point: Point): Point;
}
