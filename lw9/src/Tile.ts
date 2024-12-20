import { Point } from "./geom";

class Tile {
    static readonly SIZE = 8; // Размер тайла 8x8 пикселей
    private pixels: string[][]; // Хранение пикселей тайла
    private static instanceCount = 0; // Счетчик экземпляров тайлов

    constructor(color: string = ' ') {
        this.pixels = Array.from({ length: Tile.SIZE }, () => Array(Tile.SIZE).fill(color));
        Tile.instanceCount++; // Увеличиваем счетчик экземпляров
    }

    public static resetInstanceCount() {
        Tile.instanceCount = 0;
    }

    public static getInstanceCount(): number {
        return Tile.instanceCount;
    }

    public setPixel(p: Point, color: string): void {
        if (p.x >= 0 && p.x < Tile.SIZE && p.y >= 0 && p.y < Tile.SIZE) {
            this.pixels[p.y][p.x] = color;
        }
    }

    public getPixel(p: Point): string {
        if (p.x >= 0 && p.x < Tile.SIZE && p.y >= 0 && p.y < Tile.SIZE) {
            return this.pixels[p.y][p.x];
        }
        return ' '; // Возвращаем пробел, если координаты выходят за пределы
    }
}

export {Tile}
