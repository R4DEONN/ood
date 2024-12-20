import {ICanvas} from "../ICanvas";
import {IObserver, Observable} from "../Observer";
import {Rect} from "../CommonTypes";
import {IOutlineStyle, IStyle} from "../style/IStyle";
import {IGroupShape, IShape, IShapes} from "./IShape";
import {OutlineStyle, Style} from "../style/Style";
import {GroupFillStyle, GroupOutlineStyle} from "../style/GroupStyle";

type DrawingStrategy = (canvas: ICanvas, shape: IShape) => void;

class Shape extends Observable<void> implements IShape {

	constructor(
		private _drawingStrategy: DrawingStrategy,
		private _fillStyle: IStyle,
		private _strokeStyle: IOutlineStyle,
		private _frame: Rect,
	) {
		super();
	}

	draw(canvas: ICanvas): void {
		this._drawingStrategy(canvas, this);
	}

	getFillStyle(): IStyle {
		return this._fillStyle;
	}

	getFrame(): Rect {
		return this._frame;
	}

	getGroup(): IGroupShape | undefined {
		return undefined;
	}

	getOutlineStyle(): IOutlineStyle {
		return this._strokeStyle;
	}

	setFrame(rect: Rect): void {
		this._frame = rect;
		this.notifyObservers()
	}

	setFillStyle(style: IStyle): void {
		this._fillStyle = style;
	}

	setOutlineStyle(style: IOutlineStyle): void {
		this._strokeStyle = style;
	}

	clone(): IShape {
		return new Shape(this._drawingStrategy,
			new Style(this._fillStyle.getColor()),
			new OutlineStyle(this._strokeStyle.getColor(), this._strokeStyle.getLineHeight()),
			new Rect(this._frame.left, this._frame.top, this._frame.width, this._frame.height));
	}
}

class ShapeCollection implements IShapes {
	private readonly _shapes: IShape[]

	constructor(...shapes: IShape[]) {
		this._shapes = shapes;
	}

	getShapesCount(): number {
		return this._shapes.length;
	}

	getShapeAtIndex(index: number): IShape {
		const shape = this._shapes[index];
		if (!shape) {
			throw new Error("Shape does not exist");
		}
		return shape;
	}

	insertShape(shape: IShape, position?: number): void {
		if (position === undefined) {
			this._shapes.push(shape);
		} else {
			if (position < 0 || position > this._shapes.length) {
				throw new Error("Position out of bounds");
			}
			this._shapes.splice(position, 0, shape);
		}
	}

	removeShapeAtIndex(index: number): void {
		if (index >= 0 && index < this._shapes.length) {
			this._shapes.splice(index, 1);
			return;
		}

		throw new Error("Shape does not exist");
	}

	enumerateShapes(cb: (shape: IShape) => void): void {
		this._shapes.forEach(cb);
	}
}

//TODO: неправильно фрейм считается
function calculateShape(wholeFrame: Rect, framePiece: Rect) {
	if (framePiece.top < wholeFrame.top) {
		wholeFrame.top = framePiece.top;
	}
	if (framePiece.left < wholeFrame.left) {
		wholeFrame.left = framePiece.left;
	}
	if (framePiece.width > wholeFrame.width) {
		wholeFrame.width = framePiece.width;
	}
	if (framePiece.height > wholeFrame.height) {
		wholeFrame.height = framePiece.height;
	}
}

class GroupShape extends ShapeCollection implements IGroupShape, IObserver<void> {
	private _observers: Map<IObserver<void>, number> = new Map();
	private _frame: Rect = new Rect(0, 0, 0, 0);
	private _fillStyle = new GroupFillStyle();
	private _outlineStyle = new GroupOutlineStyle();

	constructor(...shapes: IShape[]) {
		super(...shapes);

		this.enumerateShapes((shape: IShape) => {
			shape.registerObserver(this);
			this._fillStyle.insertStyle(shape.getFillStyle());
			this._outlineStyle.insertStyle(shape.getOutlineStyle());
		})

		this._updateFrame()
	}

	update(data: void) {
		this._updateFrame();
	}

	private _updateFrame() {
		const newFrame = new Rect(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
		this.enumerateShapes((shape: IShape) => {
			calculateShape(newFrame, shape.getFrame())
		})

		this._frame.copyFrom(newFrame);
		this.notifyObservers();
	}

	draw(canvas: ICanvas): void {
		this.enumerateShapes((shape: IShape) => shape.draw(canvas));
	}

	getFillStyle(): IStyle {
		return this._fillStyle;
	}

	getOutlineStyle(): IOutlineStyle {
		return this._outlineStyle;
	}

	getFrame(): Rect {
		return this._frame;
	}

	getGroup(): IGroupShape {
		return this;
	}

	setFrame(rect: Rect): void {
		const scaleX = rect.width / this._frame.width;
		const scaleY = rect.height / this._frame.height;

		this.enumerateShapes((shape: IShape) => {
			const frame = shape.getFrame();

			const newX = rect.left + (frame.left - this._frame.left) * scaleX;
			const newY = rect.top + (frame.top - this._frame.top) * scaleY;
			const newWidth = frame.width * scaleX;
			const newHeight = frame.height * scaleY;

			shape.setFrame(new Rect(newX, newY, newWidth, newHeight));
			calculateShape(this._frame, shape.getFrame());
		});
	}

	setFillStyle(style: IStyle): void {
		this.enumerateShapes((shape) => shape.setFillStyle(style));
		this._fillStyle.clear();
		this._fillStyle.insertStyle(style);
	}

	setOutlineStyle(style: IOutlineStyle): void {
		this.enumerateShapes((shape) => shape.setOutlineStyle(style));
		this._outlineStyle.clear();
		this._outlineStyle.insertStyle(style);
	}

	clone(): GroupShape {
		const clonedShapes: IShape[] = []
		this.enumerateShapes((shape) => clonedShapes.push(shape.clone()));
		return new GroupShape(...clonedShapes);
	}


	registerObserver(observer: IObserver<void>, priority: number = 0): void {
		if (!this._observers.has(observer)) {
			this._observers.set(observer, priority);
		}
	}

	removeObserver(observer: IObserver<void>): void {
		this._observers.delete(observer);
	}

	notifyObservers(): void {
		const sortedObservers = Array.from(this._observers.entries())
			.sort((a, b) => b[1] - a[1])
		for (const [observer] of sortedObservers)
		{
			observer.update();
		}
	}}

export {Shape, ShapeCollection, GroupShape}