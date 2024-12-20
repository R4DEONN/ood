import * as fs from 'fs';
import {IInputStream} from "./IInputStream";

class FileInputStream implements IInputStream {
	private _fileDescriptor: number;
	private _position: number;
	private _fileSize: number;

	constructor(filePath: string) {
		this._fileDescriptor = fs.openSync(filePath, 'r');
		this._position = 0;
		this._fileSize = fs.fstatSync(this._fileDescriptor).size;
	}

	readBlock(destinationData: ArrayBuffer, dataSize: number): void {
		if (this.isEOF()) {
			throw new Error('Достигнут конец файла.');
		}

		const buffer = Buffer.alloc(dataSize);
		const bytesRead = fs.readSync(this._fileDescriptor, buffer, 0, dataSize, this._position);

		if (bytesRead < 0) {
			throw new Error('Ошибка чтения из файла.');
		}

		const view = new Uint8Array(destinationData);
		view.set(buffer.subarray(0, bytesRead));
		this._position += bytesRead;
	}

	readByte(): number {
		if (this.isEOF()) {
			throw new Error('Достигнут конец файла.');
		}

		const buffer = Buffer.alloc(1);
		const bytesRead = fs.readSync(this._fileDescriptor, buffer, 0, 1, this._position);

		if (bytesRead < 0) {
			throw new Error('Ошибка чтения из файла.');
		}

		this._position += bytesRead;
		return buffer[0];
	}

	isEOF(): boolean {
		return this._position >= this._fileSize;
	}

	close(): void {
		fs.closeSync(this._fileDescriptor);
	}
}

class MemoryInputStream implements IInputStream {
	private _data: Uint8Array; // Массив байтов для хранения данных
	private _position: number;   // Текущая позиция чтения

	constructor(data: Uint8Array) {
		this._data = data;
		this._position = 0;
	}

	readByte(): number {
		if (this.isEOF()) {
			throw new Error('Достигнут конец данных.');
		}

		return this._data[this._position++]; // Читаем байт и увеличиваем позицию
	}

	readBlock(destinationData: Uint8Array, dataSize: number): void {
		if (this.isEOF()) {
			throw new Error('Достигнут конец данных.');
		}

		const bytesToRead = Math.min(dataSize, this._data.length - this._position); // Определяем, сколько байтов можно прочитать

		for (let i = 0; i < bytesToRead; i++) {
			destinationData[i] = this.readByte(); // Читаем байт
		}

		if (bytesToRead < dataSize) {
			throw new Error('Достигнут конец данных.');
		}
	}

	isEOF(): boolean {
		return this._position >= this._data.length; // Проверяем, достигнут ли конец данных
	}
}

export {FileInputStream, MemoryInputStream};