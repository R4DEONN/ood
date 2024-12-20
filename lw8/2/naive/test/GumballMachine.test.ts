import {describe, expect, test} from "@jest/globals";
import {MultiGumballMachine} from "../src/GumballMachine";

describe("MultiGumballMachine", () => {
	test("Insert quarters and turn crank", () => {
		const machine = new MultiGumballMachine(3);
		machine.insertQuarter();
		machine.insertQuarter();
		machine.turnCrank();
		expect(machine.toString()).toContain("Inventory: 2 gumballs");
		expect(machine.toString()).toContain("Quarters: 1");
	});

	test("Eject all quarters", () => {
		const machine = new MultiGumballMachine(3);
		machine.insertQuarter();
		machine.insertQuarter();
		machine.ejectQuarters();
		expect(machine.toString()).toContain("Quarters: 0");
	});

	test("Handle out of gumballs", () => {
		const machine = new MultiGumballMachine(1);
		machine.insertQuarter();
		machine.turnCrank();
		expect(machine.toString()).toContain("Inventory: 0 gumball");
		expect(machine.toString()).toContain("Quarters: 0");
	});
});
