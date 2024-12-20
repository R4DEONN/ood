import {ICanvas} from "../gfx/ICanvas";
import {ShapeType} from "../shapes/ShapeType";

interface IDrawingStrategy {
	getType(): ShapeType //TODO: заменить на string
	draw(canvas: ICanvas, color: string): void
	move(dx: number, dy: number): void
	getParameterString(): string
}

export {IDrawingStrategy}