import GraphicsLib from "./GraphicsLib.js";

namespace ShapeDrawingLib {
	export class Point {
		constructor(
			public readonly x: number,
			public readonly y: number,
		) {}
	}

	export interface ICanvasDrawable {
		draw(canvas: GraphicsLib.ICanvas): void;
	}

	export class Triangle implements ICanvasDrawable {
		private p1: Point;
		private p2: Point;
		private p3: Point;
		private color: number;

		constructor(p1: Point, p2: Point, p3: Point, color: number = 0x000000) {
			this.p1 = p1;
			this.p2 = p2;
			this.p3 = p3;
			this.color = color;
		}

		draw(canvas: GraphicsLib.ICanvas): void {
			canvas.setColor(this.color);
			canvas.moveTo(this.p1.x, this.p1.y);
			canvas.lineTo(this.p2.x, this.p2.y);
			canvas.lineTo(this.p3.x, this.p3.y);
			canvas.lineTo(this.p1.x, this.p1.y); // Замыкаем треугольник
		}
	}

	export class Rectangle implements ICanvasDrawable {
		private leftTop: Point;
		private width: number;
		private height: number;
		private color: number;

		constructor(leftTop: Point, width: number, height: number, color: number = 0x000000) {
			this.leftTop = leftTop;
			this.width = width;
			this.height = height;
			this.color = color;
		}

		draw(canvas: GraphicsLib.ICanvas): void {
			canvas.setColor(this.color);
			const rightBottom = { x: this.leftTop.x + this.width, y: this.leftTop.y + this.height };
			canvas.moveTo(this.leftTop.x, this.leftTop.y);
			canvas.lineTo(rightBottom.x, this.leftTop.y);
			canvas.lineTo(rightBottom.x, rightBottom.y);
			canvas.lineTo(this.leftTop.x, rightBottom.y);
			canvas.lineTo(this.leftTop.x, this.leftTop.y);
		}
	}

	export class CanvasPainter {
		private canvas: GraphicsLib.ICanvas;

		constructor(canvas: GraphicsLib.ICanvas) {
			this.canvas = canvas;
		}

		draw(drawable: ICanvasDrawable): void {
			drawable.draw(this.canvas);
		}
	}
}

export default ShapeDrawingLib;