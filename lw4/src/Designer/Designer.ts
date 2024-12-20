import {IDesigner} from "./IDesigner";
import {PictureDraft} from "../PictureDraft/PictureDraft";
import {IInputProvider} from "../InputProvider/IInputProvider";
import {IShapeFactory} from "../ShapeFactory/IShapeFactory";
import {ShapeFactory} from "../ShapeFactory/ShapeFactory";

class Designer implements IDesigner {
	private _shapeFactory: IShapeFactory = new ShapeFactory();

	createDraft(input: IInputProvider, onCloseInput: (pictureDraft: PictureDraft) => void): void {
		const pictureDraft = new PictureDraft();

		input.registerOnInput((value: string) => {
			if (!value)
			{
				return;
			}
			const shape = this._shapeFactory.createShape(value);
			pictureDraft.addShape(shape);
		});

		input.registerOnClose(() => {
			onCloseInput(pictureDraft);
		})
	}
}

export { Designer };