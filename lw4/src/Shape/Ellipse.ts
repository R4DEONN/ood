import {Shape} from "./Shape";
import {Color} from "../Color";
import {Point} from "../Point";
import {ICanvas} from "../Canvas/ICanvas";

class Ellipse extends Shape {
	constructor(
		color: Color,
		private _center: Point,
		private _horizontalRadius: number,
		private _verticalRadius: number,
	) {
		super(color);
	}

	draw(canvas: ICanvas) {
		canvas.setColor(this._color);
		canvas.drawEllipse(this._center, this._horizontalRadius, this._verticalRadius);
	}

	getCenter(): Point {
		return this._center;
	}

	getHorizontalRadius(): number {
		return this._horizontalRadius;
	}

	getVerticalRadius(): number {
		return this._verticalRadius;
	}
}

export {Ellipse};