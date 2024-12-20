import {IDocument} from "./IDocument";
import {DocumentItem} from "./DocumentItem";
import {IImage} from "./IImage";
import {IParagraph} from "./IParagraph";
import {CommandHistory} from "./CommandHistory";

class Document implements IDocument {
	private _history = new CommandHistory();
	private _items: DocumentItem[] = [];
	private _title: string = "";

	canRedo(): boolean {
		return this._history.canRedo();
	}

	canUndo(): boolean {
		return this._history.canUndo();
	}

	deleteItem(index: number): void {
		if (this._items[index]) {
			this._items.splice(index, 1);
		}

		throw new Error("Undefined position");
	}

	getItem(index: number): DocumentItem {
		if (this._items[index]) {
			return this._items[index];
		}

		throw new Error("Undefined position");
	}

	getItemsCount(): number {
		return this._items.length;
	}

	getTitle(): string {
		return this._title;
	}

	insertImage(path: string, width: number, height: number, position: number | null | undefined): IImage {
		return undefined;
	}

	insertParagraph(text: string, position: number | null | undefined): IParagraph {
		return undefined;
	}

	redo(): void {
	}

	save(): string {
		return "";
	}

	setTitle(title: string): void {
		this._title = title;
	}

	undo(): void {
	}

}

export {Document}