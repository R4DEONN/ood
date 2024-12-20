import {IParagraph} from "./IParagraph";

class Paragraph implements IParagraph {
	private _text = "";

	getText(): string {
		return this._text;
	}

	setText(text: string): void {
		this._text = text;
	}
}

export {Paragraph};