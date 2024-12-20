import { Point } from "./geom";
import { Image } from "./Image";

function drawLine(image: Image, from: Point, to: Point, color: string) {
    const deltaX = Math.abs(to.x - from.x);
    const deltaY = Math.abs(to.y - from.y);

    if (deltaY > deltaX) {
        drawSteepLine(image, from, to, color);
    } else {
        drawSlopeLine(image, from, to, color);
    }
}

function drawSteepLine(image: Image, from: Point, to: Point, color: string) {
    const deltaX = Math.abs(to.x - from.x);
    const deltaY = Math.abs(to.y - from.y);

    if (from.y > to.y) {
        [from, to] = [to, from]; // swap
    }

    const stepX = sign(to.x - from.x);
    const errorThreshold = deltaY + 1;
    const deltaErr = deltaX + 1;

    let error = deltaErr / 2;

    for (let p = { ...from }; p.y <= to.y; p.y++) {
        image.setPixel({ x: p.x, y: p.y }, color);

        error += deltaErr;

        if (error >= errorThreshold) {
            p.x += stepX;
            error -= errorThreshold;
        }
    }
}

function drawSlopeLine(image: Image, from: Point, to: Point, color: string) {
    const deltaX = Math.abs(to.x - from.x);
    const deltaY = Math.abs(to.y - from.y);

    if (from.x > to.x) {
        [from, to] = [to, from]; // swap
    }

    const stepY = sign(to.y - from.y);
    const errorThreshold = deltaX + 1;
    const deltaErr = deltaY + 1;

    let error = deltaErr / 2;

    for (let p = { ...from }; p.x <= to.x; p.x++) {
        image.setPixel({ x: p.x, y: p.y }, color);

        error += deltaErr;

        if (error >= errorThreshold) {
            p.y += stepY;
            error -= errorThreshold;
        }
    }
}

function sign(value: number): number {
    return (value > 0 ? 1 : (value < 0 ? -1 : 0));
}

export {drawLine}
