import * as fs from 'fs';
class FileOutputStream {
    _fileDescriptor;
    constructor(filePath) {
        this._fileDescriptor = fs.openSync(filePath, 'w'); // Открываем файл для записи
    }
    writeBlock(srcData, dataSize) {
        const buffer = srcData.subarray(0, dataSize); // Получаем подмассив данных для записи
        const bytesWritten = fs.writeSync(this._fileDescriptor, buffer);
        if (bytesWritten < 0) {
            throw new Error('Ошибка записи в файл.');
        }
    }
    writeByte(data) {
        if (data < 0 || data > 255) {
            throw new Error('Значение байта должно быть в диапазоне от 0 до 255.');
        }
        const buffer = Buffer.from([data]); // Создаем буфер из одного байта
        const bytesWritten = fs.writeSync(this._fileDescriptor, buffer);
        if (bytesWritten < 0) {
            throw new Error('Ошибка записи в файл.');
        }
    }
    close() {
        fs.closeSync(this._fileDescriptor); // Закрываем файл
    }
}
class MemoryOutputStream {
    _data; // Массив для хранения записанных данных
    _position; // Текущая позиция записи
    constructor() {
        this._data = new Uint8Array(1024); // Инициализируем массив фиксированного размера
        this._position = 0;
    }
    writeBlock(srcData, dataSize) {
        if (this._position + dataSize > this._data.length) {
            throw new Error('Недостаточно места для записи блока данных.');
        }
        this._data.set(srcData.subarray(0, dataSize), this._position); // Записываем данные в массив
        this._position += dataSize; // Увеличиваем позицию записи
    }
    writeByte(data) {
        if (data < 0 || data > 255) {
            throw new Error('Значение байта должно быть в диапазоне от 0 до 255.');
        }
        if (this._position >= this._data.length) {
            throw new Error('Недостаточно места для записи байта.');
        }
        this._data[this._position++] = data; // Записываем байт и увеличиваем позицию
    }
    getData() {
        return this._data.subarray(0, this._position); // Возвращаем записанные данные
    }
}
export { FileOutputStream, MemoryOutputStream };
