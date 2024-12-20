import {ShapeType} from "./ShapeType";
import {Shape} from "./Shape";
import {ICanvas} from "../gfx/ICanvas";
import {IDrawingStrategy} from "../drawingstrategy/IDrawingStrategy";
import {RectangleDrawingStrategy} from "../drawingstrategy/RectangleDrawingStrategy";
import {Point} from "./Point";

class Picture {
	#shapes: Map<string, Shape> = new Map<string, Shape>
	#canvas: ICanvas

	constructor(canvas: ICanvas) {
		this.#canvas = canvas
	}

	draw() {
		this.#shapes.forEach((shape) => shape.draw(this.#canvas))
	}

	enumerateShapes(cb: (shape: Shape, id?: string) => void) {
		this.#shapes.forEach(cb)
	}

	addShape(id: string, shape: Shape) {
		this.#shapes.set(id, shape)
	}

	drawShape(id: string) {
		this.#shapes.get(id)?.draw(this.#canvas)
	}

	getShape(id: string): Shape|undefined {
		return this.#shapes.get(id);
	}

	deleteShape(id: string) {
		if (this.#shapes.has(id))
		{
			this.#shapes.delete(id)
		}
		else
		{
			throw new Error(`Shape with id ${id} doesn't exist`)
		}
	}

	setCanvas(canvas: ICanvas) {
		this.#canvas = canvas
	}
}

export {Picture}