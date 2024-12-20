import {Point} from "../shapes/Point";

interface ICanvas {
	setColor(color: string): void
	moveTo(point: Point): void
	lineTo(point: Point): void
	drawRectangle(leftTop: Point, width: number, height: number): void
	drawEllipse(center: Point, rx: number, ry: number): void
	drawPolygon(points: Array<Point>): void
	drawLine(firstPoint: Point, secondPoint: Point): void
	drawText(leftTop: Point, fontSize: number, text: string): void
}

export {ICanvas}