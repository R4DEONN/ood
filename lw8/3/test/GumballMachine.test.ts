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

	it('should transition to NoQuarterState when refilled from SoldOutState', () => {
		const machine = new GumballMachine(0);

		expect(machine.GetBallCount()).toBe(0);

		machine.Refill(10);

		expect(machine.GetBallCount()).toBe(10);
		expect(machine.ToString()).toContain('waiting for quarter');
	});

	it('should retain quarters when refilled from HasQuarterState', () => {
		const machine = new GumballMachine(1);

		machine.InsertQuarter();
		machine.InsertQuarter();
		machine.Refill(5);

		expect(machine.GetBallCount()).toBe(6);
		expect(machine.GetQuarterCount()).toBe(2);
		expect(machine.ToString()).toContain('waiting for turn of crank');
	});

	it('should allow refill in NoQuarterState', () => {
		const machine = new GumballMachine(5);

		machine.Refill(5);

		expect(machine.GetBallCount()).toBe(10);
		expect(machine.ToString()).toContain('waiting for quarter');
	});
});