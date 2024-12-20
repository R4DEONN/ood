import {Color} from "../Color";
import {Point} from "../Point";

interface ICanvas {
	setColor(color: string): void;
	drawRectangle(leftTop: Point, width: number, height: number): void
	drawPolygon(points: Array<Point>): void
	drawEllipse(center: Point, rx: number, ry: number): void
}

export {ICanvas};