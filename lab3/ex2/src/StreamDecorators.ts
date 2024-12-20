import {IInputStream} from "./IInputStream";
import MersenneTwister from "@dsibilly/mersenne-twister"
import {IOutputStream} from "./IOutputStream";

class EncryptingInputStream implements IInputStream {
	private _inputStream: IInputStream;
	private _substitutionTable: Uint8Array;

	constructor(inputStream: IInputStream, key: number) {
		this._inputStream = inputStream;
		this._substitutionTable = this.generateSubstitutionTable(key);
	}

	private generateSubstitutionTable(key: number): Uint8Array {
		const table = new Uint8Array(256);
		for (let i = 0; i < 256; i++) table[i] = i;

		const rand = new MersenneTwister(key); // Используем mt19937
		for (let i = 255; i > 0; i--) {
			const j = Math.floor(rand.random() * (i + 1));
			[table[i], table[j]] = [table[j], table[i]];
		}

		return table;
	}

	readByte(): number {
		const byte = this._inputStream.readByte();
		return this._substitutionTable[byte];
	}

	readBlock(destinationData: Uint8Array, dataSize: number): void {
		for (let i = 0; i < dataSize; i++) {
			destinationData[i] = this.readByte() || 0;
		}
	}

	isEOF(): boolean {
		return this._inputStream.isEOF();
	}
}

class DecryptingInputStream implements IInputStream {
	private _inputStream: IInputStream;
	private _substitutionTable: Uint8Array;

	constructor(inputStream: IInputStream, key: number) {
		this._inputStream = inputStream;
		this._substitutionTable = this.generateSubstitutionTable(key);
	}

	//TODO: Устранить дублирование
	private generateSubstitutionTable(key: number): Uint8Array {
		// Генерация обратной таблицы подстановки
		const table = new Uint8Array(256);
		const newTable = new Uint8Array(256);
		for (let i = 0; i < 256; i++) table[i] = i;

		const rand = new MersenneTwister(key); // Используем mt19937
		for (let i = 255; i > 0; i--) {
			const j = Math.floor(rand.random() * (i + 1));
			[table[i], table[j]] = [table[j], table[i]];
		}

		for (let i = 255; i > 0; i--) {
			newTable[i] = table.findIndex(val => val === i);
		}

		return newTable;
	}

	readByte(): number {
		const byte = this._inputStream.readByte();
		return this._substitutionTable[byte];
	}

	readBlock(destinationData: Uint8Array, dataSize: number): void {
		for (let i = 0; i < dataSize; i++) {
			destinationData[i] = this.readByte() || 0;
		}
	}

	isEOF(): boolean {
		return this._inputStream.isEOF();
	}
}

class DecryptingOutputStream implements IOutputStream {
	private _outputStream: IOutputStream;
	private _substitutionTable: Uint8Array; //TODO: Базовые классы декораторов

	constructor(outputStream: IOutputStream, key: number) {
		this._outputStream = outputStream;
		this._substitutionTable = this.generateSubstitutionTable(key);
	}

	private generateSubstitutionTable(key: number): Uint8Array {
		// Генерация обратной таблицы подстановки
		const table = new Uint8Array(256);
		const newTable = new Uint8Array(256);
		for (let i = 0; i < 256; i++) table[i] = i;

		const rand = new MersenneTwister(key); // Используем mt19937
		for (let i = 255; i > 0; i--) {
			const j = Math.floor(rand.random() * (i + 1));
			[table[i], table[j]] = [table[j], table[i]];
		}

		for (let i = 255; i > 0; i--) {
			newTable[i] = table.findIndex(val => val === i);
		}

		return newTable;
	}

	writeByte(data: number): void {
		const originalByte = this._substitutionTable[data];
		this._outputStream.writeByte(originalByte);
	}

	writeBlock(srcData: Uint8Array, dataSize: number): void {
		const originalData = new Uint8Array(dataSize);

		for (let i = 0; i < dataSize; i++) {
			originalData[i] = this._substitutionTable[srcData[i]];
		}

		this._outputStream.writeBlock(originalData, dataSize);
	}
}

export {EncryptingInputStream, DecryptingOutputStream, DecryptingInputStream};