import {IParagraph} from "./IParagraph";
import {IImage} from "./IImage";
import {DocumentItem} from "./DocumentItem";

interface IDocument {
	insertParagraph(text: string, position: number | null | undefined): IParagraph;
	insertImage(path: string, width: number, height: number, position: number | null | undefined): IImage;
	getItemsCount(): number;
	getItem(index: number): DocumentItem;
	deleteItem(index: number): void;
	getTitle(): string;
	setTitle(title: string): void;
	canUndo(): boolean;
	undo(): void;
	canRedo(): boolean;
	redo(): void;
	save(): string;
}

export { IDocument };