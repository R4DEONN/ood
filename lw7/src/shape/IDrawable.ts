import {ICanvas} from "../ICanvas";

interface IDrawable {
	draw(canvas: ICanvas): void;
}

export {IDrawable}