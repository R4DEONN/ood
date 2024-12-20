interface IStyle {
	isEnabled(): boolean;

	enable(enable: boolean): void;

	getColor(): number | undefined;

	setColor(value: number): void;
}

interface IOutlineStyle extends IStyle {
	getLineHeight(): number | undefined;
}

export {IStyle, IOutlineStyle}