import {afterEach, beforeEach, describe, expect, jest, test} from "@jest/globals";
import ModernGraphicsLib from "../src/ModernGraphicsLib";
import {ModernGraphicsToOldGraphicsAdapter} from "../src/ModernGraphicsToOldGraphicsAdapter";

describe('ModernGraphicsAdapter', () => {
	let adapter: ModernGraphicsToOldGraphicsAdapter;

	beforeEach(() => {
		const mockConsole = {
			log: jest.fn(),
		};

		adapter = new ModernGraphicsToOldGraphicsAdapter(mockConsole);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should begin drawing on initialization', () => {
		expect(adapter['m_drawing']).toBe(true);
	});

	test('should move to a point and draw a line', () => {
		adapter.moveTo(10, 20);
		adapter.lineTo(30, 40);

		expect(adapter['m_out'].log).toHaveBeenCalledWith(expect.stringContaining('<line fromX="10" fromY="20" toX="30" toY="40"/>'));
	});

	test('should finish drawing correctly', () => {
		adapter.endDraw();

		// Проверяем, что EndDraw был вызван и состояние рисования изменилось
		expect(adapter['m_drawing']).toBe(false); // Проверяем состояние рисования после завершения
	});
});