import {ICanvas} from "./ICanvas";
import {IShape} from "./shape/IShape";

class Point {
	constructor(
		public readonly x: number,
		public readonly y: number,
	) {}
}

function circleDrawingStrategy(canvas: ICanvas, shape: IShape) {
	const frame = shape.getFrame()
	const outlineStyle = shape.getOutlineStyle();
	const fillStyle = shape.getFillStyle();
	canvas.setLineColor(outlineStyle?.getColor());
	canvas.setFillColor(fillStyle?.getColor());
	canvas.drawEllipse(frame.left, frame.top, frame.width, frame.height);
}

function makePolygonDrawingStrategy(pointCount: number) {
	return (canvas: ICanvas, shape: IShape) => {
		const frame = shape.getFrame();
		const outlineStyle = shape.getOutlineStyle();
		const fillStyle = shape.getFillStyle();

		const centerX = frame.left + frame.width / 2;
		const centerY = frame.top + frame.height / 2;
		const radiusX = frame.width / 2;
		const radiusY = frame.height / 2;

		const points: Point[] = [];
		const angleStep = (2 * Math.PI) / pointCount;

		for (let i = 0; i < pointCount; i++) {
			const angle = i * angleStep - Math.PI / 2;
			const x = centerX + radiusX * Math.cos(angle);
			const y = centerY + radiusY * Math.sin(angle);
			points.push(new Point(x, y));
		}

		canvas.setLineColor(outlineStyle?.getColor());
		canvas.setFillColor(fillStyle?.getColor());
		canvas.drawPolygon(points);
	}
}

export {circleDrawingStrategy, makePolygonDrawingStrategy, Point};