import {Point} from "./drawingStrategy";

interface ICanvas {
	setLineColor(color?: number): void;
	setFillColor(color?: number): void;
	drawPolygon(points: Array<Point>): void;
	drawEllipse(left: number, top: number, width: number, height: number): void;
}

export {ICanvas};