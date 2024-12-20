import {describe, expect, it} from "@jest/globals";
import {GumballMachine} from "../src/GumballMachine";

describe('MultiGumballMachine', () => {
	it('should accept up to 5 quarters', () => {
		const machine = new GumballMachine(10);

		machine.InsertQuarter();
		machine.InsertQuarter();
		machine.InsertQuarter();
		machine.InsertQuarter();
		machine.InsertQuarter();
		machine.InsertQuarter();

		expect(machine.GetQuarterCount()).toBe(5);
	});

	it('should return all quarters', () => {
		const machine = new GumballMachine(10);

		machine.InsertQuarter();
		machine.InsertQuarter();
		machine.EjectQuarter();

		expect(machine.GetQuarterCount()).toBe(0);
	});

	it('should dispense gumballs for each quarter', () => {
		const machine = new GumballMachine(3);

		machine.InsertQuarter();
		machine.InsertQuarter();
		machine.TurnCrank();
		machine.TurnCrank();
		machine.TurnCrank();

		expect(machine.GetBallCount()).toBe(1);
		expect(machine.GetQuarterCount()).toBe(0);
	});
});