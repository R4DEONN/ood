namespace GraphicsLib {
	export interface ICanvas {
		moveTo(x: number, y: number): void;
		lineTo(x: number, y: number): void;
		setColor(rgbColor: number): void;
	}

	export class CCanvas implements ICanvas {
		moveTo(x: number, y: number): void {
			console.log(`MoveTo (${x}, ${y})`);
		}

		lineTo(x: number, y: number): void {
			console.log(`LineTo (${x}, ${y})`);
		}

		setColor(rgbColor: number) {
			const r = (rgbColor >> 16) & 0xFF; // Красный
			const g = (rgbColor >> 8) & 0xFF;  // Зеленый
			const b = rgbColor & 0xFF;

			console.log(`SetColor (#${this.toHex(r)}${this.toHex(g)}${this.toHex(b)})`);
		}

		private toHex(value: number): string {
			const hex = value.toString(16).toUpperCase();
			return hex.padStart(2, '0');
		}
	}
}

export default GraphicsLib;