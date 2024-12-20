import {IOutlineStyle, IStyle} from "./IStyle";

class Style implements IStyle {
	private _enabled: boolean = true;

	constructor(
		private _color?: number
	) {
		if (_color === undefined) {
			this._enabled = false;
		}
	}

	enable(enable: boolean): void {
		this._enabled = enable;
	}

	getColor(): number | undefined {
		if (this._enabled) {
			return this._color;
		}
		return undefined;
	}

	isEnabled(): boolean {
		return this._enabled;
	}

	setColor(value: number): void {
		this._color = value;
	}
}

class OutlineStyle extends Style implements IOutlineStyle {
	constructor(
		color?: number,
		private _lineHeight?: number,
	) {
		super(color);
	}

	getLineHeight(): number | undefined {
		return this._lineHeight;
	}
}

export {Style, OutlineStyle}