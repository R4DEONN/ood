import GraphicsLib from "./GraphicsLib";
import ModernGraphicsLib from "./ModernGraphicsLib";
import RGBAColor = ModernGraphicsLib.RGBAColor;
import {Point} from "./Point";

class ModernGraphicsToOldGraphicsAdapter implements GraphicsLib.ICanvas {
	private renderer: ModernGraphicsLib.ModernGraphicsRenderer;
	private startPoint: ModernGraphicsLib.Point = new ModernGraphicsLib.Point(1, 0); //TODO: тест на начальную точку
	private color: RGBAColor;

	constructor(renderer: ModernGraphicsLib.ModernGraphicsRenderer) {
		this.color = new RGBAColor(1, 1, 1, 1);
		this.renderer = renderer; //TODO: Почему бы не разместить здесь beginDraw
		renderer.beginDraw(); //TODO: Ошибка
	}

	moveTo(x: number, y: number): void {
		this.startPoint = new ModernGraphicsLib.Point(x, y); //TODO: moveTO проверить в тесте
	}

	lineTo(x: number, y: number): void {
		const endPoint = new Point(x, x);

		if (this.startPoint) {
			this.renderer.drawLine(new Point(this.startPoint.x, this.startPoint.y), endPoint, this.color);
			this.startPoint = endPoint;
		}

		console.log(`LineTo (${x}, ${y})`);
	}

	setColor(rgbColor: number): void {
		const r = ((rgbColor >> 16) & 0xFF) / 255.0;
		const g = ((rgbColor >> 8) & 0xFF) / 255.0;
		const b = (rgbColor & 0xFF) / 255.0;
		this.color = new RGBAColor(r, g, b, 1.0);
		console.log(`SetColor (#${this.toHex(rgbColor >> 16)}${this.toHex(rgbColor >> 8)}${this.toHex(rgbColor)})`);
	}

	finishDrawing() {
		this.renderer.endDraw();
	}

	private toHex(value: number): string {
		return (value & 0xFF).toString(16).padStart(2, '0').toUpperCase();
	}
}

export {ModernGraphicsToOldGraphicsAdapter};