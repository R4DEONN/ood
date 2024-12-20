import { isPointInSize, Point, Size } from "./geom";
import {CoW} from "./CoW"
import {Tile} from "./Tile"

class Image {
	private _size: Size = new Size
	private _tiles: CoW<Tile>[][]

	constructor(size: Size, color: string) {
		if (size.width < 0 || size.height < 0) {
			throw new Error("Size cannot be less than 0")
		}

		if (color.length > 1) {
			throw new Error("Color must be a char")
		}
		const tileCountX = Math.ceil(size.width / Tile.SIZE);
        const tileCountY = Math.ceil(size.height / Tile.SIZE);

		this._size = size
		this._tiles = Array.from({ length: tileCountY }, () =>
            Array.from({ length: tileCountX }, () => new CoW(new Tile(color)))
        );
	}

	getSize(): Size {
		return this._size
	}

	getPixel(p: Point): string {
		if (p.x < 0 || p.y < 0 || p.x >= this._size.width || p.y >= this._size.height) {
            return ' ';
        }

        const tileX = Math.floor(p.x / Tile.SIZE);
        const tileY = Math.floor(p.y / Tile.SIZE);

        const localPoint: Point = {
            x: p.x % Tile.SIZE,
            y: p.y % Tile.SIZE
        };

        return this._tiles[tileY][tileX].getValue().getPixel(localPoint);
	}

	setPixel(p: Point, color: string): void {
		if (p.x < 0 || p.y < 0 || p.x >= this._size.width || p.y >= this._size.height) {
            return;
        }

        const tileX = Math.floor(p.x / Tile.SIZE);
        const tileY = Math.floor(p.y / Tile.SIZE);

        const localPoint: Point = {
            x: p.x % Tile.SIZE,
            y: p.y % Tile.SIZE
        };

        this._tiles[tileY][tileX].write(tile => {
            tile.setPixel(localPoint, color);
        });
	}
}

function printImage(image: Image): void {
    for (let y = 0; y < image.getSize().height; ++y) {
        let line = '';
        for (let x = 0; x < image.getSize().width; ++x) {
            line += image.getPixel({ x, y });
        }
        console.log(line);
    }
}

function loadImage(pixels: string): Image {
	const lines = pixels.split('\n');
    let maxWidth = 0;
    let height = lines.length;

    for (const line of lines) {
        maxWidth = Math.max(maxWidth, line.length);
    }

    const img = new Image({ width: maxWidth, height }, ' ');

    for (let y = 0; y < height; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            img.setPixel({ x, y }, line[x]);
        }
    }

    return img;
}

export {Image, printImage, loadImage}
