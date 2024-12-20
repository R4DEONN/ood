import {Shape} from "../Shape/Shape";

interface IShapeFactory {
	createShape(description: string): Shape;
}

export { IShapeFactory };