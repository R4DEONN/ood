import {IParagraph} from "./IParagraph";
import {IImage} from "./IImage";
import {isImage, isParagraph} from "./utils";

class DocumentItem {
	constructor(
		private item: IParagraph | IImage
	) {
	}

	getImage(): IImage | null {
		if (isImage(this.item)) {
			return this.item as IImage;
		}

		return  null;
	}

	getParagraph(): IParagraph | null {
		if (isParagraph(this.item)) {
			return this.item as IParagraph;
		}

		return null;
	}
}

export {DocumentItem};