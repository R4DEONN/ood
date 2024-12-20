import {afterEach, beforeEach, describe, expect, jest, test} from "@jest/globals";
import ModernGraphicsLib from "../src/ModernGraphicsLib";
import {ModernGraphicsToOldGraphicsAdapter} from "../src/ModernGraphicsToOldGraphicsAdapter";
import ModernGraphicsRenderer = ModernGraphicsLib.ModernGraphicsRenderer;

// describe('ModernGraphicsAdapter', () => {
// 	let adapter: ModernGraphicsToOldGraphicsAdapter;
// 	let renderer: ModernGraphicsLib.ModernGraphicsRenderer;
//
// 	beforeEach(() => {
// 		const mockConsole = {
// 			log: jest.fn(),
// 		};
//
// 		renderer = new ModernGraphicsLib.ModernGraphicsRenderer(mockConsole);
// 		adapter = new ModernGraphicsToOldGraphicsAdapter(renderer);
// 	});
//
// 	afterEach(() => {
// 		jest.clearAllMocks();
// 	});
//
// 	test('should begin drawing on initialization', () => {
// 		expect(renderer['m_drawing']).toBe(true);
// 	});
//
// 	test('should move to a point and draw a line', () => {
// 		adapter.moveTo(10, 20);
// 		adapter.lineTo(30, 40);
//
// 		expect(renderer['m_out'].log).toHaveBeenCalledWith(expect.stringContaining('<line fromX="10" fromY="20" toX="30" toY="40"/>'));
// 	});
//
// 	test('should throw error if LineTo is called before MoveTo', () => {
// 		expect(() => adapter.lineTo(30, 40)).toThrow("MoveTo must be called before LineTo");
// 	});
//
// 	test('should finish drawing correctly', () => {
// 		adapter.finishDrawing();
//
// 		// Проверяем, что EndDraw был вызван и состояние рисования изменилось
// 		expect(renderer['m_drawing']).toBe(false); // Проверяем состояние рисования после завершения
// 	});
// });

describe('ModernGraphicsAdapter', () => {
	let mockConsole = {
		log: jest.fn(),
	};
	let rendererMock!: ModernGraphicsRenderer;
	let adapter!: ModernGraphicsToOldGraphicsAdapter;

	beforeEach(() => {
		mockConsole = {
			log: jest.fn(),
		};
		rendererMock = new ModernGraphicsRenderer(mockConsole);
		adapter = new ModernGraphicsToOldGraphicsAdapter(rendererMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should move to a point and draw a line', () => {
		adapter.setColor(0xFF3333);
		adapter.moveTo(10, 20);
		adapter.lineTo(30, 40);

		expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining("<color r=\"1\" g=\"0.2\" b=\"0.2\" a=\"1\" />"));
	});

	test('should update color when SetColor is called multiple times', () => {
		adapter.setColor(0x0000FF);
		adapter.moveTo(10, 20);
		adapter.lineTo(30, 40);

		expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining("<color r=\"0\" g=\"0\" b=\"1\" a=\"1\" />"));

		adapter.setColor(0xFFFF00);
		adapter.moveTo(50, 60);
		adapter.lineTo(70, 80);

		expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining("<color r=\"1\" g=\"1\" b=\"0\" a=\"1\" />"));
	});
});