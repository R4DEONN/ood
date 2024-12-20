import {DocumentCommand} from "./DocumentCommand";

const MAX_COMMAND_COUNT: number = 10;

class CommandHistory {
	private _history: Array<DocumentCommand> = []
	private _currentCommandIndex: number = -1

	addCommand(command: DocumentCommand): void {
		if (this._currentCommandIndex !== this._history.length - 1) {
			this._deleteExtraCommands();
		}
		else if (this._history.length === MAX_COMMAND_COUNT) {
			this._history.splice(0, 1);
		}
		this._history.push(command);
		this._currentCommandIndex = this._history.length - 1;
		command.execute();
	}

	canUndo(): boolean {
		return this._currentCommandIndex >= 0;
	}

	undo(): void {
		if (this._currentCommandIndex < 0) {
			throw new Error("Undo is impossible");
		}
		const currentCommand = this._history[this._currentCommandIndex];
		currentCommand.unExecute();
		this._currentCommandIndex--;
	}

	canRedo(): boolean {
		return this._currentCommandIndex + 1 < this._history.length
	}

	redo(): void {
		if (this._currentCommandIndex + 1 >= this._history.length) {
			throw new Error("Redo is impossible");
		}
		this._currentCommandIndex++;
		const currentCommand = this._history[this._currentCommandIndex];
		currentCommand.execute();
	}

	private _deleteExtraCommands() {
		for (let i = this._history.length - 1; i > this._currentCommandIndex; i--) {
			this._history[i].delete();
		}
		this._history.splice(this._currentCommandIndex);
	}
}

export { CommandHistory, MAX_COMMAND_COUNT };