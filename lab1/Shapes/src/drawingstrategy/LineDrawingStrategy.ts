import {IDrawingStrategy} from "./IDrawingStrategy";
import {Point} from "../shapes/Point";
import {ICanvas} from "../gfx/ICanvas";
import {ShapeType} from "../shapes/ShapeType";

class LineDrawingStrategy implements IDrawingStrategy {
	#firstPoint: Point
	#secondPoint: Point

	constructor(firstPoint: Point, secondPoint: Point) {
		this.#firstPoint = firstPoint
		this.#secondPoint = secondPoint
	}

	draw(canvas: ICanvas, color: string): void {
		canvas.setColor(color)
		canvas.drawLine(this.#firstPoint, this.#secondPoint)
	}

	getType(): ShapeType {
		return ShapeType.LINE;
	}

	move(dx: number, dy: number): void {
		this.#firstPoint.x += dx
		this.#firstPoint.y += dy
		this.#secondPoint.x += dx
		this.#secondPoint.y += dy
	}

	getParameterString(): string {
		return `${this.#firstPoint.x} ${this.#firstPoint.y} ${this.#secondPoint.x} ${this.#secondPoint.y}`
	}
}

export {LineDrawingStrategy}