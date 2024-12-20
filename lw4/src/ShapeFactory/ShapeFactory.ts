import {IShapeFactory} from "./IShapeFactory";
import {Shape} from "../Shape/Shape";
import {Color} from "../Color";
import {Rectangle} from "../Shape/Rectangle";
import {RegularPolygon} from "../Shape/RegularPolygon";
import {Triangle} from "../Shape/Triangle";
import {Ellipse} from "../Shape/Ellipse";

class ShapeFactory implements IShapeFactory {
	createShape(description: string): Shape {
		let splitDescription = description.split(' ');
		const shapeType: string = splitDescription[0];
		const color: Color = splitDescription[1] as Color
		const params = splitDescription.slice(2).map((param) => Number(param));

		switch (shapeType) {
			case 'rectangle':
				return new Rectangle(
					color,
					{x: params[0], y: params[1]},
					params[2],
					params[3],
				);
			case 'regularpolygon':
				return new RegularPolygon(
					color,
					{x: params[0], y: params[1]},
					params[2],
					params[3],
				);
			case 'triangle':
				return new Triangle(
					color,
					{x: params[0], y: params[1]},
					{x: params[2], y: params[3]},
					{x: params[4], y: params[5]},
				);
			case 'ellipse':
				return new Ellipse(
					color,
					{x: params[0], y: params[1]},
					params[2],
					params[3],
				);
			default:
				throw new Error('Unsupported shape type');
		}
	}
}

export {ShapeFactory};