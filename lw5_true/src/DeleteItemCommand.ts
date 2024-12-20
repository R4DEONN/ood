import {DocumentCommand} from "./DocumentCommand";
import {IDocument} from "./IDocument";
import {DocumentItem} from "./DocumentItem";
import {Image} from "./Image";
import {IImage} from "./IImage";
import {IParagraph} from "./IParagraph";

class DeleteItemCommand extends DocumentCommand {
	private _backupItem: DocumentItem | undefined;

	constructor(
		document: IDocument,
		private _index: number
	) {
		super(document);
	}

	delete(): void {
		//TODO: Удалить изображение
	}

	execute(): void {
		this._backupItem = this._document.getItem(this._index);
		this._document.deleteItem(this._index);
	}

	unExecute(): void {
		if (this._backupItem?.getImage()) {
			const image = this._backupItem.getImage() as IImage;
			this._document.insertImage(image.getPath(), image.getWidth(), image.getHeight(), this._index);
		} else if (this._backupItem?.getParagraph()) {
			const paragraph = this._backupItem.getParagraph() as IParagraph;
			this._document.insertParagraph(paragraph.getText(), this._index);
		} else {
			throw new Error("Error to un execute command");
		}
	}

	tryMerge(command: DocumentCommand): void {
	}
}

export {DeleteItemCommand};