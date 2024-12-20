import {IDocument} from "./IDocument";

abstract class DocumentCommand {
	constructor(
		protected _document: IDocument,
	) {
	}

	abstract execute(): void;
	abstract unExecute(): void;
	abstract delete(): void;
	abstract tryMerge(command: DocumentCommand): void;
}

export {DocumentCommand};