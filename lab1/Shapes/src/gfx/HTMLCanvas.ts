import {ICanvas} from "./ICanvas";
import {Point} from "../shapes/Point";

class HTMLCanvas implements ICanvas {
	#canvas: HTMLCanvasElement
	#ctx: CanvasRenderingContext2D

	constructor(canvas: HTMLCanvasElement) {
		this.#canvas = canvas
		this.#ctx = canvas.getContext('2d') as CanvasRenderingContext2D
	}

	drawEllipse(center: Point, rx: number, ry: number) {
		this.#ctx.beginPath()
		this.#ctx.ellipse(center.x, center.y, rx, ry, 0, 0, 2 * Math.PI)
		this.#ctx.closePath()
		this.#ctx.fill()
	}

	drawRectangle(leftTop: Point, width: number, height: number) {
		this.#ctx.fillRect(leftTop.x, leftTop.y, width, height)
	}

	drawPolygon(points: Array<Point>) {
		this.#ctx.beginPath()
		this.moveTo(points[0])
		points.forEach((point, index) => {
			index > 0 && this.lineTo(point)
		})
		this.#ctx.closePath()
		this.#ctx.fill()
	}

	drawLine(firstPoint: Point, secondPoint: Point) {
		this.#ctx.beginPath()
		this.moveTo(firstPoint)
		this.lineTo(secondPoint)
		this.#ctx.closePath()
		this.#ctx.stroke()
	}

	drawText(leftTop: Point, fontSize: number, text: string) {
		this.#ctx.font = `${fontSize}px serif`
		this.#ctx.fillText(text, leftTop.x, leftTop.y)
	}

	lineTo(point: Point) {
		this.#ctx.lineTo(point.x, point.y)
	}

	moveTo(point: Point) {
		this.#ctx.moveTo(point.x, point.y)
	}

	setColor(color: string) {
		this.#ctx.fillStyle = color
		this.#ctx.strokeStyle = color
	}
}

export {HTMLCanvas}