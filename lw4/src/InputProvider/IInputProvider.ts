interface IInputProvider {
	registerOnInput(fn: (s: string) => void): void;
	registerOnClose(fn: () => void): void;
}

export { IInputProvider };