import {IOutlineStyle, IStyle} from "./IStyle";

class GroupFillStyle implements IStyle {
	constructor(
		protected _styles: IStyle[] = []
	) {
	}

	enable(enable: boolean): void {
		this._styles.forEach((style: IStyle) => style.enable(enable));
	}

	getColor(): number | undefined {
		return this._styles.every((style) => style.getColor() === this._styles[0].getColor()) ?
			this._styles[0]?.getColor() :
			undefined;
	}

	isEnabled(): boolean {
		return this._styles.every((style) => style.isEnabled());
	}

	setColor(value: number): void {
		this._styles.forEach((style) => style.setColor(value));
	}

	insertStyle(style: IStyle, position?: number): void {
		if (position === undefined) {
			this._styles.push(style);
		} else {
			if (position < 0 || position > this._styles.length) {
				throw new Error("Position out of bounds");
			}
			this._styles.splice(position, 0, style);
		}
	}

	removeStyleAtIndex(index: number): void {
		if (index >= 0 && index < this._styles.length) {
			this._styles.splice(index, 1);
			return;
		}

		throw new Error("Shape does not exist");
	}

	clear() {
		this._styles = [];
	}
}

class GroupOutlineStyle extends GroupFillStyle implements IOutlineStyle {
	constructor(styles: IOutlineStyle[] = []) {
		super(styles);
	}

	getLineHeight(): number | undefined {
		return this._styles.every((style) => (style as IOutlineStyle).getLineHeight() === (this._styles[0] as IOutlineStyle).getLineHeight()) ?
			(this._styles?.[0] as IOutlineStyle).getLineHeight() : undefined;
	}

	insertStyle(style: IOutlineStyle, position?: number): void {
		super.insertStyle(style, position);
	}
}

export {GroupOutlineStyle, GroupFillStyle};