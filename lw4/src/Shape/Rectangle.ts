import {Shape} from "./Shape";
import {ICanvas} from "../Canvas/ICanvas";
import {Color} from "../Color";
import {Point} from "../Point";

class Rectangle extends Shape {
	constructor(
		color: Color,
		private _leftTop: Point,
		private _width: number,
		private _height: number,
	) {
		super(color);
	}

	draw(canvas: ICanvas) {
		canvas.setColor(this._color);
		canvas.drawRectangle(this._leftTop, this._width, this._height);
	}

	getLeftTop(): Point {
		return this._leftTop;
	}

	getRightBottom(): Point {
		return {
			x: this._leftTop.x + this._width,
			y: this._leftTop.y + this._height,
		};
	}
}

export {Rectangle};