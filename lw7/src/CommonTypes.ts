class Rect {

	constructor(
		public left: number,
		public top: number,
		public width: number,
		public height: number) {
	}

	copyFrom(from: Rect) {
		this.left = from.left;
		this.top = from.top;
		this.width = from.width;
		this.height = from.height;
	}
}

export {Rect};