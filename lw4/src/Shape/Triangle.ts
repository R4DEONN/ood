import {Shape} from "./Shape";
import {Color} from "../Color";
import {Point} from "../Point";
import {ICanvas} from "../Canvas/ICanvas";

class Triangle extends Shape {
	constructor(
		color: Color,
		private _firstVertex: Point,
		private _secondVertex: Point,
		private _thirdVertex: Point,
	) {
		super(color);
	}

	draw(canvas: ICanvas) {
		canvas.setColor(this._color);
		canvas.drawPolygon([this._firstVertex, this._secondVertex, this._thirdVertex])
	}

	getVertex(index: number): Point {
		switch (index) {
			case 1:
				return this._firstVertex;
			case 2:
				return this._secondVertex;
			case 3:
				return this._thirdVertex;
			default:
				throw new Error("Unknown Vertex index");
		}
	}
}

export {Triangle};