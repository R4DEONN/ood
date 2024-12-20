// @ts-ignore
import {afterEach, beforeEach, describe, expect, jest, test} from "@jest/globals";
import {FileOutputStream, MemoryOutputStream} from "../src/OutputStream";
import {MemoryInputStream} from "../src/InputStream";
import * as fs from "node:fs";
import {DecryptingInputStream, DecryptingOutputStream, EncryptingInputStream} from "../src/StreamDecorators";

describe('StreamTest', () => {
	let stream: MemoryOutputStream;

	beforeEach(() => {
		stream = new MemoryOutputStream();
	});

	test('should write a single byte', () => {
		stream.writeByte(100);
		expect(stream.getData()).toEqual(new Uint8Array([100]));
	});

	test('should write a block of data', () => {
		const data = new Uint8Array([1, 2, 3, 4, 5]);
		stream.writeBlock(data, data.length);
		expect(stream.getData()).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
	});

	test('should throw an error when writing a byte out of range', () => {
		expect(() => stream.writeByte(256)).toThrow('Значение байта должно быть в диапазоне от 0 до 255.');
		expect(() => stream.writeByte(-1)).toThrow('Значение байта должно быть в диапазоне от 0 до 255.');
	});

	test('should throw an error when writing beyond capacity', () => {
		const largeData = new Uint8Array(1024);
		stream.writeBlock(largeData, largeData.length); // Заполняем массив

		expect(() => stream.writeByte(1)).toThrow('Недостаточно места для записи байта.');
		expect(() => stream.writeBlock(new Uint8Array([1]), 1)).toThrow('Недостаточно места для записи блока данных.');
	});
})

describe('MemoryInputStream', () => {
	let stream: MemoryInputStream;
	const testData = new Uint8Array([10, 20, 30, 40, 50]);

	beforeEach(() => {
		stream = new MemoryInputStream(testData); // Инициализируем поток с тестовыми данными
	});

	test('should read a single byte', () => {
		expect(stream.readByte()).toBe(10);
		expect(stream.readByte()).toBe(20);
	});

	test('should read a block of data', () => {
		const destination = new Uint8Array(5);
		stream.readBlock(destination, 5);
		expect(destination).toEqual(new Uint8Array([10, 20, 30, 40, 50]));
	});

	test('should throw an error when reading beyond EOF', () => {
		stream.readBlock(new Uint8Array(5), 5); // Читаем все данные
		expect(() => stream.readByte()).toThrow('Достигнут конец данных.'); // Проверяем на ошибку
	});

	test('should throw an error when reading a block beyond EOF', () => {
		const destination = new Uint8Array(5);
		stream.readBlock(destination, 5); // Читаем все данные
		expect(() => stream.readBlock(destination, 1)).toThrow('Достигнут конец данных.'); // Проверяем на ошибку
	});

	test('isEOF should return true after reading all data', () => {
		stream.readBlock(new Uint8Array(5), 5); // Читаем все данные
		expect(stream.isEOF()).toBe(true);
	});

	test('isEOF should return false before reading all data', () => {
		expect(stream.isEOF()).toBe(false);
		stream.readByte(); // Читаем один байт
		expect(stream.isEOF()).toBe(false);
	});
});

describe('Encrypting and Decrypting Streams', () => {
	const key = 12345; // Example key for encryption

	test('should encrypt and decrypt data correctly', () => {
		const inputData = new TextEncoder().encode("Hello");
		const memoryInputStream = new MemoryInputStream(inputData);

		// Encrypt the input stream
		const encryptingInputStream = new EncryptingInputStream(memoryInputStream, key);

		// Prepare an output stream to write encrypted data in memory
		const decryptingInputStream = new DecryptingInputStream(encryptingInputStream, key);
		const decrypted = new Uint8Array(5)
		decryptingInputStream.readBlock(decrypted, 5)
		// Convert decrypted bytes back to string
		const decryptedString = new TextDecoder().decode(decrypted);
		expect(decryptedString).toBe("Hello");
	});
});