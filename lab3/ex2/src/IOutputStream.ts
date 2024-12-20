interface IOutputStream {
	writeByte(data: number): void;
	writeBlock(srcData: Uint8Array, dataSize: number): void; //TODO: Чего не хватает в интерфейсе
}

export {IOutputStream};