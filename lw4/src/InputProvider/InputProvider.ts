import {IInputProvider} from "./IInputProvider";

class InputProvider implements IInputProvider {
	private _onInputFn: ((s: string) => void) | undefined;
	private _onCloseFn: (() => void) | undefined;

	constructor(
		private _input: HTMLInputElement,
		private _closeButton: HTMLButtonElement,
	) {
		const onInput = (e: Event) => {
			this._onInputFn?.((e.target as HTMLInputElement).value)
			this._input.value = ''
		}

		const onClick = () => {
			this._closeButton.removeEventListener("click", onClick);
			this._input.removeEventListener("change", onInput);
			this._onCloseFn?.();
			return;
		}

		this._closeButton.addEventListener("click", onClick);
		this._input.addEventListener("change", onInput)
	}

	registerOnClose(fn: () => void) {
		this._onCloseFn = fn;
	}

	registerOnInput(fn: (s: string) => void) {
		this._onInputFn = fn;
	}
}

export {InputProvider};