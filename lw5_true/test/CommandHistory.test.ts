// @ts-ignore
import {describe, expect, it} from "@jest/globals";
import {CommandHistory, MAX_COMMAND_COUNT} from "../src/CommandHistory";
import {DocumentCommand} from "../src/DocumentCommand";
import {IDocument} from "../src/IDocument";

class MockCommand extends DocumentCommand {
	deleteCount = 0;
	executeCount = 0;
	unExecuteCount = 0;

	constructor() {
		super({} as IDocument);
	}

	delete(): void {
		this.deleteCount++;
	}

	execute(): void {
		this.executeCount++;
	}

	unExecute(): void {
		this.unExecuteCount++;
	}

}

describe("CommandHistory", () => {
	it("execute added commands", () => {
		const commandHistory = new CommandHistory();
		const command1 = new MockCommand();
		const command2 = new MockCommand();
		const command3 = new MockCommand();

		commandHistory.addCommand(command1);
		commandHistory.addCommand(command2);

		expect(command1.executeCount).toEqual(1);
		expect(command2.executeCount).toEqual(1);

		commandHistory.undo();
		commandHistory.undo();

		expect(command1.unExecuteCount).toEqual(1);
		expect(command2.unExecuteCount).toEqual(1);
		expect(commandHistory.undo).toThrow();

		commandHistory.redo();

		expect(command1.executeCount).toEqual(2);

		commandHistory.addCommand(command3);

		expect(command3.executeCount).toEqual(1);
		expect(command2.deleteCount).toEqual(1);

		expect(commandHistory.redo).toThrow();
	});

	it("max commands", () => {
		const commandHistory = new CommandHistory();
		const command1 = new MockCommand();

		for (let i = 0; i < MAX_COMMAND_COUNT + 1; i++) {
			commandHistory.addCommand(command1);
		}

		for (let i = 0; i < MAX_COMMAND_COUNT - 1; i++) {
			commandHistory.undo()
		}

		expect(commandHistory.undo).toThrow();
	})
});