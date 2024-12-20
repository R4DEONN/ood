import {ICanvas} from "../Canvas/ICanvas";
import {Color, colorEnumToColorString} from "../Color";

class Shape {
	protected _color: string;

	constructor(color: Color) {
		this._color = colorEnumToColorString(color);
	}

	draw(canvas: ICanvas): void {
		throw new Error("Not implemented.");
	}

	getColor(): string {
		return this._color;
	}
}

export {Shape};