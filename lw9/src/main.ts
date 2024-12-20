import { Size, Point } from "./geom";
import { loadImage, Image, printImage } from "./Image"
import { drawLine } from "./drawer";

function main() {
	const img = loadImage(
		" CCCC             \n" +
        "CC  CC   ##    ## \n" +
        "CC      ####  ####\n" +
        "CC  CC   ##    ## \n" +
        " CCCC             \n"
		)

		printImage(img)

		const img1 = new Image(new Size(30, 20), '.');
		drawLine(img1, new Point( 3, 2 ), new Point( 26, 5 ), '#');
		drawLine(img1, new Point( 26, 5 ), new Point( 21, 18 ), '#');
		drawLine(img1, new Point( 21, 18 ), new Point( 3, 2 ), '#');

		printImage(img1);
}

main()
