import ShapeDrawingLib from "./ShapeDrawingLib";
import GraphicsLib from "./GraphicsLib";
import ModernGraphicsLib from "./ModernGraphicsLib";
import {ModernGraphicsToOldGraphicsAdapter} from "./ModernGraphicsToOldGraphicsAdapter";

namespace app {
	function paintPicture(painter: ShapeDrawingLib.CanvasPainter) {
		const triangle = new ShapeDrawingLib.Triangle({ x: 10, y: 15 }, { x: 100, y: 200 }, { x: 150, y: 250 });
		const rectangle = new ShapeDrawingLib.Rectangle({ x: 30, y: 40 }, 18, 24);

		painter.draw(triangle);
		painter.draw(rectangle);
	}

	export function paintPictureOnCanvas() {
		const simpleCanvas = new GraphicsLib.CCanvas();
		const painter = new ShapeDrawingLib.CanvasPainter(simpleCanvas);

		paintPicture(painter);
	}

	export function paintPictureOnModernGraphicsRenderer() {
		const adapter = new ModernGraphicsToOldGraphicsAdapter(console);

		const painter = new ShapeDrawingLib.CanvasPainter(adapter);

		paintPicture(painter);

		adapter.endDraw();
	}
}


function main() {
	console.log("Should we use new API (y)?");
	const userInput = prompt();
	if (userInput === "y" || userInput === "Y") {
		app.paintPictureOnModernGraphicsRenderer();
	} else {
		app.paintPictureOnCanvas();
	}
}

main();