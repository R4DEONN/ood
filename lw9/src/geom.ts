class Point {
	constructor(
		public x: number = 0,
		public y: number = 0
	) {	}
}

class Size {
	constructor(
		public width: number = 0,
		public height: number = 0,
	) {}
}

function isPointInSize(p: Point, size: Size): boolean {
	return p.x >= 0 && p.y >= 0 && p.x < size.width && p.y < size.height
}

export {Point, Size, isPointInSize}
