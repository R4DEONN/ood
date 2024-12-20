import {IDrawingStrategy} from "./IDrawingStrategy";
import {ICanvas} from "../gfx/ICanvas";
import {ShapeType} from "../shapes/ShapeType";
import {Point} from "../shapes/Point";

class RectangleDrawingStrategy implements IDrawingStrategy {
	#leftTop: Point
	#width: number
	#height: number

	constructor(leftTop: Point, width: number, height: number) {
		this.#leftTop = leftTop
		this.#width = width
		this.#height = height
	}

	draw(canvas: ICanvas, color: string) {
		canvas.setColor(color)
		canvas.drawRectangle(this.#leftTop, this.#width, this.#height)
	}

	getType(): ShapeType {
		return ShapeType.RECTANGLE
	}

	move(dx: number, dy: number): void {
		this.#leftTop.x += dx
		this.#leftTop.y += dy
	}

	getParameterString(): string {
		return `${this.#leftTop.x} ${this.#leftTop.y} ${this.#width} ${this.#height}`
	}
}

export {RectangleDrawingStrategy}