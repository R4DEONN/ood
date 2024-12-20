namespace ModernGraphicsLib {
	export class Point {
		constructor(public x: number, public y: number) {}
	}

	export class RGBAColor {
		constructor(public r: number, public g: number, public b: number, public a: number) {}
	}

	export class ModernGraphicsRenderer {
		private m_drawing = false;

		constructor(private m_out: {log: (...messages: string[]) => void}) {}

		beginDraw(): void {
			if (this.m_drawing) {
				throw new Error("Drawing has already begun");
			}
			this.m_out.log("<draw>");
			this.m_drawing = true;
		}

		drawLine(start: Point, end: Point, color: RGBAColor): void {
			if (!this.m_drawing) {
				throw new Error("DrawLine is allowed between BeginDraw()/EndDraw() only");
			}

			this.m_out.log(`<line fromX="${start.x}" fromY="${start.y}" toX="${end.x}" toY="${end.y}">`);
			this.m_out.log(`  <color r="${color.r}" g="${color.g}" b="${color.b}" a="${color.a}" />`);
			this.m_out.log(`</line>`);
		}

		endDraw(): void {
			if (!this.m_drawing) {
				throw new Error("Drawing has not been started");
			}
			this.m_out.log("</draw>");
			this.m_drawing = false;
		}
	}
}

export default ModernGraphicsLib;