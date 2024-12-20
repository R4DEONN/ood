import {Shape} from "../Shape/Shape";

class PictureDraft {
	private _shapes: Shape[] = [];

	addShape(shape: Shape) {
		this._shapes.push(shape);
	}

	getShape(index: number): Shape {
		return this._shapes[index];
	}

	getShapeCount(): number {
		return this._shapes.length;
	}
}

export {PictureDraft};