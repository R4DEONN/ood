import {Shape} from "./Shape";
import {ICanvas} from "../Canvas/ICanvas";
import {Point} from "../Point";
import {Color} from "../Color";

class RegularPolygon extends Shape {
	constructor(
		color: Color,
		private _center: Point,
		private _radius: number,
		private _vertexCount: number,
	) {
		if (_vertexCount < 3) {
			throw new Error("VertexCount must be more than 2");
		}
		super(color);
	}

	draw(canvas: ICanvas) {
		const points: Point[] = [];
		const angleStep = (2 * Math.PI) / this._vertexCount;
		for (let i = 0; i < this._vertexCount; i++) {
			const angle = i * angleStep - Math.PI / 2;
			const x = this._center.x + this._radius * Math.cos(angle);
			const y = this._center.y + this._radius * Math.sin(angle);
			points.push(new Point(x, y));
		}

		canvas.setColor(this._color);
		canvas.drawPolygon(points);
	}

	getCenter(): Point {
		return this._center;
	}

	getVertexCount(): number {
		return this._vertexCount;
	}
}

export { RegularPolygon };