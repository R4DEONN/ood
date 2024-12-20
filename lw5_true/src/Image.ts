import {IImage} from "./IImage";

class Image implements IImage {
	constructor(
		path: string,
		private width: number,
		private height: number,
	) {
		//TODO: implement path
	}

	getHeight(): number {
		return 0;
	}

	getPath(): string {
		return "";
	}

	getWidth(): number {
		return 0;
	}

	resize(width: number, height: number): void {
	}

}

export { Image };