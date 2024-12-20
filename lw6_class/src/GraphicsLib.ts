namespace GraphicsLib {
	export interface ICanvas {
		moveTo(x: number, y: number): void;
		lineTo(x: number, y: number): void;
	}

	export class CCanvas implements ICanvas {
		moveTo(x: number, y: number): void {
			console.log(`MoveTo (${x}, ${y})`);
		}

		lineTo(x: number, y: number): void {
			console.log(`LineTo (${x}, ${y})`);
		}
	}
}

export default GraphicsLib;