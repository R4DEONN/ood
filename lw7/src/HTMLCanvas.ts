import {ICanvas} from "./ICanvas";
import {Point} from "./drawingStrategy";

function numberToHex(num: number): string {
	// Проверяем, что число является целым и не отрицательным
	if (!Number.isInteger(num) || num < 0) {
		throw new Error("Input must be a non-negative integer.");
	}

	// Преобразуем число в HEX и удаляем префикс '0x'
	const hex = num.toString(16).toUpperCase();

	// Добавляем символ '#' перед HEX-строкой
	return `#${hex.padStart(6, '0')}`; // Дополняем до 6 символов нулями слева
}

class HTMLCanvas implements ICanvas {
	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;
	private _fill: boolean = false;
	private _stroke: boolean = false;

	constructor(canvas: HTMLCanvasElement) {
		this._canvas = canvas;
		this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
	}

	setFillColor(color?: number): void {
		if (color === undefined) {
			this._fill = false;
			return;
		}

		this._ctx.fillStyle = numberToHex(color);
		this._fill = true;
	}

	drawPolygon(points: Array<Point>) {
		this._ctx.beginPath();
		this._ctx.moveTo(points[0].x, points[0].y);
		points.forEach((point, index) => {
			index > 0 && this._ctx.lineTo(point.x, point.y);
		})
		this._ctx.closePath()
		if (this._fill) {
			this._ctx.fill();
		}
		if (this._stroke) {
			this._ctx.stroke();
		}
	}

	drawEllipse(left: number, top: number, width: number, height: number): void {
		this._ctx.ellipse(left + width / 2, top + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
		if (this._fill) {
			this._ctx.fill();
		}
		if (this._stroke) {
			this._ctx.stroke();
		}
	}

	setLineColor(color?: number): void {
		if (color === undefined) {
			this._stroke = false;
			return;
		}

		this._ctx.strokeStyle = numberToHex(color);
		this._stroke = true;
	}
}

export {HTMLCanvas};