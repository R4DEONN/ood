import {IObservable, IObserver} from "../Observer";
import {Rect} from "../CommonTypes";
import {IOutlineStyle, IStyle} from "../style/IStyle";
import {IDrawable} from "./IDrawable";

interface IShape extends IDrawable, IObservable<void> {
	getFrame(): Rect;

	setFrame(rect: Rect): void;

	getOutlineStyle(): IOutlineStyle;

	setOutlineStyle(style: IStyle): void;

	getFillStyle(): IStyle;

	setFillStyle(style: IStyle): void;

	getGroup(): IGroupShape | undefined;

	clone(): IShape;
}

interface IShapes {
	getShapesCount(): number;

	insertShape(shape: IShape, position?: number): void;

	getShapeAtIndex(index: number): IShape;

	removeShapeAtIndex(index: number): void;
}

interface IGroupShape extends IShape, IShapes, IObserver<void> {
}

export {IShape, IShapes, IGroupShape};