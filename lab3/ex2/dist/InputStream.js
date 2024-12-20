import * as fs from 'fs';
class FileInputStream {
    _fileDescriptor;
    _position;
    _fileSize;
    constructor(filePath) {
        this._fileDescriptor = fs.openSync(filePath, 'r');
        this._position = 0;
        this._fileSize = fs.fstatSync(this._fileDescriptor).size;
    }
    readBlock(destinationData, dataSize) {
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
    readByte() {
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
    isEOF() {
        return this._position >= this._fileSize;
    }
    close() {
        fs.closeSync(this._fileDescriptor);
    }
}
class MemoryInputStream {
    _data; // Массив байтов для хранения данных
    _position; // Текущая позиция чтения
    constructor(data) {
        this._data = data;
        this._position = 0;
    }
    readByte() {
        if (this.isEOF()) {
            throw new Error('Достигнут конец данных.');
        }
        return this._data[this._position++]; // Читаем байт и увеличиваем позицию
    }
    readBlock(destinationData, dataSize) {
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
    isEOF() {
        return this._position >= this._data.length; // Проверяем, достигнут ли конец данных
    }
}
export { FileInputStream, MemoryInputStream };
