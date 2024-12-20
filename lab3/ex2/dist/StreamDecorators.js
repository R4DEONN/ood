import MersenneTwister from "@dsibilly/mersenne-twister";
class EncryptingInputStream {
    _inputStream;
    _substitutionTable;
    constructor(inputStream, key) {
        this._inputStream = inputStream;
        this._substitutionTable = this.generateSubstitutionTable(key);
    }
    generateSubstitutionTable(key) {
        const table = new Uint8Array(256);
        for (let i = 0; i < 256; i++)
            table[i] = i;
        // Перемешивание таблицы на основе ключа
        const rand = new MersenneTwister(key); // Используем mt19937
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(rand.random() * (i + 1));
            [table[i], table[j]] = [table[j], table[i]];
        }
        return table;
    }
    readByte() {
        const byte = this._inputStream.readByte();
        return this._substitutionTable[byte];
    }
    readBlock(destinationData, dataSize) {
        const view = new Uint8Array(destinationData);
        for (let i = 0; i < dataSize; i++) {
            view[i] = this.readByte() || 0;
        }
    }
    isEOF() {
        return this._inputStream.isEOF();
    }
}
class DecryptingOutputStream {
    _outputStream;
    _substitutionTable;
    constructor(outputStream, key) {
        this._outputStream = outputStream;
        this._substitutionTable = this.generateSubstitutionTable(key);
    }
    generateSubstitutionTable(key) {
        // Генерация обратной таблицы подстановки
        const table = new Uint8Array(256);
        // Здесь вы должны реализовать логику генерации обратной таблицы
        // Например, можно использовать ту же логику перемешивания, но в обратном порядке
        return table;
    }
    writeByte(data) {
        const originalByte = this._substitutionTable[data];
        this._outputStream.writeByte(originalByte);
    }
    writeBlock(srcData, dataSize) {
        const originalData = new Uint8Array(dataSize);
        for (let i = 0; i < dataSize; i++) {
            originalData[i] = this._substitutionTable[srcData[i]];
        }
        this._outputStream.writeBlock(originalData, dataSize);
    }
}
