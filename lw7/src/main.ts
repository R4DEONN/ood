import {Slide} from "./Slide";
import {circleDrawingStrategy, makePolygonDrawingStrategy} from "./drawingStrategy";
import {HTMLCanvas} from "./HTMLCanvas";
import {Rect} from "./CommonTypes";
import {OutlineStyle, Style} from "./style/Style";
import {GroupShape, Shape} from "./shape/Shape";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const htmlCanvas = new HTMLCanvas(canvas)

function main() {
	const slide = new Slide(1000, 1000);
	canvas.width = slide.getWidth();
	canvas.height = slide.getHeight();
	const fillStyle = new Style(0x000000);
	const strokeStyle = new OutlineStyle();
	const circle = new Shape(circleDrawingStrategy, fillStyle, strokeStyle, new Rect(0, 0, 100, 100));
	slide.insertShape(circle);

	const polygon = new Shape(makePolygonDrawingStrategy(5), fillStyle, strokeStyle, new Rect(300, 300, 100, 100));
	const triangle = new Shape(makePolygonDrawingStrategy(3), fillStyle, strokeStyle, new Rect(300, 260, 100, 100));
	const line = new Shape(makePolygonDrawingStrategy(2), fillStyle, new OutlineStyle(0x00FF00), new Rect(200, 260, 100, 100));

	const group = new GroupShape(polygon, triangle, line);
	slide.insertShape(group);
	const newFrame = new Rect(300, 300, 200, 200);
	const group2 = group.clone();
	group2.setFrame(newFrame);
	group2.getFillStyle().setColor(0xFF0000);
	// group2.setFillStyle(new Style(0xFF0000));
	slide.insertShape(group2);

	const circle2 = new Shape(circleDrawingStrategy, new Style(0x00FF00), new OutlineStyle(0xFF0000, 1), new Rect(500, 300, 150, 150));
	slide.insertShape(circle2);

	slide.draw(htmlCanvas);
}

main();