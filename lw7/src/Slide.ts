import {ICanvas} from "./ICanvas";
import {IShape} from "./shape/IShape";
import {ShapeCollection} from "./shape/Shape";

class Slide {
	private _shapeCollection: ShapeCollection = new ShapeCollection();
	private _backgroundColor?: number = undefined;

	constructor(
		private _width: number,
		private _height: number) {
	}

	draw(canvas: ICanvas): void {
		this._shapeCollection.enumerateShapes((shape: IShape) => shape.draw(canvas));
	}

	getWidth(): number {
		return this._width;
	}

	getHeight(): number {
		return this._height;
	}

	getShapesCount(): number {
		return this._shapeCollection.getShapesCount();
	}

	getShapeAtIndex(index: number): IShape {
		return this._shapeCollection.getShapeAtIndex(index);
	}

	insertShape(shape: IShape, position?: number): void {
		this._shapeCollection.insertShape(shape, position);
	}

	removeShapeAtIndex(index: number): void {
		this._shapeCollection.removeShapeAtIndex(index);
	}

	getBackgroundColor(): number | undefined {
		return this._backgroundColor;
	}

	setBackgroundColor(value: number): void {
		this._backgroundColor = value;
	}
}

export {Slide};