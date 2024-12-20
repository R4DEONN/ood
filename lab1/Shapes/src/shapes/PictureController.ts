import {Picture} from "./Picture";
import {ShapeType} from "./ShapeType";
import {Shape} from "./Shape";
import {RectangleDrawingStrategy} from "../drawingstrategy/RectangleDrawingStrategy";
import {IDrawingStrategy} from "../drawingstrategy/IDrawingStrategy";
import {TriangleDrawingStrategy} from "../drawingstrategy/TriangleDrawingStrategy";
import {CircleDrawingStrategy} from "../drawingstrategy/CircleDrawingStrategy";
import {LineDrawingStrategy} from "../drawingstrategy/LineDrawingStrategy";
import {TextDrawingStrategy} from "../drawingstrategy/TextDrawingStrategy";

enum Commands {
	ADD_SHAPE = "AddShape",
	DRAW_SHAPE = "DrawShape",
	DRAW = "DrawPicture",
	MOVE_PICTURE = "MovePicture",
	MOVE_SHAPE = "MoveShape",
	DELETE_SHAPE = "DeleteShape",
	LIST = "List",
	CHANGE_SHAPE_COLOR = "ChangeColor",
	CHANGE_SHAPE = "ChangeShape",
}

class PictureController {
	#picture: Picture

	constructor(picture: Picture) {
		this.#picture = picture
	}

	applyCommand(commandLine: string): boolean {
		try {

			const params = commandLine.split(" ")
			switch (params[0] as Commands) {
				case Commands.ADD_SHAPE: {
					const shape = this._createShape(params[3] as ShapeType, params.slice(2));
					this.#picture.addShape(params[1], shape)
					return true
				}
				case Commands.DRAW_SHAPE: {
					this.#picture.drawShape(params[1])
					return true
				}
				case Commands.DRAW: {
					this.#picture.draw()
					return true
				}
				case Commands.MOVE_PICTURE: {
					this.#picture.enumerateShapes((shape) => shape.move(+params[1], +params[2]))
					return true
				}
				case Commands.MOVE_SHAPE: {
					const shape = this.#picture.getShape(params[1])
					shape?.move(+params[2], +params[3])
					return true
				}
				case Commands.DELETE_SHAPE: {
					this.#picture.deleteShape(params[1])
					return true
				}
				case Commands.LIST: {
					let index = 1
					this.#picture.enumerateShapes((shape, id) => {
						console.log(`${index} ${shape.getType()} ${id} ${shape.getColor()} ${shape.getParameterString()}`)
						index++
					})
					return true
				}
				case Commands.CHANGE_SHAPE_COLOR: {
					const shape = this.#picture.getShape(params[1])
					shape?.setColor(params[2])
					return true
				}
				case Commands.CHANGE_SHAPE: {
					const newDrawingStrategy = this._createStrategy(params[2] as ShapeType, params.slice(3))
					const shape = this.#picture.getShape(params[1])
					shape?.setDrawingStrategy(newDrawingStrategy)
					return true
				}
				default:
					return false
			}
		}
		catch (e: Error)
		{
			console.error(e.message)
		}
		return false;
	}

	_createShape(type: ShapeType, params: Array<string>) {
		const strategyParams = params.slice(2)
		const strategy = this._createStrategy(type, strategyParams)

		return new Shape(params[0], strategy)
	}

	_createStrategy(type: ShapeType, params: Array<string>): IDrawingStrategy {
		switch (type) {
			case ShapeType.RECTANGLE:
				return new RectangleDrawingStrategy({x: +params[0], y: +params[1]}, +params[2], +params[3])
			case ShapeType.TRIANGLE:
				return new TriangleDrawingStrategy(
					{x: +params[0], y: +params[1]},
					{x: +params[2], y: +params[3]},
					{x: +params[4], y: +params[5]}
				)
			case ShapeType.CIRCLE:
				return new CircleDrawingStrategy(
					{x: +params[0], y: +params[1]},
					+params[2]
				)
			case ShapeType.LINE:
				return new LineDrawingStrategy(
					{x: +params[0], y: +params[1]},
					{x: +params[2], y: +params[3]},
				)
			case ShapeType.TEXT:
				return new TextDrawingStrategy(
					{x: +params[0], y: +params[1]},
					+params[2],
					params.slice(3).join(' ')
				)
			default:
				throw new Error("Wrong shape type")
		}
	}
}

export {PictureController}