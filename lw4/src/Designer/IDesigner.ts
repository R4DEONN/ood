import {PictureDraft} from "../PictureDraft/PictureDraft";
import {IInputProvider} from "../InputProvider/IInputProvider";

//TODO: Нет клиентов бесполезен
interface IDesigner {
	createDraft(input: IInputProvider, onCloseInput: (pictureDraft: PictureDraft) => void): void;
}

export {IDesigner};