import {IDrawingStrategy} from "./IDrawingStrategy";
import {ICanvas} from "../gfx/ICanvas";
import {ShapeType} from "../shapes/ShapeType";
import {Point} from "../shapes/Point";

class CircleDrawingStrategy implements IDrawingStrategy {
	#center: Point
	#radius: number

	constructor(center: Point, radius: number) {
		this.#center = center
		this.#radius = radius
	}

	draw(canvas: ICanvas, color: string): void {
		canvas.setColor(color)
		canvas.drawEllipse(this.#center, this.#radius, this.#radius)
	}

	getType(): ShapeType {
		return ShapeType.CIRCLE;
	}

	move(dx: number, dy: number): void {
		this.#center.x += dx
		this.#center.y += dy
	}

	getParameterString(): string {
		return `${this.#center.x} ${this.#center.y} ${this.#radius}`
	}
}

export {CircleDrawingStrategy}