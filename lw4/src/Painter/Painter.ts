import {PictureDraft} from "../PictureDraft/PictureDraft";
import {ICanvas} from "../Canvas/ICanvas";

class Painter {
	drawPicture(draft: PictureDraft, canvas: ICanvas): void {
		const shapeCount = draft.getShapeCount();
		for (let i = 0; i < shapeCount; i++)
		{
			const shape = draft.getShape(i);
			shape.draw(canvas);
		}
	}
}

export {Painter};