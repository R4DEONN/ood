import {IParagraph} from "./IParagraph";
import {IImage} from "./IImage";

function isParagraph(item: IParagraph | IImage) {
	return (item as IParagraph).setText !== undefined;
}

function isImage(item: IParagraph | IImage) {
	return (item as IImage).getPath !== undefined;
}

export {isImage, isParagraph}