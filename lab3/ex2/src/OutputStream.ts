import * as fs from 'fs';
import {IOutputStream} from "./IOutputStream";

class FileOutputStream implements IOutputStream {
	private _fileDescriptor: number;

	constructor(filePath: string) {
		this._fileDescriptor = fs.openSync(filePath, 'w'); // Открываем файл для записи
	}

	writeBlock(srcData: Uint8Array, dataSize: number): void {
		const buffer = srcData.subarray(0, dataSize); // Получаем подмассив данных для записи
		const bytesWritten = fs.writeSync(this._fileDescriptor, buffer);

		if (bytesWritten < 0) {
			throw new Error('Ошибка записи в файл.');
		}
	}

	writeByte(data: number): void {
		if (data < 0 || data > 255) {
			throw new Error('Значение байта должно быть в диапазоне от 0 до 255.');
		}

		const buffer = Buffer.from([data]); // Создаем буфер из одного байта
		const bytesWritten = fs.writeSync(this._fileDescriptor, buffer);

		if (bytesWritten < 0) {
			throw new Error('Ошибка записи в файл.');
		}
	}

	close(): void {
		fs.closeSync(this._fileDescriptor); // Закрываем файл
	}
}

class MemoryOutputStream implements IOutputStream {
	private _data: Uint8Array; // Массив для хранения записанных данных
	private _position: number;   // Текущая позиция записи

	constructor() {
		this._data = new Uint8Array(1024); // Инициализируем массив фиксированного размера
		this._position = 0;
	}

	writeBlock(srcData: Uint8Array, dataSize: number): void {
		if (this._position + dataSize > this._data.length) {
			throw new Error('Недостаточно места для записи блока данных.');
		}

		this._data.set(srcData.subarray(0, dataSize), this._position); // Записываем данные в массив
		this._position += dataSize; // Увеличиваем позицию записи
	}

	writeByte(data: number): void {
		if (data < 0 || data > 255) {
			throw new Error('Значение байта должно быть в диапазоне от 0 до 255.');
		}

		if (this._position >= this._data.length) {
			throw new Error('Недостаточно места для записи байта.');
		}

		this._data[this._position++] = data; // Записываем байт и увеличиваем позицию
	}

	getData(): Uint8Array {
		return this._data.subarray(0, this._position); // Возвращаем записанные данные
	}
}

export {FileOutputStream, MemoryOutputStream};