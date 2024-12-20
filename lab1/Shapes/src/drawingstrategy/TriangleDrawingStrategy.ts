import {IDrawingStrategy} from "./IDrawingStrategy";
import {ICanvas} from "../gfx/ICanvas";
import {ShapeType} from "../shapes/ShapeType";
import {Point} from "../shapes/Point";

class TriangleDrawingStrategy implements IDrawingStrategy {
	#firstPoint: Point
	#secondPoint: Point
	#thirdPoint: Point

	constructor(firstPoint: Point, secondPoint: Point, thirdPoint: Point) {
		this.#firstPoint = firstPoint
		this.#secondPoint = secondPoint
		this.#thirdPoint = thirdPoint
	}

	draw(canvas: ICanvas, color: string): void {
		canvas.setColor(color)
		canvas.drawPolygon([this.#firstPoint, this.#secondPoint, this.#thirdPoint])
	}

	getType(): ShapeType {
		return ShapeType.TRIANGLE;
	}

	move(dx: number, dy: number): void {
		this.#firstPoint.x += dx
		this.#firstPoint.y += dy
		this.#secondPoint.x += dx
		this.#secondPoint.y += dy
		this.#thirdPoint.x += dx
		this.#thirdPoint.y += dy
	}

	getParameterString(): string {
		return `${this.#firstPoint.x} ${this.#firstPoint.y} ${this.#secondPoint.x} ${this.#secondPoint.y} ${this.#thirdPoint.x} ${this.#thirdPoint.y}`
	}
}

export {TriangleDrawingStrategy}