import {InputProvider} from "./InputProvider/InputProvider";
import {Designer} from "./Designer/Designer";
import {Painter} from "./Painter/Painter";
import {HTMLCanvas} from "./Canvas/HTMLCanvas";
import {PictureDraft} from "./PictureDraft/PictureDraft";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 50

function main() {
	const input = document.getElementById("input") as HTMLInputElement;
	const closeButton = document.getElementById("endButton") as HTMLButtonElement;
	const inputProvider = new InputProvider(input, closeButton);
	const designer = new Designer();

	designer.createDraft(inputProvider, onCloseInput);
}

function onCloseInput(pictureDraft: PictureDraft) {
	const htmlCanvas = new HTMLCanvas(canvas);
	const painter = new Painter();

	painter.drawPicture(pictureDraft, htmlCanvas);
}

main();