import GraphicsLib from "./GraphicsLib";
import ModernGraphicsLib from "./ModernGraphicsLib";

class ModernGraphicsToOldGraphicsAdapter extends ModernGraphicsLib.ModernGraphicsRenderer implements GraphicsLib.ICanvas {
	private startPoint: ModernGraphicsLib.Point = new ModernGraphicsLib.Point(0, 0);

	constructor(m_out: { log: (...messages: string[]) => void }) {
		super(m_out);
		this.beginDraw(); //TODO: Вернуть
	}

	moveTo(x: number, y: number): void {
		this.startPoint = new ModernGraphicsLib.Point(x, y);
	}

	lineTo(x: number, y: number): void {
		const endPoint = new ModernGraphicsLib.Point(x, y);
		this.drawLine(this.startPoint, endPoint); //TODO: протестить когда startPoint не меняется
		//this.startPoint = endPoint;
	}
}

export {ModernGraphicsToOldGraphicsAdapter};