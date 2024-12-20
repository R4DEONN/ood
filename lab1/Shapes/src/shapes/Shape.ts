import {ShapeType} from "./ShapeType";
import {IDrawingStrategy} from "../drawingstrategy/IDrawingStrategy";
import {ICanvas} from "../gfx/ICanvas";

class Shape {
	#color: string
	#drawingStrategy: IDrawingStrategy

	constructor(color: string, drawingStrategy: IDrawingStrategy) {
		this.#color = color
		this.#drawingStrategy = drawingStrategy
	}

	draw(canvas: ICanvas) {
		this.#drawingStrategy.draw(canvas, this.#color)
	}

	move(dx: number, dy: number) {
		this.#drawingStrategy.move(dx, dy)
	}

	getType(): string {
		return this.#drawingStrategy.getType()
	}

	getColor(): string {
		return this.#color
	}

	setColor(color: string) {
		this.#color = color
	}

	getParameterString(): string {
		return this.#drawingStrategy.getParameterString()
	}

	setDrawingStrategy(drawingStrategy: IDrawingStrategy) {
		this.#drawingStrategy = drawingStrategy
	}
}

export {Shape}