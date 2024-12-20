interface IInputStream {
	isEOF(): boolean;
	readByte(): number;
	readBlock(destinationData: Uint8Array, dataSize: number): void;
}

export {IInputStream};