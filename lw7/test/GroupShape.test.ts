import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {ICanvas} from "../src/ICanvas";
import {Rect} from "../src/CommonTypes";
import {GroupShape, Shape} from "../src/shape/Shape";
import {OutlineStyle, Style} from "../src/style/Style";
import {makePolygonDrawingStrategy} from "../src/drawingStrategy";

describe('GroupShape', () => {
	let canvas: ICanvas;
	let shape1: Shape;
	let shape2: Shape;
	let groupShape: GroupShape;

	beforeEach(() => {
		// Создаем мока для canvas
		canvas = {} as ICanvas;

		// Создаем стили
		const fillStyle1 = new Style(0xFF0000); // Красный
		const outlineStyle1 = new OutlineStyle(0x00FF00); // Зеленый
		shape1 = new Shape(() => {}, fillStyle1, outlineStyle1, new Rect(0, 0, 100, 100));

		const fillStyle2 = new Style(0xFF0000); // Красный
		const outlineStyle2 = new OutlineStyle(0x0000FF); // Синий
		shape2 = new Shape(() => {}, fillStyle2, outlineStyle2, new Rect(50, 50, 150, 150));

		// Создаем группу фигур
		groupShape = new GroupShape(shape1, shape2);
	});

	test('should draw all shapes in the group', () => {
		const drawSpy = jest.spyOn(shape1, 'draw');
		const drawSpy2 = jest.spyOn(shape2, 'draw');

		groupShape.draw(canvas);

		expect(drawSpy).toHaveBeenCalledWith(canvas);
		expect(drawSpy2).toHaveBeenCalledWith(canvas);
	});

	test('should return correct fill style when all shapes have the same fill style', () => {
		expect(groupShape.getFillStyle().getColor()).toEqual(new Style(0xFF0000).getColor());
	});

	test('should return undefined for fill style when shapes have different fill styles', () => {
		groupShape.setFillStyle(new Style(0x0000FF)); // Меняем цвет заливки на синий
		expect(groupShape.getFillStyle().getColor()).toEqual(new Style(0x0000FF).getColor());
	});

	test('should return correct outline style when all shapes have the same outline style', () => {
		expect(groupShape.getOutlineStyle().getColor()).toBeUndefined();
	});

	test('should return undefined for outline style when shapes have different outline styles', () => {
		shape2.setOutlineStyle(new OutlineStyle(0xFFFF00)); // Меняем цвет обводки на желтый
		expect(groupShape.getOutlineStyle().getColor()).toBeUndefined();
	});

	test('should set frame for all shapes correctly', () => {
		const newFrame = new Rect(10, 10, 200, 200);
		groupShape.setFrame(newFrame);

		expect(shape1.getFrame()).toEqual(new Rect(10,
			10,
			shape1.getFrame().width * (newFrame.width / groupShape.getFrame().width),
			shape1.getFrame().height * (newFrame.height / groupShape.getFrame().height)));

		expect(shape2.getFrame()).toEqual(new Rect(10 + (shape2.getFrame().left - groupShape.getFrame().left) * (newFrame.width / groupShape.getFrame().width),
			10 + (shape2.getFrame().top - groupShape.getFrame().top) * (newFrame.height / groupShape.getFrame().height),
			shape2.getFrame().width * (newFrame.width / groupShape.getFrame().width),
			shape2.getFrame().height * (newFrame.height / groupShape.getFrame().height)));
	});

	test('frame in frame', () => {
		const shape = new Shape(makePolygonDrawingStrategy(4), new Style(0), new OutlineStyle(0), new Rect(10, 10, 10, 10));
		const groupShape1 = new GroupShape(shape);
		const groupShape2 = new GroupShape(groupShape1);

		shape.setFrame(new Rect(0, 0, 0, 0))

		expect(groupShape2.getFrame()).toEqual(new Rect(0, 0, 0, 0))
	});

	test('frame in frame1', () => {
		const shape = new Shape(makePolygonDrawingStrategy(4), new Style(0), new OutlineStyle(0), new Rect(0, 0, 0, 0));
		const groupShape1 = new GroupShape(shape);

		expect(groupShape1.getFrame()).toEqual(new Rect(0, 0, 0, 0))
	});

	test('frame in frame2', () => {
		const shape = new Shape(makePolygonDrawingStrategy(4), new Style(0), new OutlineStyle(0), new Rect(0, 0, 1, 1));
		const shape2 = new Shape(makePolygonDrawingStrategy(4), new Style(0), new OutlineStyle(0), new Rect(100, 100, 1, 1));
		const groupShape1 = new GroupShape(shape, shape2);

		expect(groupShape1.getFrame()).toEqual(new Rect(0, 0, 101, 101))
	});
});

describe('Cloning Shapes', () => {
	let canvas: ICanvas;
	let shape1: Shape;
	let shape2: Shape;
	let groupShape: GroupShape;

	beforeEach(() => {
		canvas = {} as ICanvas;

		const fillStyle1 = new Style(0xFF0000); // Красный
		const outlineStyle1 = new OutlineStyle(0x00FF00); // Зеленый
		shape1 = new Shape(() => {}, fillStyle1, outlineStyle1, new Rect(0, 0, 100, 100));

		const fillStyle2 = new Style(0x0000FF); // Синий
		const outlineStyle2 = new OutlineStyle(0xFFFF00); // Желтый
		shape2 = new Shape(() => {}, fillStyle2, outlineStyle2, new Rect(50, 50, 150, 150));

		groupShape = new GroupShape(shape1, shape2);
	});

	test('should clone a single shape correctly', () => {
		const clonedShape = shape1.clone();

		expect(clonedShape).not.toBe(shape1); // Убедитесь, что это другой объект
		expect(clonedShape.getFillStyle()?.getColor()).toBe(shape1.getFillStyle()?.getColor());
		expect(clonedShape.getOutlineStyle()?.getColor()).toBe(shape1.getOutlineStyle()?.getColor());
		expect(clonedShape.getFrame()).toEqual(shape1.getFrame());

		// Изменяем оригинал и проверяем, что клон не изменился
		shape1.setFillStyle(new Style(0x00FF00)); // Меняем цвет на зеленый
		expect(clonedShape.getFillStyle()?.getColor()).toBe(0xFF0000); // Клон должен остаться красным
	});

	test('should clone a group shape correctly', () => {
		const clonedGroup = groupShape.clone();

		expect(clonedGroup).not.toBe(groupShape); // Убедитесь, что это другой объект

		// Проверяем каждый элемент группы
		expect(clonedGroup.getShapesCount()).toBe(groupShape.getShapesCount());

		for (let i = 0; i < groupShape.getShapesCount(); i++) {
			const originalShape = groupShape.getShapeAtIndex(i);
			const clonedShape = clonedGroup.getShapeAtIndex(i);

			expect(clonedShape).not.toBe(originalShape); // Убедитесь, что это другой объект
			expect(clonedShape.getFillStyle()?.getColor()).toBe(originalShape.getFillStyle()?.getColor());
			expect(clonedShape.getOutlineStyle()?.getColor()).toBe(originalShape.getOutlineStyle()?.getColor());
			expect(clonedShape.getFrame()).toEqual(originalShape.getFrame());
		}

		shape1.setFillStyle(new Style(0x00FF00));
		expect(clonedGroup.getFillStyle()?.getColor()).toBeUndefined();
	});
});