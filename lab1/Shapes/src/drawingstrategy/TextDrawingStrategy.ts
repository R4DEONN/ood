import {IDrawingStrategy} from "./IDrawingStrategy";
import {Point} from "../shapes/Point";
import {ICanvas} from "../gfx/ICanvas";
import {ShapeType} from "../shapes/ShapeType";

class TextDrawingStrategy implements IDrawingStrategy {
	#text: string
	#leftTop: Point
	#textSize: number

	constructor(leftTop: Point, textSize: number, text: string) {
		this.#leftTop = leftTop
		this.#text = text
		this.#textSize = textSize
	}

	draw(canvas: ICanvas, color: string): void {
		canvas.setColor(color)
		canvas.drawText(this.#leftTop, this.#textSize, this.#text)
	}

	getType(): ShapeType {
		return ShapeType.TEXT;
	}

	move(dx: number, dy: number): void {
		this.#leftTop.x += dx
		this.#leftTop.y += dy
	}

	getParameterString(): string {
		return `${this.#leftTop.x} ${this.#leftTop.y} ${this.#textSize} ${this.#text}`
	}
}

export {TextDrawingStrategy}